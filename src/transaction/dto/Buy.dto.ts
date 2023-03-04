import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class BuyDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  bankId: string;

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
  payoutCurrency: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  payoutAmount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  rate: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  transactionReference: string;
}
