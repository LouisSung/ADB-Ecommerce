import { ApiHideProperty } from '@nestjs/swagger';
import { Node, NodeKey } from '@nhogs/nestjs-neo4j';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderDto } from '#libs/dto/entity';

import { ProductEntity } from '../product/product.entity';
import { ReturnEntity } from '../return/return.entity';
import { CancelEntity } from '../cancel/cancel.entity';
import { ShipmentEntity } from '../shipment/shipment.entity';


@Node({ label: 'Order' })
@Entity({ name: 'order', synchronize: false })
export class OrderEntity implements OrderDto {
  @Column({ type: 'character varying', nullable: false })
  customer_id: string; // CHARACTER VARYING(53) NOT NULL

  @Column({ type: 'integer', nullable: false })
  rg_id: number; // "ADB Final Project".Rg_Id NOT NULL

  @Column({ type: 'double precision', nullable: true })
  product_length: number | null; // DOUBLE PRECISION

  @Column({ type: 'double precision', nullable: true })
  product_width: number | null; // DOUBLE PRECISION

  @Column({ type: 'double precision', nullable: true })
  product_height: number | null; // DOUBLE PRECISION

  @Column({ type: 'double precision', nullable: true })
  product_weight: number | null; // DOUBLE PRECISION

  @Column({ type: 'character varying', nullable: true })
  package_id: string | null; // CHARACTER VARYING(11)

  @Column({ type: 'character', nullable: false })
  rm_id: string; // CHARACTER(15) NOT NULL

  @NodeKey()
  @PrimaryColumn({ type: 'character', nullable: false })
  rs_id: string; // CHARACTER(15) NOT NULL

  @Column({ type: 'character varying', nullable: true })
  shipping_name: string | null; // CHARACTER VARYING(25)

  @Column({ type: 'timestamp', nullable: false })
  order_time: Date; // TIMESTAMP NOT NULL

  @Column({ type: 'integer', nullable: false })
  product_id: number; // "ADB Final Project".Product_Id NOT NULL, -- XXX: DOUBLE PRECISION

  @Column({ type: 'timestamp', nullable: false })
  guaranteed_shipping_time: Date; // TIMESTAMP NOT NULL

  @Column({ type: 'timestamp', nullable: true })
  actual_shipping_time: Date | null; // TIMESTAMP

  @Column({ type: 'integer', nullable: false })
  arrival_zip_code: number; // "ADB Final Project".Arrival_Zip_Code NOT NULL, -- XXX: DOUBLE PRECISION

  @Column({ type: 'character varying', nullable: false })
  arrival_address: string; // CHARACTER VARYING(139) NOT NULL

  @Column({ type: 'character varying', nullable: true })
  shipping_company: string | null; // CHARACTER VARYING(14)

  @Column({ type: 'character varying', nullable: true })
  warehouse: string | null; // CHARACTER VARYING(5)

  @Column({ type: 'character varying', nullable: true })
  shipping_method: string | null; // CHARACTER VARYING(3)

  @Column({ type: 'integer', nullable: true })
  redelivery_count: number | null; // "ADB Final Project".Redelivery_Count, -- XXX: DOUBLE PRECISION

  @Column({ type: 'character varying', nullable: false })
  source_file: string; // CHARACTER VARYING(17) NOT NULL

  // relationships
  @ApiHideProperty()
  @ManyToOne(() => CancelEntity, cancel => cancel.orders)
  @JoinColumn({ name: 'rg_id', referencedColumnName: 'rg_id' })
  cancel?: CancelEntity | undefined;

  @ApiHideProperty()
  @ManyToOne(() => ProductEntity, product => product.orders)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'product_id' })
  product?: ProductEntity;

  @ApiHideProperty()
  @ManyToOne(() => ReturnEntity, return_ => return_.orders)
  @JoinColumn({ name: 'rs_id', referencedColumnName: 'rs_id' })
  'return'?: ReturnEntity | undefined;

  @ApiHideProperty()
  @ManyToOne(() => ShipmentEntity, shipment => shipment.orders)
  @JoinColumn({ name: 'rm_id', referencedColumnName: 'rm_id' })
  shipment?: ShipmentEntity;
}
