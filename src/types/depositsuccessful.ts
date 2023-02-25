export type depositSuccessful = {
  event: 'deposit.successful';
  data: {
    id: string;
    type: string;
    currency: string;
    amount: string;
    fee: string;
    txid: string;
    status: string;
    reason: string;
    created_at: string;
    done_at: null;
    wallet: {
      id: string;
      currency: string;
      balance: string;
      locked: string;
      staked: string;
      converted_balance: string;
      reference_currency: string;
      is_crypto: true;
      created_at: string;
      updated_at: string;
      deposit_address: string;
      destination_tag: string;
    };
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
    payment_transaction: {
      status: string;
      confirmations: number;
      required_confirmations: number;
    };
    payment_address: {
      id: string;
      reference: string;
      currency: string;
      address: string;
      destination_tag: string;
      total_payments: string;
      created_at: string;
      updated_at: string;
    };
  };
};
