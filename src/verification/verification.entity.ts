import { VERIFICATION_STATUS } from 'src/Enums/VerificationStatus';
import { Entity, PrimaryGeneratedColumn, Column, AfterUpdate } from 'typeorm';

@Entity('VerificationDetails')
export class Verification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  userId: string;

  @Column({ type: 'varchar', nullable: false })
  link: string;

  @Column({ type: 'simple-json', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'uuid', nullable: true })
  approvedBy: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: VERIFICATION_STATUS.PENDING,
  })
  status: string;

  @Column({ type: 'varchar', default: new Date().toDateString() })
  createdAt: string;

  @Column({ type: 'varchar', default: new Date().toDateString() })
  updatedAt: string;

  @AfterUpdate()
  async updated() {
    this.updatedAt = new Date().toDateString();
  }
}
