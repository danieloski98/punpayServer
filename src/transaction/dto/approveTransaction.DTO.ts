import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class ApproveTransactionDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  id: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty({
    description:
      'This is optional, this is ust for buy and swap transactions where the admin has to transfer crypto to the user',
  })
  hash: string;
}
