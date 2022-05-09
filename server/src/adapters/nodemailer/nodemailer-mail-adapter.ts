import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4763c9f0086072",
      pass: "a00d5f76159fbf"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject,body}: SendMailData){
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "Braian Fellipe <braianfelipecsk123@hotmail.com>",
            subject,
            html: body
        })
    }
}