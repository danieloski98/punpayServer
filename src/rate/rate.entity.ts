import { PrimaryGeneratedColumn, Column, BeforeUpdate } from 'typeorm';
import { RateCreateableInterface } from './rate.interface';

export abstract class RateMysqlEntity implements RateCreateableInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'varchar', nullable: false })
  currency: string;

  @Column({ type: 'int', nullable: false })
  rate: number;

  @Column({
    type: 'varchar',
    nullable: false,
    default: new Date().toISOString(),
  })
  createdAt: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: new Date().toISOString(),
  })
  updatedAt: string;

  @BeforeUpdate()
  async updated() {
    this.updatedAt = new Date().toISOString();
  }
}
