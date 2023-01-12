import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CancelDto } from '#libs/dto/entity';

import { OrderEntity } from '../order/order.entity';


@Entity({ name: 'cancel', synchronize: false })
export class CancelEntity implements CancelDto {
  @PrimaryColumn({ type: 'integer', nullable: false })
  rg_id: number; // "ADB Final Project".Rg_Id NOT NULL

  @Column({ type: 'timestamp', nullable: false })
  cancel_time: Date; // TIMESTAMP NOT NULL

  @Column({ type: 'integer', nullable: false })
  proc_status: number; // "ADB Final Project".Proc_Status NOT NULL

  @Column({ type: 'character varying', nullable: false })
  cancel_reason: string; // CHARACTER VARYING(15) NOT NULL

  // relationships
  @ApiHideProperty()
  @OneToMany(() => OrderEntity, order => order.cancel)
  orders?: Array<OrderEntity> | undefined;
}
