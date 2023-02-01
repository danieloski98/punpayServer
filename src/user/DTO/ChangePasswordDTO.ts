import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsUUID, Matches } from 'class-validator';

export class ChangePasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  @MinLength(8)
  newPassword: string;
}
