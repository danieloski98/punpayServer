import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, MinLength, IsUUID } from 'class-validator';

export class ChangePasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(8)
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(8)
  newPassword: string;
}
