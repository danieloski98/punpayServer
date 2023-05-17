import { genSalt, hash } from 'bcrypt';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Entity,
  BeforeUpdate,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

@Entity('Admin')
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  fullname: string;

  @Column({ nullable: false })
  bio: string;

  @Column({ nullable: false, type: 'varchar' })
  role: string;

  @Column({ default: new Date().toISOString() })
  createdAt: string;

  @Column({ default: new Date().toISOString() })
  updatedAt: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt();
    const pass = await hash(this.password, salt);
    this.password = pass;
  }

  @BeforeUpdate()
  async beforeUpdated() {
    this.updatedAt = new Date().toISOString();
  }

  // relationships
  @OneToMany(() => TransactionEntity, (transaction) => transaction.admin)
  transactions: TransactionEntity[];
}
