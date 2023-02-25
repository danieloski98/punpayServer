import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Entity,
  BeforeUpdate,
} from 'typeorm';

@Entity('Balance')
export class BalanceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false, default: 0 })
  balance: number;

  @Column({ default: new Date().toISOString() })
  createdAt: string;

  @Column({ default: new Date().toISOString() })
  updatedAt: string;

  @BeforeUpdate()
  async beforeUpdated() {
    this.updatedAt = new Date().toISOString();
  }
}
