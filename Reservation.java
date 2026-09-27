package com.auradining.booking.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    private String id; // e.g. "AURA-129837" or "MOCK-1"
    
    private String date;
    private String time;
    private Integer tableId;
    private String tableName;
    private String tableCode;
    
    private String guestName;
    private String guestEmail;
    private String guestPhone;
    private Integer guests;
    private String specialRequests;

    public Reservation() {}

    public Reservation(String id, String date, String time, Integer tableId, String tableName, String tableCode, 
                       String guestName, String guestEmail, String guestPhone, Integer guests, String specialRequests) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.tableId = tableId;
        this.tableName = tableName;
        this.tableCode = tableCode;
        this.guestName = guestName;
        this.guestEmail = guestEmail;
        this.guestPhone = guestPhone;
        this.guests = guests;
        this.specialRequests = specialRequests;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public Integer getTableId() { return tableId; }
    public void setTableId(Integer tableId) { this.tableId = tableId; }

    public String getTableName() { return tableName; }
    public void setTableName(String tableName) { this.tableName = tableName; }

    public String getTableCode() { return tableCode; }
    public void setTableCode(String tableCode) { this.tableCode = tableCode; }

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public String getGuestEmail() { return guestEmail; }
    public void setGuestEmail(String guestEmail) { this.guestEmail = guestEmail; }

    public String getGuestPhone() { return guestPhone; }
    public void setGuestPhone(String guestPhone) { this.guestPhone = guestPhone; }

    public Integer getGuests() { return guests; }
    public void setGuests(Integer guests) { this.guests = guests; }

    public String getSpecialRequests() { return specialRequests; }
    public void setSpecialRequests(String specialRequests) { this.specialRequests = specialRequests; }

    private String preorderedItems;
    private Double preorderTotal;

    public String getPreorderedItems() { return preorderedItems; }
    public void setPreorderedItems(String preorderedItems) { this.preorderedItems = preorderedItems; }

    public Double getPreorderTotal() { return preorderTotal; }
    public void setPreorderTotal(Double preorderTotal) { this.preorderTotal = preorderTotal; }
}
