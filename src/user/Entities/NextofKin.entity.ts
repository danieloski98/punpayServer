import { Column, PrimaryGeneratedColumn, BaseEntity, Entity } from 'typeorm';

@Entity('NextOfKin')
export class NextOfKinEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: false })
  DOB: string;

  @Column({ nullable: false })
  relationship: string;

  @Column({ default: new Date().toISOString() })
  createdAt: string;
}
