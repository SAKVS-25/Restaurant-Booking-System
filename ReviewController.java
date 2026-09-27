package com.auradining.booking.controller;

import com.auradining.booking.model.Review;
import com.auradining.booking.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @GetMapping("/{menuItemId}")
    public List<Review> getReviewsForItem(@PathVariable("menuItemId") Long menuItemId) {
        return reviewRepository.findByMenuItemId(menuItemId);
    }

    @PostMapping
    public ResponseEntity<Review> submitReview(@RequestBody Review review) {
        if (review.getRating() == null || review.getRating() < 1 || review.getRating() > 5) {
            return ResponseEntity.badRequest().build();
        }
        Review saved = reviewRepository.save(review);
        return ResponseEntity.ok(saved);
    }
}
