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

  @Column({ type: 'text', nullable: false })
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  quidaxTransactionId: string;

  @Column({ type: 'int', nullable: false })
  transactionType: number;

  @Column({ type: 'varchar', nullable: true })
  bankId: string;

  @Column({ type: 'varchar', nullable: false })
  transactionCurrency: string;

  @Column({ type: 'float', nullable: false })
  transactionAmount: number;

  @Column({ type: 'int', nullable: true })
  rate: number;

  @Column({ type: 'int', nullable: true })
  currencyRate: number;

  @Column({ type: 'text', nullable: true })
  payoutCurrency: string;

  @Column({ type: 'text', nullable: true })
  hash: string;

  @Column({ type: 'float', nullable: true })
  payoutAmount: number;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ type: 'text', nullable: false })
  transactionReference: string;

  @Column({ type: 'text', nullable: true })
  withdrawalAddress: string;

  @Column({ type: 'int', nullable: true })
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
