import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Transaction')
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  transactionType: string;

  @Column({ type: 'float4', nullable: true })
  coinAmount: number;

  @Column({ type: 'float', nullable: true })
  ngnAmount: number;

  @Column({ type: 'text', nullable: true })
  addressId: string;

  @Column({ type: 'int', nullable: false })
  currentRate: number;

  @Column({ type: 'text', nullable: false })
  userId: string;

  @Column({ type: 'text', nullable: false })
  bankId: string;

  @Column({ type: 'text', nullable: false })
  payoutReference: string;

  @Column({ type: 'number', nullable: false })
  status: number;

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
