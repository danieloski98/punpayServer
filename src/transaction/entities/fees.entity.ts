import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Fee')
export class FeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  transactionId: string;

  @Column({ type: 'varchar', nullable: true })
  fee: string;

  @Column({ type: 'varchar', nullable: true })
  coin: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: new Date().toISOString(),
  })
  createdAt: string;
}
