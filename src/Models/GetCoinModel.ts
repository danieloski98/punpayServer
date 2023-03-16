export interface GetCoinModel {
  status: string;
  message: string;
  data: {
    id: string;
    currency: string;
    balance: string;
    locked: string;
    staked: string;
    user: {
      id: string;
      sn: string;
      email: string;
      reference: string;
      first_name: string;
      last_name: string;
      display_name: string;
      created_at: string;
      updated_at: string;
    };
    converted_balance: string;
    reference_currency: string;
    is_crypto: boolean;
    created_at: string;
    updated_at: string;
    deposit_address: string;
    destination_tag: string;
  };
}
