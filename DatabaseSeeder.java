package com.auradining.booking.config;

import com.auradining.booking.model.MenuItem;
import com.auradining.booking.model.Reservation;
import com.auradining.booking.model.Review;
import com.auradining.booking.repository.MenuItemRepository;
import com.auradining.booking.repository.ReservationRepository;
import com.auradining.booking.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public void run(String... args) throws Exception {
        seedMenuItems();
        seedMockReservations();
        seedMockReviews();
    }

    private void seedMenuItems() {
        if (menuItemRepository.count() > 0) return;

        MenuItem item1 = new MenuItem(
            "Paneer Tikka Angare",
            "Charcoal-grilled cottage cheese cubes marinated in spiced Greek yogurt, yellow chili, and ground spices, served with fresh mint chutney.",
            "starters", 390.0, "assets/dish_paneer_tikka.jpg", true, true, "Veg,GF"
        );

        MenuItem item2 = new MenuItem(
            "Hara Bhara Kabab",
            "Pan-seared patties of minced garden spinach, green peas, and local potatoes, stuffed with cream cheese and chopped dry fruits.",
            "starters", 320.0, "https://images.unsplash.com/photo-1547058886-cc22f66d62d2?q=80&w=600&auto=format&fit=crop", true, true, "Veg,GF"
        );

        MenuItem item3 = new MenuItem(
            "Crispy Samosa Chaat",
            "Deconstructed spiced potato samosas layered with sweet yogurt, tangy tamarind chutney, spicy mint chutney, and fresh pomegranate seeds.",
            "starters", 220.0, "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=600&auto=format&fit=crop", true, false, "Veg"
        );

        MenuItem item4 = new MenuItem(
            "Royal Butter Chicken (Makhani)",
            "Tandoor-roasted shredded chicken simmered in a velvety smooth tomato, honey, and cashew gravy, topped with a dollop of fresh churned butter.",
            "mains", 520.0, "assets/dish_butter_chicken.jpg", false, true, "GF,Signature"
        );

        MenuItem item5 = new MenuItem(
            "Shahi Paneer Butter Masala",
            "Slabs of premium fresh cottage cheese cooked in a rich, velvety tomato and cashew cream gravy, flavored with roasted fenugreek leaves.",
            "mains", 440.0, "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600&auto=format&fit=crop", true, true, "Veg,GF"
        );

        MenuItem item6 = new MenuItem(
            "Dal Makhani & Truffle Naan",
            "Slow-cooked black lentils simmered overnight on charcoal with butter and cream, served alongside hot, crispy truffle-butter naan.",
            "mains", 420.0, "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop", true, false, "Veg"
        );

        MenuItem item7 = new MenuItem(
            "Saffron Pistachio Kulfi",
            "Rich, slow-reduced traditional Indian ice cream infused with saffron threads, crushed green cardamoms, and slivered pistachios.",
            "desserts", 220.0, "https://images.unsplash.com/photo-1505394033-f3c0bb13c510?q=80&w=600&auto=format&fit=crop", true, true, "Veg,GF,Ice Cream"
        );

        MenuItem item8 = new MenuItem(
            "Gulab Jamun & Vanilla Gelato",
            "Warm, soft golden-fried milk dumplings steeped in cardamom-rose sugar syrup, paired with a scoop of premium vanilla bean gelato.",
            "desserts", 240.0, "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop", true, false, "Veg"
        );

        MenuItem item9 = new MenuItem(
            "Royal Mango Lassi Mocktail",
            "Creamy traditional yogurt beverage blended with rich Alphonso mango pulp, saffron, cardamoms, and topped with sliced pistachios.",
            "drinks", 210.0, "assets/dish_mango_lassi.jpg", true, true, "Veg,GF,Mocktail"
        );

        MenuItem item10 = new MenuItem(
            "Cardamom Spiced Old Fashioned",
            "A luxury Indian single malt whisky infused with crushed cardamoms, jaggery syrup, smoked with cinnamon bark.",
            "drinks", 580.0, "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop", true, true, "Veg,GF,Cocktail,Alcoholic"
        );

        MenuItem item11 = new MenuItem(
            "Spiced Masala Chai Brew",
            "Premium black tea leaves simmered with milk, fresh ginger root, green cardamoms, cinnamon, and cloves, served piping hot in custom clay cups.",
            "drinks", 150.0, "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop", true, true, "Veg,GF"
        );

        // Expanded Chicken related dishes
        MenuItem item12 = new MenuItem(
            "Tandoori Chicken Tikka",
            "Skewered boneless chicken chunks marinated in a spicy tandoori yogurt blend, char-grilled to juicy tenderness in the clay oven.",
            "starters", 480.0, "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop", false, true, "GF,Chicken"
        );

        MenuItem item13 = new MenuItem(
            "Hyderabadi Chicken Biryani",
            "Fragrant basmati rice layered with juicy spiced chicken, saffron strands, fresh mint, caramelized onions, slow-cooked in traditional Dum style.",
            "mains", 490.0, "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop", false, true, "GF,Chicken,Signature"
        );

        MenuItem item14 = new MenuItem(
            "Chicken Tikka Masala",
            "Tender pieces of grilled chicken tikka simmered in a creamy, mildly spiced tomato-onion gravy with bell peppers and fresh coriander.",
            "mains", 510.0, "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop", false, true, "GF,Chicken"
        );

        menuItemRepository.saveAll(Arrays.asList(item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14));
    }

    private void seedMockReservations() {
        if (reservationRepository.count() > 0) return;

        LocalDate today = LocalDate.now();
        LocalDate tomorrowObj = today.plusDays(1);
        
        String todayStr = today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String tomorrowStr = tomorrowObj.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        Reservation r1 = new Reservation("MOCK-1", todayStr, "18:00 - 19:30", 6, "Window Booth 6", "W6", "Neetu", "neetu@example.com", "+91 98765 43210", 4, "Window seat preferred");
        r1.setPreorderedItems("Paneer Tikka Angare, Spiced Masala Chai Brew");
        r1.setPreorderTotal(540.0);

        Reservation r2 = new Reservation("MOCK-2", todayStr, "18:00 - 19:30", 10, "Grand Table 10", "T10", "Shruti", "shruti@example.com", "+91 87654 32109", 6, "Near live music stage");
        r2.setPreorderedItems("Dal Makhani & Truffle Naan, Shahi Paneer Butter Masala");
        r2.setPreorderTotal(860.0);

        Reservation r3 = new Reservation("MOCK-3", todayStr, "19:30 - 21:00", 13, "Royal Salon 1", "VIP1", "Shreya", "shreya@example.com", "+91 76543 21098", 8, "Strict privacy required");
        r3.setPreorderedItems("Hyderabadi Chicken Biryani, Cardamom Spiced Old Fashioned");
        r3.setPreorderTotal(1070.0);

        Reservation r4 = new Reservation("MOCK-4", todayStr, "12:00 - 13:30", 1, "Bar Seat 1", "B1", "Vedant", "vedant@example.com", "+91 65432 10987", 2, "Seating close to bar");
        r4.setPreorderedItems("Tandoori Chicken Tikka");
        r4.setPreorderTotal(480.0);

        Reservation r5 = new Reservation("MOCK-5", tomorrowStr, "19:30 - 21:00", 8, "Window Booth 8", "W8", "Sakshi Vinod Sonawane", "sonawanesakshi565@gmail.com", "+91 8329870479", 4, "Window seat");
        r5.setPreorderedItems("Chicken Tikka Masala, Royal Mango Lassi Mocktail");
        r5.setPreorderTotal(720.0);

        reservationRepository.saveAll(Arrays.asList(r1, r2, r3, r4, r5));
    }

    private void seedMockReviews() {
        if (reviewRepository.count() > 0) return;

        // Seed some ratings & comments for the seeded dishes
        Review rev1 = new Review(4L, "Vedant", 5, "Best butter chicken in town! Extremely creamy cashew gravy and tender chicken.", "Aug 2, 2026");
        Review rev2 = new Review(4L, "Neetu", 4, "Very tasty and authentic. Would definitely order again.", "Aug 2, 2026");
        
        Review rev3 = new Review(1L, "Shreya", 5, "The paneer tikka was smokey and well marinated. Loved the mint chutney pairing!", "Aug 1, 2026");
        Review rev4 = new Review(13L, "Sakshi Vinod", 5, "Unbelievable chicken biryani! The Dum aroma is out of this world. Spot on spices.", "Aug 2, 2026");
        Review rev5 = new Review(13L, "Shruti", 5, "Fluffy rice, rich flavors, and well cooked chicken. Highly recommended!", "Aug 2, 2026");

        Review rev6 = new Review(9L, "Vedant", 4, "Refreshing lassi. Saffron and pistachio toppings were a nice touch.", "Aug 2, 2026");
        Review rev7 = new Review(14L, "Neetu", 5, "Loved the bell peppers in the Chicken Tikka Masala. Rich and flavorful.", "Aug 2, 2026");

        reviewRepository.saveAll(Arrays.asList(rev1, rev2, rev3, rev4, rev5, rev6, rev7));
    }
}
