import nodemailer from "nodemailer";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export class MailService {
  private transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "proyection009@gmail.com",
      pass: "etto tjqh pkmf vhnj",
    },
  });

  public async sendEmail({ to, subject, html }: EmailOptions): Promise<{ msg: string }> {
    try {
      await this.transporter.sendMail({
        from: 'fastcashmxec2024@gmail.com',
        to,
        subject,
        html,
      });

      return { msg: 'Send Email SuccessFull' };
    } catch (err: any) {
      return { msg: `error ${err.message || err}` };
    }
  }
}
