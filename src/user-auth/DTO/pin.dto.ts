import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsString, MaxLength } from 'class-validator';

export class PinDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(4)
  pin: string;
}
