import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  userId: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  body: string;

  @Column({ type: 'varchar', default: new Date().toDateString() })
  createdAt: string;
}
