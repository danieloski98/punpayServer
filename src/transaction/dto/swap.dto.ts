import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class SwapDTO {
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
  payoutCurrency: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  payoutAmount: number;
}
