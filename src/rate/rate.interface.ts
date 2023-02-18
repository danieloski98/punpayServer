export interface RateInterface {
  id: string;
  type: string;
  currency: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateableRateInterface = Omit<
  RateInterface,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateableRateInterface = Partial<
  Omit<RateInterface, 'id' | 'createdAt' | 'updatedAt'>
>;

export interface RateCreateableInterface {
  type: string;
  currency: string;
  rate: number;
}
