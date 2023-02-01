import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsString, Matches } from 'class-validator';

export class PasswordResetDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  password: string;
}
