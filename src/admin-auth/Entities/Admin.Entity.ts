import { genSalt, hash } from 'bcrypt';
import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Entity,
  BeforeUpdate,
  BeforeInsert,
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
}
