import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsAlphanumeric, MinLength } from 'class-validator';

export class PasswordResetDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(8)
  password: string;
}
