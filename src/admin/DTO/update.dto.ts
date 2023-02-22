import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateAdminDto {
  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty()
  id: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty()
  fullname: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @Expose()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty()
  bio: string;
}
