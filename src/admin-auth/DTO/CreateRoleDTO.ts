import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRoleDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
