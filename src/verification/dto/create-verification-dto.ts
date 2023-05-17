import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

@Exclude()
export class CreateVerifcationDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @Expose()
  @IsObject()
  @IsNotEmpty()
  @ApiProperty({
    description: 'object containing the user details',
  })
  metadata: Record<string, any>;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  link: string;
}
