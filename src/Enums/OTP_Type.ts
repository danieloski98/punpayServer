export enum OTP_TYPE {
  EMAIL_VERIFICATION = 1,
  PASSWORD_RESET,
  PAYMENT_VERIFICATION,
  ADMIN,
  USER,
}

export type TYPE_OF_OTP =
  | 'EMAIL_VERIFICATION'
  | 'PASSWORD_RESET'
  | 'PAYMENT_VERIFICATION'
  | 'ADMIN'
  | 'USER';

export function getOtpType(typ: TYPE_OF_OTP) {
  const obj = {
    EMAIL_VERIFICATION: 1,
    PASSWORD_RESET: 2,
    PAYMENT_VERIFICATION: 3,
    ADMIN: 4,
    USER: 5,
  };

  return obj[typ];
}
