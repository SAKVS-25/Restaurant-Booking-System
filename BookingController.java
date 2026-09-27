package com.auradining.booking.controller;

import com.auradining.booking.model.Reservation;
import com.auradining.booking.repository.ReservationRepository;
import com.auradining.booking.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<Reservation> getAllBookings() {
        return reservationRepository.findAll();
    }

    @GetMapping("/search")
    public List<Reservation> searchBookings(@RequestParam("q") String query) {
        return reservationRepository.searchReservations(query);
    }

    @GetMapping("/check")
    public List<Reservation> checkAvailability(@RequestParam("date") String date, @RequestParam("time") String time) {
        return reservationRepository.findByDateAndTime(date, time);
    }

    @PostMapping
    public ResponseEntity<Reservation> createBooking(@RequestBody Reservation reservation) {
        Reservation saved = reservationRepository.save(reservation);
        notificationService.sendReservationConfirmation(saved);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/test-email")
    public ResponseEntity<String> testEmail(@RequestBody Reservation reservation) {
        // Trigger email only for the provided reservation payload without persisting
        if (reservation == null || reservation.getGuestEmail() == null || reservation.getGuestEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Reservation with guestEmail is required");
        }
        notificationService.sendEmailConfirmation(reservation);
        return ResponseEntity.ok("Test email triggered");
    }

    @PostMapping("/test-sms")
    public ResponseEntity<String> testSms(@RequestBody Reservation reservation) {
        // Trigger SMS only for the provided reservation payload without persisting
        if (reservation == null || reservation.getGuestPhone() == null || reservation.getGuestPhone().isEmpty()) {
            return ResponseEntity.badRequest().body("Reservation with guestPhone is required");
        }
        notificationService.sendSmsConfirmation(reservation);
        return ResponseEntity.ok("Test SMS triggered");
    }

    @PostMapping("/test-notification")
    public ResponseEntity<String> testNotification(@RequestBody Reservation reservation) {
        // Trigger email & SMS for the provided reservation payload without persisting
        if (reservation == null) {
            return ResponseEntity.badRequest().body("Reservation payload required");
        }
        notificationService.sendReservationConfirmation(reservation);
        return ResponseEntity.ok("Notification triggered");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable("id") String id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isPresent()) {
            reservationRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
