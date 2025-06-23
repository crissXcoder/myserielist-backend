import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        this.transporter.verify((error, success) => {
            if (error) {
                console.error('Error de conexión SMTP:', error.message);
            } else {
                console.log('Conexión SMTP exitosa');
            }
        });
    }

    async sendVerificationCode(username: string, code: string): Promise<void> {
        const mailOptions = {
            from: `"Verificación MySerieList" <${process.env.ADMIN_EMAIL}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `Nuevo intento de registro - ${username}`,
            html: `
                <div>
                    <h3>Intento de registro detectado</h3>
                    <p><strong>Usuario:</strong> ${username}</p>
                    <p><strong>Código de verificación:</strong></p>
                    <h2 style="color:#00578B">${code}</h2>
                    <p>Solo este usuario podrá completar su cuenta si tú le das el código.</p>
                </div>
            `,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Correo de verificación enviado:', info.messageId);
        } catch (error) {
            console.error('Fallo al enviar el correo:', error.message);
            throw error;
        }
    }
}
