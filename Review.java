package com.auradining.booking.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long menuItemId;
    private String guestName;
    private Integer rating; // 1 to 5 stars
    private String comment;
    private String date; // visual string, e.g. "Aug 2, 2026"

    public Review() {}

    public Review(Long menuItemId, String guestName, Integer rating, String comment, String date) {
        this.menuItemId = menuItemId;
        this.guestName = guestName;
        this.rating = rating;
        this.comment = comment;
        this.date = date;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getMenuItemId() { return menuItemId; }
    public void setMenuItemId(Long menuItemId) { this.menuItemId = menuItemId; }

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}
