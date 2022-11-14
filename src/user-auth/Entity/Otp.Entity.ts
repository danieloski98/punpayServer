import { Column, PrimaryGeneratedColumn, BaseEntity, Entity } from 'typeorm';

@Entity('OTP')
export class OtpEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  code: number;

  @Column({ nullable: false })
  type: number;

  @Column({ nullable: false, default: false })
  expired: boolean;

  @Column({ default: new Date().toISOString() })
  createdAt: string;
}
