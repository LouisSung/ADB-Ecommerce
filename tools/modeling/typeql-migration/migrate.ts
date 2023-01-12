import * as fs from 'fs';
import * as papa from 'papaparse';
import * as path from 'path';
import { ParseStepResult } from 'papaparse';


const verbose = 100000;
const tqlTemplate: TQLTemplate = {
  order: ((attrStr, serial) => `insert $order_${ serial } isa order, ${ attrStr };`) as TemplateFunc<Order>,
  return: ((attrStr, serial) => `insert $return_${ serial } isa return, ${ attrStr };`) as TemplateFunc<Return>,
  cancel: ((attrStr, serial) => `insert $cancel_${ serial } isa cancel, ${ attrStr };`) as TemplateFunc<Cancel>,
  shipment: ((attrStr, serial) => `insert $shipment_${ serial } isa shipment, ${ attrStr };`) as TemplateFunc<Shipment>,
  supplier: ((attrStr, serial) => `insert $supplier_${ serial } isa supplier, ${ attrStr };`) as TemplateFunc<Supplier>,
  product: ((attrStr, serial) => `insert $product_${ serial } isa product, ${ attrStr };`) as TemplateFunc<Product>,
  storage: ((attrStr, serial) => `insert $storage_${ serial } isa storage, ${ attrStr };`) as TemplateFunc<Storage>,
};

(async function main(pathPrefix = 'data/') {
  const outputs: Array<Output> = [];
  const inputs: Array<Input> = [
    // {templateFunc: tqlTemplate.cancel, filepath: 'cancel/cancel_order.csv'},
    //
    // {templateFunc: tqlTemplate.product, filepath: 'product/product_list_fixed.csv'},
    //// {templateFunc: tqlTemplate.product, filepath: 'product/sku_20120604.csv'},
    //// {templateFunc: tqlTemplate.product, filepath: 'product/2012_product_list.csv'},
    //// {templateFunc: tqlTemplate.product, filepath: 'product/product(倉出).csv'},
    //// {templateFunc: tqlTemplate.product, filepath: 'product/sku_20120413.csv'},
    //
    // {templateFunc: tqlTemplate.return, filepath: 'return/retgood_20120823.csv'},
    //
    // {templateFunc: tqlTemplate.shipment, filepath: 'shipment/倉出_店配.csv'},
    // {templateFunc: tqlTemplate.shipment, filepath: 'shipment/供應商出貨_直店配.csv'},
    //
    // {templateFunc: tqlTemplate.storage, filepath: 'storage/stlend.csv'},
    //
    // {templateFunc: tqlTemplate.supplier, filepath: 'supplier/supplier.csv'},
    //
    // {templateFunc: tqlTemplate.order, filepath: 'order/order_2011Q1.csv'},
    // {templateFunc: tqlTemplate.order, filepath: 'order/order_2011Q2.csv'},
    // {templateFunc: tqlTemplate.order, filepath: 'order/order_2011Q3.csv'},
    // {templateFunc: tqlTemplate.order, filepath: 'order/order_2011Q4.csv'},
    // {templateFunc: tqlTemplate.order, filepath: 'order/order_2012Q1.csv'},
    // {templateFunc: tqlTemplate.order, filepath: 'order/order_2012Q2.csv'},
    // {templateFunc: tqlTemplate.order, filepath: 'order/20110630.csv'},
    // {templateFunc: tqlTemplate.order, filepath: 'order/20110331.csv'},
  ];

  for (const input of inputs) {
    const { filepath } = input;
    console.time(filepath);
    input.filepath = path.join(pathPrefix, filepath);
    const tqlFolder = `tql/${ path.dirname(filepath) }`;
    fs.mkdirSync(tqlFolder, { recursive: true });
    const output: Output = {
      lineCount: 0,
      filepath: path.join(tqlFolder, `data_${ path.basename(filepath) }`.replace(/\.csv$/u, '.tql'))
    };
    outputs.push(output);
    const writeStream = fs.createWriteStream(output.filepath);

    output.lineCount = await genEntityTQL(input, writeStream);

    console.log(`wrote ${ output.lineCount } lines to '${ output.filepath }'`);
    writeStream.end();
    console.timeEnd(filepath);
  }
  const genResult = outputs.map(({ filepath, lineCount }) => `'${ filepath }': ${ lineCount }`).join('\n');
  console.log(`^_^finished Data TypeQL generation${ genResult.length > 1 ? '\n' : ': ' }${ genResult }`);
})();


async function genEntityTQL<T extends Entities>(input: Input<T>, writeStream: fs.WriteStream): Promise<number> {
  const data = await parseCSV(input);
  const forcedStr = ['customer_id', 'shipping_name', 'shipping_id', 'failure_code', 'convenience_store', 'product_name', 'shipping_company', 'supplier_model', 'barcode', 'source_file'];
  const forcedInt = ['product_id', 'arrival_zip_code', 'redelivery_count'];
  for (const [i, record] of data.entries()) {
    // attrStr: {key: value} -> has key1 value1, has key2 value2... (with string quoted, datetime->ISOString (without ending 'Z'), number unquoted)
    const attrStr = Object.entries(record).filter(([_, value]) => value !== '' && !/null/ui.test(value))
      .map(([key, value]) => {
        if (!forcedStr.includes(key) && !isNaN(value as number)) {
          if (forcedInt.includes(key)) { // otherwise keep as-is (number)
            value = parseInt(value);
          }
        } else if (/^[\d\-\/T:. ]+$/u.test(value as string)) {
          if (!forcedStr.includes(key) && !isNaN(Date.parse(value as string))) {
            value = new Date(value).toISOString().slice(0, -1);
          } else {
            value = `"${ value }"`; // datatime pattern test already excluded "double quotes"
          }
        } else {
          value = `"${ value.replace(/"/ug, '\\"').replace(/\\$/, '\\\\') }"`;
        }
        return `has ${ key } ${ value }`;
      }).join(', ');
    writeStream.write(`${ input.templateFunc(attrStr, i + 1) }\n`);
    if ((i + 1) % verbose === 0) {
      console.debug(`> write line ${ i - verbose + 2 }~${ i + 1 } to '${ input.filepath }'`);
    }
  }
  return data.length;
}

function parseCSV<T extends Entities>(input: Input<T>): Promise<Array<T>> {
  const items: Array<T> = [];
  return new Promise<Array<T>>(function (resolve) {
    papa.parse(
      fs.createReadStream(input.filepath), {
        header: true,
        step: function (results: ParseStepResult<T>) {
          items.push(results.data);
          if (items.length % verbose === 0) {
            console.debug(`< read line ${ items.length - verbose + 1 }~${ items.length } from '${ input.filepath }'`);
          }
        },
        complete: function () {
          resolve(items);
        }
      }
    );
  });
}


// interfaces
export type EntityLiteral = 'cancel' | 'order' | 'product' | 'return' | 'shipment' | 'storage' | 'supplier';
type Entities = Cancel | Order | Product | Return | Shipment | Storage | Supplier;
type TypeQL<T extends Entities> = string;
type AttrStr<T extends Entities> = string;
type TemplateFunc<T extends Entities> = (attrStr: AttrStr<T>, serial: number | Array<number>) => TypeQL<T>;
type TQLTemplate = Record<EntityLiteral, TemplateFunc<Entities>>;

interface Input<T extends Entities = Entities> {
  templateFunc: TemplateFunc<T>;
  filepath: string;
}

interface Output {
  lineCount: number;
  filepath: string;
}

// Entities
interface Cancel {
  rg_id: number;
  cancel_time: Date;
  proc_status: number;
  cancel_reason: string;
}

interface Order {
  customer_id: string;
  rg_id: number;
  product_length?: number;
  product_width?: number;
  product_height?: number;
  product_weight?: number;
  package_id?: string;
  rm_id: string;
  rs_id: string;
  shipping_name?: string;
  order_time: Date,
  product_id: number;
  guaranteed_shipping_time: Date;
  actual_shipping_time?: Date;
  arrival_zip_code: number;
  arrival_address: string;
  shipping_company?: string;
  warehouse?: string;
  shipping_method?: string;
  redelivery_count?: number;
  source_file: string;
}

interface Product {
  supplier_id: number;
  product_id: number;
  primary_category?: number;
  secondary_category?: number;
  supplier_model?: string;
  product_name: string;
  barcode?: string;
  product_length: number;
  product_width: number;
  product_height: number;
  product_weight: number;
  warehouse?: string;
  product_keyin_time?: Date;
  source_file: string;
}

interface Return {
  rg_id: number;
  rm_id: string;
  rs_id?: string;
  return_id: string;
  return_establish_time: Date;
  return_complete_time?: Date;
  return_reason: string;
}

interface Shipment {
  rg_id: number;
  rm_id: string;
  shipping_id?: string;
  return_complete_time?: Date,
  failure_code?: string;
  failure_reason?: string;
  return_reason?: string;
  convenience_store?: string;
  source_file: string;
}

interface Storage {
  sl_id: string;
  supplier_id: number;
  product_id: number;
  storage_count: number;
  actual_storage_count: number;
  specified_arrival_time: Date;
  actual_arrival_time: Date;
  warehouse: string;
}

interface Supplier {
  supplier_id: number;
  supplier_name: string;
  shipping_zip_code: number;
  supplier_address: string;
  supplier_zip_code: number;
  shipping_address: string;
}
