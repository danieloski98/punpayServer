import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
//import * as Mg from 'nodemailer-mailgun-transport';
import { MailOptions } from 'nodemailer/lib/ses-transport';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mg = require('nodemailer-mailgun-transport');

@Injectable()
export class EmailService {
  logger = new Logger();
  private auth = {
    auth: {
      api_key: process.env.MAILGUN_SENDING_KEY,
      domain: process.env.DOMAIN,
    },
  };

  private transport = nodemailer.createTransport(Mg(this.auth));

  public async sendConfirmationEmail(email: string, code?: number) {
    console.log(process.env.MAILGUN_SENDING_KEY);
    try {
      const mailOption: MailOptions = {
        from: `Punpay ${process.env.COMPANY_EMAIL}`,
        to: email,
        subject: `Account Verification Code`,
        html: `<div> 
          <p>You are one step away from joining Punpay. Your verification code is below:</p>

        </br>
        <b>${code}</b>  </br>

        <p>Enter this verification code to verify your email.</p> </br>

        <p>Thank you for choosing Punpay!</p> </br>

        <p>We are happy to have you onboard.</p> </br>

        <p>support@Punpay.com</p>

        </div>`,
      };
      this.transport.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return {
        error: false,
        successMessage: 'Account creation email sent',
        statusCode: 200,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      };
    }
  }

  public async sendPasswordResetCode(email: string, code?: number) {
    console.log(process.env.MAILGUN_SENDING_KEY);
    try {
      const mailOption: MailOptions = {
        from: `Punpay ${process.env.COMPANY_EMAIL}`,
        to: email,
        subject: `Password Reset Code`,
        html: `<div> 
          <p>Your OTP code is</p>

        </br>
        <b>${code}</b>  </br>

        <p>support@punpay.co</p>

        </div>`,
      };
      this.transport.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return {
        error: false,
        successMessage: 'Account creation email sent',
        statusCode: 200,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      };
    }
  }

  public async generateAdminPassword(email: string, password?: string) {
    console.log(process.env.MAILGUN_SENDING_KEY);
    try {
      const mailOption: MailOptions = {
        from: `Punpay ${process.env.COMPANY_EMAIL}`,
        to: email,
        subject: `Admin Account Created`,
        html: `
        <div> 
          <p>Your admin account has been created successfully.</p>
          <br />
          <p>Your Temporary password is</p>
          </br>
          <b>${password}</b>  </br>
          <p>You are adviced to change it once you login.</p>
          <p>support@Punpay.co</p>
        </div>`,
      };
      this.transport.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return {
        error: false,
        successMessage: 'Account creation email sent',
        statusCode: 200,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      };
    }
  }

  public async generateAdminCode(email: string, code?: number) {
    console.log(process.env.MAILGUN_SENDING_KEY);
    try {
      const mailOption: MailOptions = {
        from: `Punpay ${process.env.COMPANY_EMAIL}`,
        to: email,
        subject: `OTP Generated`,
        html: `
        <div> 
          <p>Your OTP has been created successfully.</p>
          <br />
          <p>Your Temporary OTP is</p>
          </br>
          <b>${code}</b>  </br>
          <p>support@Punpay.co</p>
        </div>`,
      };
      this.transport.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return {
        error: false,
        successMessage: 'Account creation email sent',
        statusCode: 200,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      };
    }
  }
  public async generateAdminEmailNotificationCode(
    email: string,
    message: string,
  ) {
    console.log(process.env.MAILGUN_SENDING_KEY);
    try {
      const mailOption: MailOptions = {
        from: `Punpay ${process.env.COMPANY_EMAIL}`,
        to: email,
        subject: `Transaction Update`,
        html: `
        <div> 
          <p>${message}</p>
        </div>`,
      };
      this.transport.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return {
        error: false,
        successMessage: 'Account creation email sent',
        statusCode: 200,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      };
    }
  }

  public async generateSendUserEmail(email: string, message: string) {
    console.log(process.env.MAILGUN_SENDING_KEY);
    try {
      const mailOption: MailOptions = {
        from: `Punpay ${process.env.COMPANY_EMAIL}`,
        to: email,
        subject: `Transaction`,
        html: `
        <div> 
        <p>${message}</p>
        </div>`,
      };
      this.transport.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return {
        error: false,
        successMessage: 'email sent',
        statusCode: 200,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      };
    }
  }

  public async sendApprovedEmailEmail(email: string, message: string) {
    console.log(process.env.MAILGUN_SENDING_KEY);
    try {
      const mailOption: MailOptions = {
        from: `Punpay ${process.env.COMPANY_EMAIL}`,
        to: email,
        subject: `Transaction Approved`,
        html: `
        <div> 
        <p>${message}</p>
        </div>`,
      };
      this.transport.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return {
        error: false,
        successMessage: 'email sent',
        statusCode: 200,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      };
    }
  }

  public async sendVerificationCreatedEmail(email: string, message: string) {
    console.log(process.env.MAILGUN_SENDING_KEY);
    try {
      const mailOption: MailOptions = {
        from: `Punpay Verification ${process.env.COMPANY_EMAIL}`,
        to: email,
        subject: `User Verification Request`,
        html: `
        <div> 
        <p>${message}</p>
        </div>`,
      };
      this.transport.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return {
        error: false,
        successMessage: 'email sent',
        statusCode: 200,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      };
    }
  }
}
