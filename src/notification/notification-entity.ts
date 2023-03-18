import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  userId: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  body: string;

  @Column({ type: 'text', default: new Date().toDateString() })
  createdAt: string;
}
