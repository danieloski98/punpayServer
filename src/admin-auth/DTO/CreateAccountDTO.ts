import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AdminLoginDTO } from './AdminLoginDTO';

export class CreateAccountDTO extends AdminLoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullname: string;
}
