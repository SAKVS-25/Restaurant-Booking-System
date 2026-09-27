package com.auradining.booking.repository;

import com.auradining.booking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {
    
    List<Reservation> findByDateAndTime(String date, String time);

    @Query("SELECT r FROM Reservation r WHERE " +
           "LOWER(r.id) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(r.guestName) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(r.guestEmail) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(r.tableName) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(r.tableCode) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Reservation> searchReservations(@Param("q") String query);
}
