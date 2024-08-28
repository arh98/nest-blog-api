import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    sendUserWelcome(user: User) {
        this.mailerService
            .sendMail({
                to: user.email,
                from: 'noreply@nest-blog.com',
                subject: 'Welcome to Our Service!',
                text: `Hello ${user.firstName},\n\nWelcome to our service! We are excited to have you on board.\n\nBest regards,\nThe Team`,
                html: `<b>Hello ${user.firstName},</b><br><br>Welcome to our service! We are excited to have you on board.<br><br>Best regards,<br>The Team`,
            })
            .catch(() => {});
    }

    async sendPasswordResetEmail(user: User, resetToken: string) {
        const resetUrl = `http://localhost:3000/auth/reset/password?token=${resetToken}`;
        try {
            await this.mailerService.sendMail({
                to: user.email,
                from: 'support@nest-blog.com',
                subject: 'Password Reset Request',
                text: `Hello ${user.firstName},\n\nYou requested a password reset.Please submit a PATCH request with your new password and passwordConfirm to:\n${resetUrl}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nThe Team`,
                html: `<b>Hello ${user.firstName},</b><br><br>You requested a password reset. Please submit a PATCH request with your new password and passwordConfirm to:<br><a href="${resetUrl}">Reset Password</a><br><br>If you did not request this, please ignore this email.<br><br>Best regards,<br>The Team`,
            });
        } catch (error) {
            // console.error('Error sending reset email:', error);
        }
    }

    async sendConfirmationEmail(user: User, confirmToken: string) {
        try {
            this.mailerService.sendMail({
                to: user.email,
                from: 'support@nest-blog.com',
                subject: 'Confirm Your Email Address',
                text: `Hello ${user.firstName},\n\nPlease confirm your email address by submitting a POST request to the following URL with the received confirmation token:\n\nURL: http://localhost:3000/auth/confirm/email\nToken: ${confirmToken}\n\nBest regards,\nThe Team`,
                html: `<b>Hello ${user.firstName},</b><br><br>Please confirm your email address by submitting a POST request to the following URL with the received confirmation token:<br><br>URL: <a href="http://localhost:3000/auth/confirm/email">http://localhost:3000/auth/confirm/email</a><br>Token: <strong>${confirmToken}</strong><br><br>Best regards,<br>The Team`,
            });
        } catch (error) {
            // console.error('Error sending confirmation email:', error);
        }
    }
}
