import {
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
  BeforeUpdate,
  Entity,
  OneToOne,
} from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { BankEntity } from 'src/bank/Entities/Bank';

@Entity('User')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  fluidCoinId: string;

  @Column({ nullable: true })
  fluidCoinReference: string;

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
  KYCVerified: boolean;

  @Column({ nullable: false })
  password: string;

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
  bank: BankEntity;
}
