import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ReturnDto } from '#libs/dto/entity';

import { OrderEntity } from '../order/order.entity';


@Entity({ name: 'return', synchronize: false })
export class ReturnEntity implements ReturnDto {
  @Column({ type: 'integer', nullable: false })
  rg_id: number; // "ADB Final Project".Rg_Id NOT NULL

  @Column({ type: 'character', nullable: false })
  rm_id: string; // CHARACTER(15) NOT NULL

  @Column({ type: 'character', nullable: true })
  rs_id: string | null; // CHARACTER(15)

  @PrimaryColumn({ type: 'character varying', nullable: false })
  return_id: string; // CHARACTER VARYING(13) NOT NULL

  @Column({ type: 'timestamp', nullable: false })
  return_establish_time: Date; // TIMESTAMP NOT NULL

  @Column({ type: 'timestamp', nullable: true })
  return_complete_time: Date | null; // TIMESTAMP

  @Column({ type: 'character varying', nullable: false })
  return_reason: string; // CHARACTER VARYING(15) NOT NULL

  // relationships
  @ApiHideProperty()
  @OneToMany(() => OrderEntity, order => order.return)
  orders?: Array<OrderEntity> | undefined;
}
