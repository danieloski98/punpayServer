import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDto {
  @IsString()
  @IsNotEmpty()
  doc_type: string;
}
