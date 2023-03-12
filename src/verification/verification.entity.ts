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
  identificationName: string;

  @Column({ type: 'varchar', nullable: false })
  identificationType: string;

  @Column({ type: 'varchar', nullable: false })
  identificationNumber: string;

  @Column({ type: 'varchar', nullable: false })
  identificationDOB: string;

  @Column({ type: 'boolean', default: false })
  approved: string;

  @Column({ type: 'varchar', default: new Date().toDateString() })
  createdAt: string;

  @Column({ type: 'varchar', default: new Date().toDateString() })
  updatedAt: string;

  @AfterUpdate()
  async updated() {
    this.updatedAt = new Date().toDateString();
  }

  // Reletionship
  @OneToOne(() => UserEntity, (user) => user.verification, {
    cascade: ['update', 'remove'],
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'userId' })
  user: UserEntity;
}
