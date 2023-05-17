import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Entity,
  BeforeUpdate,
} from 'typeorm';

@Entity('AdminRole')
export class AdminTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar' })
  role: string;

  @Column({ default: new Date().toISOString() })
  createdAt: string;

  @Column({ default: new Date().toISOString() })
  updatedAt: string;

  @BeforeUpdate()
  async beforeUpdated() {
    this.updatedAt = new Date().toISOString();
  }
}
