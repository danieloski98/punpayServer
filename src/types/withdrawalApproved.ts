export type withDrawalSuccessful = {
  event: string;
  data: {
    id: string;
    reference: string;
    type: string;
    currency: string;
    amount: string;
    fee: string;
    total: string;
    txid: string;
    transaction_note: string;
    narration: string;
    status: string;
    reason: string;
    created_at: string;
    done_at: string;
    recipient: {
      type: string;
      details: {
        address: string;
        destination_tag: string;
        name: string;
      };
    };
    wallet: {
      id: string;
      currency: string;
      balance: string;
      locked: string;
      staked: string;
      converted_balance: string;
      reference_currency: string;
      is_crypto: boolean;
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
  };
};
