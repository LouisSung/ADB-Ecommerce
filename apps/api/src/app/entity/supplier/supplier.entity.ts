import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SupplierDto } from '#libs/dto/entity';


@Entity({ name: 'supplier', synchronize: false })
export class SupplierEntity implements SupplierDto {
  @PrimaryColumn({ type: 'integer', nullable: false })
  supplier_id: number; // "ADB Final Project".Supplier_Id NOT NULL

  @Column({ type: 'character varying', nullable: false })
  supplier_name: string; // CHARACTER VARYING(32) NOT NULL

  @Column({ type: 'integer', nullable: false })
  shipping_zip_code: number; // "ADB Final Project".Shipping_Zip_Code NOT NULL

  @Column({ type: 'character varying', nullable: false })
  shipping_address: string; // CHARACTER VARYING(54) NOT NULL

  @Column({ type: 'integer', nullable: false })
  supplier_zip_code: number; // "ADB Final Project".Supplier_Zip_Code NOT NULL

  @Column({ type: 'character varying', nullable: false })
  supplier_address: string; // CHARACTER VARYING(54) NOT NULL
}
