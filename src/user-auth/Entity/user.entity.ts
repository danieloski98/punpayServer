import {
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
  BeforeUpdate,
  Entity,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { BankEntity } from 'src/bank/Entities/bank.entity';
import { Verification } from 'src/verification/verification.entity';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  quidaxId: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, default: false })
  emailVerified: boolean;

  @Column({ nullable: false, default: false })
  accountDisabled: boolean;

  @Column({ nullable: false, default: false })
  KYCVerified: boolean;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  pin: string;

  @Column({ default: new Date().toISOString() })
  createdAt: string;

  @Column({ default: new Date().toISOString() })
  updatedAt: string;

  @BeforeUpdate()
  async updated() {
    this.updatedAt = new Date().toISOString();
  }

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt();
    const passwordhash = await hash(this.password, salt);
    this.password = passwordhash;
  }

  // Relationships
  @OneToOne(() => BankEntity, (bank) => bank.user)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'userId',
  })
  bank: BankEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: TransactionEntity[];
}
