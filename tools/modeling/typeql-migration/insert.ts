import { SessionType, TransactionType, TypeDB, TypeDBClient } from 'typedb-client';
import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';


const verbose = 10000;
(async function main(dataPath, typedb = 'localhost:1729', database = 'adb_final_project', pathPrefix = 'tql/') {
  const files: Array<Filename> = [
    // 'cancel/data_cancel_order.tql',
    //
    // 'product/data_product_list_fixed.tql',
    //// 'product/data_sku_20120604.tql',
    //// 'product/data_2012_product_list.tql',
    //// 'product/data_product(倉出).tql',
    //// 'product/data_sku_20120413.tql',
    //
    // 'return/data_retgood_20120823.tql',
    //
    // 'shipment/data_倉出_店配.tql',
    // 'shipment/data_供應商出貨_直店配.tql',
    //
    // 'storage/data_stlend.tql',
    //
    // 'supplier/data_supplier.tql',
    //
    // 'order/data_order_2011Q1.tql',
    // 'order/data_order_2011Q2.tql',
    // 'order/data_order_2011Q3.tql',
    // 'order/data_order_2011Q4.tql',
    // 'order/data_order_2012Q1.tql',
    // 'order/data_order_2012Q2.tql',
    // 'order/data_20110630.tql',
    // 'order/data_20110331.tql',
  ];

  const client = TypeDB.coreClient(typedb);
  // await recreateDatabase(client, database, 'tql/schema.tql');
  for (const filename of files) {
    await insertData(filename, client, database, pathPrefix)
  }

  await client.close();
})();

async function insertData(filename: Filename, client: TypeDBClient, database: string, pathPrefix = '') {
  console.time(filename);
  let lineCounter = 0;
  const session = await client.session(database, SessionType.DATA);
  let transaction = await session.transaction(TransactionType.WRITE);
  const readStream = fs.createReadStream(path.join(pathPrefix, filename));

  // NOTE!!!: readline.createInterface() will start to consume the input stream once invoked.
  //   Having asynchronous operations between interface creation and asynchronous iteration may result in missed lines.
  const lineReader = readline.createInterface({ input: readStream, crlfDelay: Infinity, terminal: false });
  for await (const line of lineReader) {
    await transaction.query.insert(line);
    if (++lineCounter % verbose === 0) {
      console.debug(`> insert line ${ lineCounter - verbose + 1 }~${ lineCounter } from '${ filename }' to database '${ database }'`);
      await transaction.commit();
      transaction = await session.transaction(TransactionType.WRITE);
    }
  }
  await transaction.commit();
  await session.close();
  console.log(`^_^inserted ${ lineCounter } lines from '${ filename } to database '${ database }'`)
  console.timeEnd(filename);
}

async function recreateDatabase(client: TypeDBClient, database: string, schemaFile: Filename) {
  try {
    await (await client.databases.get(database)).delete();
    console.log(`!!!purge database '${ database }'`);
  } catch {
  }
  await client.databases.create(database);
  const session = await client.session(database, SessionType.SCHEMA);
  const transaction = await session.transaction(TransactionType.WRITE);
  await transaction.query.define(fs.readFileSync(schemaFile, { encoding: 'utf-8' }));
  await transaction.commit();
  await session.close();
  console.log(`^_^init database '${ database }' with schema '${ schemaFile }'`);
}

// interfaces
type Filename = string;
