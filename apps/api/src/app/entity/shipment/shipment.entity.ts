import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ShipmentDto } from '#libs/dto/entity';


@Entity({ name: 'shipment', synchronize: false })
export class ShipmentEntity implements ShipmentDto {
  @Column({ type: 'integer', nullable: false })
  rg_id: number; // "ADB Final Project".Rg_Id NOT NULL

  @PrimaryColumn({ type: 'character', nullable: false })
  rm_id: string; // CHARACTER(15) NOT NULL

  @Column({ type: 'character varying', nullable: true })
  shipping_id: string | null; // CHARACTER VARYING(13)

  @Column({ type: 'timestamp', nullable: true })
  return_complete_time: Date | null; // TIMESTAMP

  @Column({ type: 'character varying', nullable: true })
  failure_code: string | null; // CHARACTER VARYING(3)

  @Column({ type: 'character varying', nullable: true })
  failure_reason: string | null; // CHARACTER VARYING(15)

  @Column({ type: 'character varying', nullable: true })
  return_reason: string | null; // CHARACTER VARYING(15)

  @Column({ type: 'character varying', nullable: true })
  convenience_store: string | null; // CHARACTER VARYING(12)

  @Column({ type: 'character varying', nullable: false })
  source_file: string; // CHARACTER VARYING(17) NOT NULL
}
