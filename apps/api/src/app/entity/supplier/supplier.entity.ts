import { ApiHideProperty } from '@nestjs/swagger';
import { Node, NodeKey } from '@nhogs/nestjs-neo4j';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { SupplierDto } from '#libs/dto/entity';

import { ProductEntity } from '../product/product.entity';


@Node({ label: 'Supplier' })
@Entity({ name: 'supplier', synchronize: false })
export class SupplierEntity implements SupplierDto {
  @NodeKey()
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

  // relationships
  @ApiHideProperty()
  @OneToMany(() => ProductEntity, product => product.supplier)
  products?: Array<ProductEntity> | undefined;
}
