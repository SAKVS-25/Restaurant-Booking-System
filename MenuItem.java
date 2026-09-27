package com.auradining.booking.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "menu_items")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;
    private String category;
    private Double price;
    private String image;
    private Boolean isVeg;
    private Boolean isGf;
    private String tags; // Comma separated, e.g. "Veg,GF"

    public MenuItem() {}

    public MenuItem(String title, String description, String category, Double price, String image, Boolean isVeg, Boolean isGf, String tags) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.image = image;
        this.isVeg = isVeg;
        this.isGf = isGf;
        this.tags = tags;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    
    public Boolean getIsVeg() { return isVeg; }
    public void setIsVeg(Boolean veg) { isVeg = veg; }
    
    public Boolean getIsGf() { return isGf; }
    public void setIsGf(Boolean gf) { isGf = gf; }
    
    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
}
