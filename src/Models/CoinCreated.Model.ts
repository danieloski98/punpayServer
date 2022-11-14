export interface ICoin {
  id: string;
  reference: string;
  address: string;
  merchant_id: string;
  coin: {
    id: string;
    human_readable_name: string;
    code: string;
    is_fiat: boolean;
    image: string;
    is_available_on_widget: boolean;
    is_stable_coin: boolean;
    multiplier: number;
    has_test_net: number;
    metadata: {
      minimum_deposit_amount: number;
      minimum_payout_amount: number;
      payout_fee: number;
      minimum_widget_payment: number;
      minimum_liquidity_amount: number;
    };
    networks: Array<string>;
    created_at: string;
    updated_at: string;
  };
  domain: string;
  metadata: {
    destination_tag: number;
    memo: string;
    network: string;
  };
  created_at: string;
  updated_at: string;
}
