import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AdminLoginDTO } from './AdminLoginDTO';
import { Type } from 'class-transformer';

export class CreateAccountDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({ isArray: true })
  @Type(() => Array<string>)
  @IsNotEmpty()
  roles: string[];
}
