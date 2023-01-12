import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { StorageDto } from '#libs/dto/entity';

import { ProductEntity } from '../product/product.entity';


@Entity({ name: 'storage', synchronize: false })
export class StorageEntity implements StorageDto {
  @PrimaryColumn({ type: 'character varying', nullable: false })
  sl_id: string; // CHARACTER VARYING(15) NOT NULL

  @Column({ type: 'integer', nullable: false })
  supplier_id: number; // "ADB Final Project".Supplier_Id NOT NULL

  @Column({ type: 'integer', nullable: false })
  product_id: number; // "ADB Final Project".Product_Id NOT NULL

  @Column({ type: 'integer', nullable: false })
  storage_count: number; // "ADB Final Project".Storage_Count NOT NULL

  @Column({ type: 'integer', nullable: false })
  actual_storage_count: number; // "ADB Final Project".Actual_Storage_Count NOT NULL

  @Column({ type: 'timestamp', nullable: false })
  specified_arrival_time: Date; // TIMESTAMP NOT NULL

  @Column({ type: 'timestamp', nullable: false })
  actual_arrival_time: Date; // TIMESTAMP NOT NULL

  @Column({ type: 'character varying', nullable: false })
  warehouse: Date; // CHARACTER VARYING(5) NOT NULL

  // relationships
  @ApiHideProperty()
  @ManyToOne(() => ProductEntity, product => product.storages)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'product_id' })
  product?: ProductEntity;
}
