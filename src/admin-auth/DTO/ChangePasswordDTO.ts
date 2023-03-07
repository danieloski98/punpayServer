import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class ChangePassword {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  otp: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  adminId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
