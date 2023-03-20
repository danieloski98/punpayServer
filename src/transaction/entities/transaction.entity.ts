import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';
import { BankEntity } from 'src/bank/Entities/bank.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Transaction')
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  adminId: string;

  @Column({ type: 'varchar', nullable: true })
  quidaxTransactionId: string;

  @Column({ type: 'varchar', nullable: true })
  adminQuidaxTransactionId: string;

  @Column({ type: 'int', nullable: false })
  transactionType: number;

  @Column({ type: 'int', nullable: true })
  bankId: number;

  @Column({ type: 'varchar', nullable: false })
  transactionCurrency: string;

  @Column({ type: 'float', nullable: false })
  transactionAmount: number;

  @Column({ type: 'int', nullable: true })
  rate: number;

  @Column({ type: 'int', nullable: true })
  currencyRate: number;

  @Column({ type: 'varchar', nullable: true })
  payoutCurrency: string;

  @Column({ type: 'varchar', nullable: true })
  hash: string;

  @Column({ type: 'float', nullable: true })
  payoutAmount: number;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ type: 'varchar', nullable: false })
  transactionReference: string;

  @Column({ type: 'varchar', nullable: true })
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

  //relationships
  @ManyToOne(() => UserEntity, (user) => user.transactions)
  user: UserEntity;

  @ManyToOne(() => AdminEntity, (admin) => admin.transactions)
  admin: AdminEntity;

  @ManyToOne(() => BankEntity, (bank) => bank.transactions)
  adminBank: BankEntity;
}
