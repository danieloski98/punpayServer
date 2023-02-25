import { COIN_TYPE } from 'src/Enums/COIN_TYPE';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  Entity,
} from 'typeorm';

@Entity('Coin')
export class CoinEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  userId: string;

  @Column({ type: 'int', nullable: false })
  coinType: number;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  network: string;

  @Column({ type: 'float', nullable: false, default: 0 })
  amount: number;

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
  async update() {
    this.updatedAt = new Date().toISOString();
  }
}
