import { ApiProperty } from '@nestjs/swagger';

export class IBank {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  longcode: string;

  @ApiProperty()
  gateway: string | number;

  @ApiProperty()
  pay_with_bank: boolean;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  country: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  is_deleted: boolean;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
