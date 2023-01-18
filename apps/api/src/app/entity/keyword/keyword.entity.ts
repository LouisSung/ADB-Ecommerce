import { Node, NodeKey } from '@nhogs/nestjs-neo4j';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { KeywordDto } from '#libs/dto/entity/keyword.dto';


@Node({ label: 'Keyword' })
@Entity({ name: 'keyword', synchronize: false })
export class KeywordEntity implements KeywordDto {
  @NodeKey()
  @PrimaryColumn({ type: 'character varying', nullable: false })
  keyword: string; // CHARACTER VARYING(23)

  @Column({ type: 'integer', nullable: false })
  occurrence_product: number; // "ADB Final Project".Occurrence_Product

  @Column({ type: 'integer', nullable: false })
  occurrence_order: number; // "ADB Final Project".Occurrence_Oroduct
}
