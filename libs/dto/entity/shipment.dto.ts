export class ShipmentDto {
  rg_id: number;

  rm_id: string;

  shipping_id: string | null;

  return_complete_time: Date | null;

  failure_code: string | null;

  failure_reason: string | null;

  return_reason: string | null;

  convenience_store: string | null;

  source_file: string;
}
