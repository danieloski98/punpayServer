import { Module } from '@nestjs/common';
import { CrudService } from './services/crud/crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/admin-auth/Entities/Admin.Entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [CrudService],
})
export class AdminModule {}
