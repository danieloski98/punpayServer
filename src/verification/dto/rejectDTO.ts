import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RejectDTO {
  @ApiProperty()
  @IsString()
  reason: string;
}
