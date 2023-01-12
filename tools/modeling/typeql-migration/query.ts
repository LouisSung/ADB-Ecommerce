import {SessionType, TransactionType, TypeDB, TypeDBClient} from 'typedb-client';


(async function main(typedb = 'localhost:1729', database = 'adb_final_project') {
  const client = TypeDB.coreClient(typedb);
  const session = await client.session(database, SessionType.DATA);
  const transaction = await session.transaction(TransactionType.READ);
  const result = await transaction.query.match('match $x isa order, has rs_id $order__rs_id; limit 10000;');
  console.time('query');
  const collect = await result.collect();
  console.timeEnd('query');

  await session.close();
  await client.close();
})();
