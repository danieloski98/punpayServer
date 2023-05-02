import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('SwapPercentage')
export class SwapPercentageEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  percentage: number;

  @Column({ type: 'varchar', default: new Date().toISOString() })
  createdAt: string;

  @Column({ type: 'varchar', default: new Date().toISOString() })
  updatededAt: string;

  @BeforeUpdate()
  async update() {
    this.updatededAt = new Date().toISOString();
  }
}
