import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class CreateVerifcationDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  identification_type: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  identification_name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  identification_dob: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  identification_number: string;
}
