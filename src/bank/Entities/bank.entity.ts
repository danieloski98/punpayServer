import { ApiProperty } from '@nestjs/swagger';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Bank')
export class BankEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  userId: string;

  @ApiProperty()
  @Column({ type: 'int', nullable: false })
  bankId: number;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  code: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  accountNumber: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  accountName: string;

  @ApiProperty()
  @Column({ type: 'bool', default: false })
  isLinked: boolean;

  @ApiProperty()
  @Column({ type: 'bool', default: false })
  isAdminAccount: boolean;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
    default: new Date().toISOString(),
  })
  createdAt: string;

  @ApiProperty()
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

  // relationship
  @OneToOne(() => UserEntity, (user) => user.bank)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'userId',
    // foreignKeyConstraintName: 'FKUSERBANK',
  })
  user: UserEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.adminBank)
  transactions: TransactionEntity[];
}
