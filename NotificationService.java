package com.auradining.booking.service;

import com.auradining.booking.model.Reservation;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class NotificationService {

    private static final Logger logger =
            LoggerFactory.getLogger(NotificationService.class);

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Value("${spring.mail.host:}")
    private String mailHost;

    @Value("${twilio.account-sid:}")
    private String accountSid;

    @Value("${twilio.auth-token:}")
    private String authToken;

    @Value("${twilio.phone-number:}")
    private String twilioPhoneNumber;

    public NotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // =========================================================
    // SEND EMAIL + SMS AFTER BOOKING
    // =========================================================

    public void sendReservationConfirmation(Reservation reservation) {

        if (reservation == null) {
            return;
        }

        String otp = generateOtp();

        // Send confirmation to registered email
        sendEmailConfirmationInternal(reservation, otp);

        // Send confirmation to registered mobile
        sendSmsConfirmationInternal(reservation, otp);
    }

    // =========================================================
    // EMAIL
    // =========================================================

    public void sendEmailConfirmation(Reservation reservation) {

        if (reservation == null) {
            return;
        }

        String otp = generateOtp();

        sendEmailConfirmationInternal(reservation, otp);
    }

    private void sendEmailConfirmationInternal(
            Reservation reservation,
            String otp) {

        // Get customer's registered email
        String recipient = reservation.getGuestEmail();

        if (!StringUtils.hasText(recipient)) {

            logger.warn(
                    "Email not sent because customer email is empty for reservation {}",
                    reservation.getId());

            return;
        }

        // Check SMTP configuration
        if (!StringUtils.hasText(mailUsername)
                || !StringUtils.hasText(mailHost)
                || "localhost".equalsIgnoreCase(mailHost)) {

            logger.warn(
                    "Email not sent because SMTP is not configured.");

            return;
        }

        try {

            SimpleMailMessage message = new SimpleMailMessage();

            // Customer email
            message.setTo(recipient);

            // Your Gmail/email
            message.setFrom(mailUsername);

            // Email subject
            message.setSubject(
                    "Aura Dining - Table Booking Confirmation");

            // Email content
            message.setText(
                    buildEmailBody(reservation, otp));

            // SEND EMAIL
            mailSender.send(message);

            logger.info(
                    "Booking confirmation email successfully sent to {}",
                    recipient);

        } catch (MailException e) {

            logger.error(
                    "Failed to send booking confirmation email for reservation {}",
                    reservation.getId(),
                    e);
        }
    }

    // =========================================================
    // EMAIL BODY
    // =========================================================

    private String buildEmailBody(
            Reservation reservation,
            String otp) {

        String customerName =
                reservation.getGuestName() == null
                        ? "Guest"
                        : reservation.getGuestName();

        String specialRequests =
                reservation.getSpecialRequests() == null
                        ? "None"
                        : reservation.getSpecialRequests();

        StringBuilder sb = new StringBuilder();

        sb.append("Dear ")
                .append(customerName)
                .append(",\n\n");

        sb.append("Thank you for choosing Aura Dining!\n\n");

        sb.append("Your restaurant table has been successfully booked.\n\n");

        sb.append("========== BOOKING DETAILS ==========\n\n");

        sb.append("Reservation ID: ")
                .append(reservation.getId())
                .append("\n");

        sb.append("Date: ")
                .append(reservation.getDate())
                .append("\n");

        sb.append("Time: ")
                .append(reservation.getTime())
                .append("\n");

        sb.append("Table: ")
                .append(reservation.getTableCode())
                .append(" - ")
                .append(reservation.getTableName())
                .append("\n");

        sb.append("Number of Guests: ")
                .append(reservation.getGuests())
                .append("\n");

        sb.append("Special Requests: ")
                .append(specialRequests)
                .append("\n\n");

        sb.append("OTP: ")
                .append(otp)
                .append("\n");

        sb.append("OTP is valid for 10 minutes.\n\n");

        sb.append("=====================================\n\n");

        sb.append("Please keep this email for your records.\n\n");

        sb.append("We look forward to welcoming you to Aura Dining!\n\n");

        sb.append("Warm Regards,\n");
        sb.append("Aura Dining Team");

        return sb.toString();
    }

    // =========================================================
    // SMS
    // =========================================================

    public void sendSmsConfirmation(Reservation reservation) {

        if (reservation == null) {
            return;
        }

        String otp = generateOtp();

        sendSmsConfirmationInternal(reservation, otp);
    }

    private void sendSmsConfirmationInternal(
            Reservation reservation,
            String otp) {

        String recipientPhone =
                normalizePhoneNumber(reservation.getGuestPhone());

        if (!StringUtils.hasText(recipientPhone)) {

            logger.warn(
                    "SMS not sent because customer mobile number is empty.");

            return;
        }

        if (!StringUtils.hasText(accountSid)
                || !StringUtils.hasText(authToken)
                || !StringUtils.hasText(twilioPhoneNumber)) {

            logger.warn(
                    "SMS not sent because Twilio is not configured.");

            return;
        }

        try {

            Twilio.init(accountSid, authToken);

            Message.creator(
                    new PhoneNumber(recipientPhone),
                    new PhoneNumber(twilioPhoneNumber),
                    buildSmsBody(reservation, otp)
            ).create();

            logger.info(
                    "Booking confirmation SMS successfully sent to {}",
                    recipientPhone);

        } catch (Exception e) {

            logger.error(
                    "Failed to send SMS notification for reservation {}",
                    reservation.getId(),
                    e);
        }
    }

    // =========================================================
    // SMS BODY
    // =========================================================

    private String buildSmsBody(
            Reservation reservation,
            String otp) {

        return "Aura Dining: Your table booking is confirmed. "
                + "Booking ID: " + reservation.getId()
                + ", Date: " + reservation.getDate()
                + ", Time: " + reservation.getTime()
                + ", Table: " + reservation.getTableCode()
                + ". OTP: " + otp
                + " (valid 10 minutes).";
    }

    // =========================================================
    // PHONE NUMBER
    // =========================================================

    private String normalizePhoneNumber(String phone) {

        if (!StringUtils.hasText(phone)) {
            return null;
        }

        String sanitized =
                phone.replaceAll("[^\\d+]", "");

        if (!StringUtils.hasText(sanitized)) {
            return null;
        }

        if (sanitized.startsWith("+")) {
            return sanitized;
        }

        // Indian 10-digit number
        if (sanitized.length() == 10) {
            return "+91" + sanitized;
        }

        return "+" + sanitized;
    }

    // =========================================================
    // OTP
    // =========================================================

    private String generateOtp() {

        int otp =
                (int) (Math.random() * 900000) + 100000;

        return String.valueOf(otp);
    }
}