import {
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
  BeforeUpdate,
  Entity,
} from 'typeorm';
import { genSalt, hash } from 'bcrypt';

@Entity('User')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  quidax_id: string;

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
}
