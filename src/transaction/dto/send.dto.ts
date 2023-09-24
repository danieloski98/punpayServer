import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class SendDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  transactionCurrency: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  transactionAmount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  withdrawalAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  network: string;
}
