import { VERIFICATION_STATUS } from 'src/Enums/VerificationStatus';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterUpdate,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('VerificationDetails')
export class Verification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  userId: string;

  @Column({ type: 'varchar', nullable: false })
  doc_type: string;

  @Column({ type: 'varchar', nullable: false })
  front: string;

  @Column({ type: 'varchar', nullable: false })
  back: string;

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

  @OneToOne(() => UserEntity, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
