import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Bank')
export class BankEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', nullable: true })
  userId: string;

  @Column({ type: 'int', nullable: false })
  bankId: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  code: string;

  @Column({ type: 'varchar', nullable: false })
  accountNumber: string;

  @Column({ type: 'varchar', nullable: false })
  accountName: string;

  @Column({ type: 'bool', default: false })
  isLinked: boolean;

  @Column({ type: 'bool', default: false })
  isAdminAccount: boolean;

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
