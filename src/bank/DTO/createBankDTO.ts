import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBankDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  bankname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'this is the code u get from calling the /bank endpoint',
  })
  code: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  accountNumber: string;
}
