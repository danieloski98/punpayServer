export interface MetaMapDTO {
  eventName:
    | 'verification_started'
    | 'step_completed'
    | 'verification_input_completed'
    | 'verification_completed'
    | 'verification_updated';
  resource: string;
  flowID: string;
  timestamp: string;
  metadata: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  step?: any;
  status: 'verified' | 'reviewNeeded' | 'rejected';
}
