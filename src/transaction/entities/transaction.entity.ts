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

  @Column({ type: 'varchar', nullable: false })
  quidaxTransactionId: string;

  @Column({ type: 'int', nullable: false })
  transactionType: number;

  @Column({ type: 'varchar', nullable: true })
  bankId: string;

  @Column({ type: 'varchar', nullable: true })
  transactionCurrency: string;

  @Column({ type: 'float', nullable: true })
  transactionAmount: number;

  @Column({ type: 'int', nullable: true })
  rate: number;

  @Column({ type: 'int', nullable: false })
  currencyRate: number;

  @Column({ type: 'text', nullable: false })
  payoutCurrency: string;

  @Column({ type: 'text', nullable: false })
  hash: string;

  @Column({ type: 'float', nullable: false })
  payoutAamount: number;

  @Column({ type: 'simple-array', nullable: false })
  images: string[];

  @Column({ type: 'text', nullable: false })
  withdrawalAddress: string;

  @Column({ type: 'int', nullable: false })
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
