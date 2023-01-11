export class ProductDto {
  supplier_id: number;

  product_id: number;

  primary_category: number | null;

  secondary_category: number | null;

  supplier_model: string | null;

  product_name: string | null;

  barcode: string | null;

  product_length: number;

  product_width: number;

  product_height: number;

  product_weight: number;

  warehouse: string | null;

  product_keyin_time: Date | null;

  source_file: string;
}
