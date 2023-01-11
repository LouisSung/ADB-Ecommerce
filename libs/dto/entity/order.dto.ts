export class OrderDto {
  customer_id: string;

  rg_id: number;

  product_length: number | null;

  product_width: number | null;

  product_height: number | null;

  product_weight: number | null;

  package_id: string | null;

  rm_id: string;

  rs_id: string;

  shipping_name: string | null;

  order_time: Date;

  product_id: number;

  guaranteed_shipping_time: Date;

  actual_shipping_time: Date | null;

  arrival_zip_code: number;

  arrival_address: string;

  shipping_company: string | null;

  warehouse: string | null;

  shipping_method: string | null;

  redelivery_count: number | null;

  source_file: string;
}
