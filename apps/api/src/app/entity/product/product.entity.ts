import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductDto } from '#libs/dto/entity';

import { OrderEntity } from '../order/order.entity';
import { SupplierEntity } from '../supplier/supplier.entity';
import { StorageEntity } from '../storage/storage.entity';


@Entity({ name: 'product', synchronize: false })
export class ProductEntity implements ProductDto {
  @Column({ type: 'integer', nullable: false })
  supplier_id: number; // "ADB Final Project".Supplier_Id NOT NULL

  @PrimaryColumn({ type: 'integer', nullable: false })
  product_id: number; // "ADB Final Project".Product_Id NOT NULL

  @Column({ type: 'integer', nullable: true })
  primary_category: number | null; // "ADB Final Project".Primary_Category

  @Column({ type: 'integer', nullable: true })
  secondary_category: number | null; // "ADB Final Project".Secondary_Category

  @Column({ type: 'character varying', nullable: true })
  supplier_model: string | null; // CHARACTER VARYING(50)

  @Column({ type: 'character varying', nullable: true })
  product_name: string | null; // CHARACTER VARYING(50)

  @Column({ type: 'character', nullable: true })
  barcode: string | null; // CHARACTER(13)

  @Column({ type: 'double precision', nullable: false })
  product_length: number; // DOUBLE PRECISION NOT NULL

  @Column({ type: 'double precision', nullable: false })
  product_width: number; // DOUBLE PRECISION NOT NULL

  @Column({ type: 'double precision', nullable: false })
  product_height: number; // DOUBLE PRECISION NOT NULL

  @Column({ type: 'double precision', nullable: false })
  product_weight: number; // DOUBLE PRECISION NOT NULL

  @Column({ type: 'character varying', nullable: true })
  warehouse: string | null; // CHARACTER VARYING(5)

  @Column({ type: 'timestamp', nullable: true })
  product_keyin_time: Date | null; // TIMESTAMP

  @Column({ type: 'character varying', nullable: false })
  source_file: string; // CHARACTER VARYING(12) NOT NULL

  // relationships
  @OneToMany(() => OrderEntity, order => order.product)
  orders?: Array<OrderEntity> | undefined;

  @ManyToOne(() => SupplierEntity, supplier => supplier.products)
  @JoinColumn({ name: 'supplier_id', referencedColumnName: 'supplier_id' })
  supplier?: SupplierEntity;

  @OneToMany(() => StorageEntity, storage => storage.product)
  storages?: Array<StorageEntity> | undefined;
}
