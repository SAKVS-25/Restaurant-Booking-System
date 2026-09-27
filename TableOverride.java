package com.auradining.booking.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "table_overrides")
public class TableOverride {
    @Id
    private Integer id; // Table ID
    private String status; // "blocked"

    public TableOverride() {}

    public TableOverride(Integer id, String status) {
        this.id = id;
        this.status = status;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
