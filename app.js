// Aura Dining Hybrid Client Logic (Full-Stack API mode with LocalStorage/Memory fallback)

const tables = [
    { id: 1, code: "B1", name: "Bar Seat 1", capacity: 2, type: "Bar Seat" },
    { id: 2, code: "B2", name: "Bar Seat 2", capacity: 2, type: "Bar Seat" },
    { id: 3, code: "B3", name: "Bar Seat 3", capacity: 2, type: "Bar Seat" },
    { id: 4, code: "B4", name: "Bar Seat 4", capacity: 2, type: "Bar Seat" },
    { id: 5, code: "W5", name: "Window Booth 5", capacity: 4, type: "Window Booth" },
    { id: 6, code: "W6", name: "Window Booth 6", capacity: 4, type: "Window Booth" },
    { id: 7, code: "W7", name: "Window Booth 7", capacity: 4, type: "Window Booth" },
    { id: 8, code: "W8", name: "Window Booth 8", capacity: 4, type: "Window Booth" },
    { id: 9, code: "T9", name: "Lounge Table 9", capacity: 4, type: "Standard Table" },
    { id: 10, code: "T10", name: "Grand Table 10", capacity: 6, type: "Standard Table" },
    { id: 11, code: "T11", name: "Lounge Table 11", capacity: 4, type: "Standard Table" },
    { id: 12, code: "T12", name: "Grand Table 12", capacity: 6, type: "Standard Table" },
    { id: 13, code: "VIP1", name: "Royal Salon 1", capacity: 8, type: "VIP Lounge Room" },
    { id: 14, code: "VIP2", name: "Royal Salon 2", capacity: 8, type: "VIP Lounge Room" }
];

// Local Hardcoded Mock Data (fallback when backend is not running or file is opened via file:///)
const localMenuItems = [
    { id: 1, title: "Paneer Tikka Angare", description: "Charcoal-grilled cottage cheese cubes marinated in spiced Greek yogurt, yellow chili, and ground spices, served with fresh mint chutney.", category: "starters", price: 390.0, image: "assets/dish_paneer_tikka.jpg", isVeg: true, isGf: true, tags: "Veg,GF" },
    { id: 2, title: "Hara Bhara Kabab", description: "Pan-seared patties of minced garden spinach, green peas, and local potatoes, stuffed with cream cheese and chopped dry fruits.", category: "starters", price: 320.0, image: "https://images.unsplash.com/photo-1547058886-cc22f66d62d2?q=80&w=600&auto=format&fit=crop", isVeg: true, isGf: true, tags: "Veg,GF" },
    { id: 3, title: "Crispy Samosa Chaat", description: "Deconstructed spiced potato samosas layered with sweet yogurt, tangy tamarind chutney, spicy mint chutney, and fresh pomegranate seeds.", category: "starters", price: 220.0, image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=600&auto=format&fit=crop", isVeg: true, isGf: false, tags: "Veg" },
    { id: 4, title: "Royal Butter Chicken (Makhani)", description: "Tandoor-roasted shredded chicken simmered in a velvety smooth tomato, honey, and cashew gravy, topped with a dollop of fresh churned butter.", category: "mains", price: 520.0, image: "assets/dish_butter_chicken.jpg", isVeg: false, isGf: true, tags: "GF,Signature" },
    { id: 5, title: "Shahi Paneer Butter Masala", description: "Slabs of premium fresh cottage cheese cooked in a rich, velvety tomato and cashew cream gravy, flavored with roasted fenugreek leaves.", category: "mains", price: 440.0, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600&auto=format&fit=crop", isVeg: true, isGf: true, tags: "Veg,GF" },
    { id: 6, title: "Dal Makhani & Truffle Naan", description: "Slow-cooked black lentils simmered overnight on charcoal with butter and cream, served alongside hot, crispy truffle-butter naan.", category: "mains", price: 420.0, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop", isVeg: true, isGf: false, tags: "Veg" },
    { id: 7, title: "Saffron Pistachio Kulfi", description: "Rich, slow-reduced traditional Indian ice cream infused with saffron threads, crushed green cardamoms, and slivered pistachios.", category: "desserts", price: 220.0, image: "https://images.unsplash.com/photo-1505394033-f3c0bb13c510?q=80&w=600&auto=format&fit=crop", isVeg: true, isGf: true, tags: "Veg,GF,Ice Cream" },
    { id: 8, title: "Gulab Jamun & Vanilla Gelato", description: "Warm, soft golden-fried milk dumplings steeped in cardamom-rose sugar syrup, paired with a scoop of premium vanilla bean gelato.", category: "desserts", price: 240.0, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop", isVeg: true, isGf: false, tags: "Veg" },
    { id: 9, title: "Royal Mango Lassi Mocktail", description: "Creamy traditional yogurt beverage blended with rich Alphonso mango pulp, saffron, cardamoms, and topped with sliced pistachios.", category: "drinks", price: 210.0, image: "assets/dish_mango_lassi.jpg", isVeg: true, isGf: true, tags: "Veg,GF,Mocktail" },
    { id: 10, title: "Cardamom Spiced Old Fashioned", description: "A luxury Indian single malt whisky infused with crushed cardamoms, jaggery syrup, smoked with cinnamon bark.", category: "drinks", price: 580.0, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop", isVeg: true, isGf: true, tags: "Veg,GF,Cocktail,Alcoholic" },
    { id: 11, title: "Spiced Masala Chai Brew", description: "Premium black tea leaves simmered with milk, fresh ginger root, green cardamoms, cinnamon, and cloves, served piping hot in custom clay cups.", category: "drinks", price: 150.0, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop", isVeg: true, isGf: true, tags: "Veg,GF" },
    { id: 12, title: "Tandoori Chicken Tikka", description: "Skewered boneless chicken chunks marinated in a spicy tandoori yogurt blend, char-grilled to juicy tenderness in the clay oven.", category: "starters", price: 480.0, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop", isVeg: false, isGf: true, tags: "GF,Chicken" },
    { id: 13, title: "Hyderabadi Chicken Biryani", description: "Fragrant basmati rice layered with juicy spiced chicken, saffron strands, fresh mint, caramelized onions, slow-cooked in traditional Dum style.", category: "mains", price: 490.0, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop", isVeg: false, isGf: true, tags: "GF,Chicken,Signature" },
    { id: 14, title: "Chicken Tikka Masala", description: "Tender pieces of grilled chicken tikka simmered in a creamy, mildly spiced tomato-onion gravy with bell peppers and fresh coriander.", category: "mains", price: 510.0, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop", isVeg: false, isGf: true, tags: "GF,Chicken" }
];

let localActiveBookings = [];
let localTableOverrides = {};
let localMockReviews = [
    { id: 1, menuItemId: 4, guestName: "Vedant", rating: 5, comment: "Best butter chicken in town! Extremely creamy cashew gravy and tender chicken.", date: "Aug 2, 2026" },
    { id: 2, menuItemId: 4, guestName: "Neetu", rating: 4, comment: "Very tasty and authentic. Would definitely order again.", date: "Aug 2, 2026" },
    { id: 3, menuItemId: 1, guestName: "Shreya", rating: 5, comment: "The paneer tikka was smokey and well marinated. Loved the mint chutney pairing!", date: "Aug 1, 2026" },
    { id: 4, menuItemId: 13, guestName: "Sakshi Vinod", rating: 5, comment: "Unbelievable chicken biryani! The Dum aroma is out of this world. Spot on spices.", date: "Aug 2, 2026" },
    { id: 5, menuItemId: 13, guestName: "Shruti", rating: 5, comment: "Fluffy rice, rich flavors, and well cooked chicken. Highly recommended!", date: "Aug 2, 2026" },
    { id: 6, menuItemId: 9, guestName: "Vedant", rating: 4, comment: "Refreshing lassi. Saffron and pistachio toppings were a nice touch.", date: "Aug 2, 2026" },
    { id: 7, menuItemId: 14, guestName: "Neetu", rating: 5, comment: "Loved the bell peppers in the Chicken Tikka Masala. Rich and flavorful.", date: "Aug 2, 2026" }
];

let selectedTable = null;
let currentReviewMenuItemId = null;
let selectedReviewRating = 5;

// Load local database values on launch
function initLocalMockData() {
    const stored = localStorage.getItem("aura_dining_reservations");
    if (stored) {
        localActiveBookings = JSON.parse(stored);
    } else {
        // Seed default guest details (updated to INR)
        const todayStr = new Date().toISOString().split('T')[0];
        const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
        localActiveBookings = [
            { id: "MOCK-1", date: todayStr, time: "18:00 - 19:30", tableId: 6, tableName: "Window Booth 6", tableCode: "W6", guestName: "Neetu", guestEmail: "neetu@example.com", guestPhone: "+91 98765 43210", guests: 4, specialRequests: "Window seat preferred", preorderedItems: "Paneer Tikka Angare, Spiced Masala Chai Brew", preorderTotal: 540.0 },
            { id: "MOCK-2", date: todayStr, time: "18:00 - 19:30", tableId: 10, tableName: "Grand Table 10", tableCode: "T10", guestName: "Shruti", guestEmail: "shruti@example.com", guestPhone: "+91 87654 32109", guests: 6, specialRequests: "Near live music stage", preorderedItems: "Dal Makhani & Truffle Naan, Shahi Paneer Butter Masala", preorderTotal: 860.0 },
            { id: "MOCK-3", date: todayStr, time: "19:30 - 21:00", tableId: 13, tableName: "Royal Salon 1", tableCode: "VIP1", guestName: "Shreya", guestEmail: "shreya@example.com", guestPhone: "+91 76543 21098", guests: 8, specialRequests: "Strict privacy required", preorderedItems: "Hyderabadi Chicken Biryani, Cardamom Spiced Old Fashioned", preorderTotal: 1070.0 },
            { id: "MOCK-4", date: todayStr, time: "12:00 - 13:30", tableId: 1, tableName: "Bar Seat 1", tableCode: "B1", guestName: "Vedant", guestEmail: "vedant@example.com", guestPhone: "+91 65432 10987", guests: 2, specialRequests: "Seating close to bar", preorderedItems: "Tandoori Chicken Tikka", preorderTotal: 480.0 },
            { id: "MOCK-5", date: tomorrowStr, time: "19:30 - 21:00", tableId: 8, tableName: "Window Booth 8", tableCode: "W8", guestName: "Sakshi Vinod Sonawane", guestEmail: "sonawanesakshi565@gmail.com", guestPhone: "+91 8329870479", guests: 4, specialRequests: "Window seat", preorderedItems: "Chicken Tikka Masala, Royal Mango Lassi Mocktail", preorderTotal: 720.0 }
        ];
        localStorage.setItem("aura_dining_reservations", JSON.stringify(localActiveBookings));
    }
    
    const storedOverrides = localStorage.getItem("aura_dining_table_overrides");
    if (storedOverrides) {
        localTableOverrides = JSON.parse(storedOverrides);
    }
    
    const storedReviews = localStorage.getItem("aura_dining_reviews");
    if (storedReviews) {
        localMockReviews = JSON.parse(storedReviews);
    } else {
        localStorage.setItem("aura_dining_reviews", JSON.stringify(localMockReviews));
    }
}

// Check if we are running as a local file or standard webserver
function isLocalFileMode() {
    return window.location.protocol === 'file:';
}

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
    initLocalMockData();
    setupDateLimits();
    renderMenu("all", false, false);
    setupEventListeners();
    updateFloorPlanState();
    renderDashboard();
    renderAdminTables();
    renderAdminReservations();
    populatePreorderItems();
});

// Setup date inputs limits (Min = today, Max = 3 months from now)
function setupDateLimits() {
    const dateInput = document.getElementById("booking-date");
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    
    const minDate = `${yyyy}-${mm}-${dd}`;
    dateInput.min = minDate;
    dateInput.value = minDate; // default to today
    
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 3);
    const max_yyyy = futureDate.getFullYear();
    const max_mm = String(futureDate.getMonth() + 1).padStart(2, '0');
    const max_dd = String(futureDate.getDate()).padStart(2, '0');
    dateInput.max = `${max_yyyy}-${max_mm}-${max_dd}`;
}

// Render dynamic menu items (Currency symbol changed to Indian Rupees: ₹)
function renderMenu(category, vegOnly, gfOnly) {
    const renderHtml = (items, allReviews) => {
        const grid = document.getElementById("menu-grid");
        grid.innerHTML = "";
        
        let filtered = items;
        if (category !== "all") {
            filtered = filtered.filter(item => item.category === category);
        }
        if (vegOnly) {
            filtered = filtered.filter(item => item.isVeg);
        }
        if (gfOnly) {
            filtered = filtered.filter(item => item.isGf);
        }
        
        filtered.forEach(dish => {
            const card = document.createElement("div");
            card.className = "menu-card glass-panel";
            
            // Calculate Ratings badge
            const dishReviews = allReviews.filter(r => r.menuItemId === dish.id);
            const count = dishReviews.length;
            let ratingHtml = "";
            if (count > 0) {
                const avg = (dishReviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1);
                ratingHtml = `<div class="menu-card-rating" onclick="openReviewModal(${dish.id})">★ ${avg} <span>(${count} reviews)</span></div>`;
            } else {
                ratingHtml = `<div class="menu-card-rating" onclick="openReviewModal(${dish.id})">★ 0.0 <span>(0 reviews)</span></div>`;
            }
            
            let tagsHtml = "";
            const tagList = dish.tags ? dish.tags.split(",") : [];
            tagList.forEach(t => {
                const cls = t === "Veg" ? "tag-veg" : (t === "GF" ? "tag-gf" : "");
                tagsHtml += `<span class="tag ${cls}">${t}</span>`;
            });
            
            card.innerHTML = `
                <div class="menu-img-wrapper">
                    <img src="${dish.image}" alt="${dish.title}" class="menu-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop'">
                    ${tagList.includes("Signature") ? '<span class="menu-badge">Chef Selection</span>' : ''}
                </div>
                <div class="menu-details">
                    <div class="menu-header-row">
                        <h3 class="menu-dish-title">${dish.title}</h3>
                        <span class="menu-dish-price">₹${dish.price}</span>
                    </div>
                    ${ratingHtml}
                    <p class="menu-dish-desc">${dish.description}</p>
                    <div class="menu-dish-tags">
                        ${tagsHtml}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    if (isLocalFileMode()) {
        renderHtml(localMenuItems, localMockReviews);
        return;
    }

    Promise.all([
        fetch("/api/menu").then(res => res.json()),
        fetch("/api/reviews").then(res => res.json())
    ]).then(([items, allReviews]) => {
        renderHtml(items, allReviews);
    })
    .catch(err => {
        console.warn("Backend offline. Falling back to local static data.", err);
        renderHtml(localMenuItems, localMockReviews);
    });
}

// Populate preorder selection grid inside booking form (Rupee symbol: ₹)
function populatePreorderItems() {
    const populateHtml = (items) => {
        const grid = document.getElementById("preorder-items-grid");
        if (!grid) return;
        grid.innerHTML = "";
        
        items.forEach(item => {
            const div = document.createElement("div");
            div.className = "preorder-item";
            
            const isVeg = item.isVeg;
            const tagIndicator = isVeg ? '<span class="item-tag-indicator veg">Veg</span>' : '<span class="item-tag-indicator nonveg">Non-Veg</span>';
            
            div.innerHTML = `
                <label>
                    <input type="checkbox" class="preorder-checkbox" value="${item.id}" data-title="${item.title}" data-price="${item.price}" onchange="updatePreorderTotal()">
                    <div class="item-details">
                        <span>${item.title}</span>
                        ${tagIndicator}
                    </div>
                </label>
                <span class="preorder-item-price">₹${item.price.toFixed(2)}</span>
            `;
            grid.appendChild(div);
        });
    };

    if (isLocalFileMode()) {
        populateHtml(localMenuItems);
        return;
    }

    fetch("/api/menu")
        .then(res => res.json())
        .then(items => populateHtml(items))
        .catch(err => {
            populateHtml(localMenuItems);
        });
}

// Update preorder running total counter
window.updatePreorderTotal = function() {
    const checkboxes = document.querySelectorAll(".preorder-checkbox:checked");
    let total = 0;
    checkboxes.forEach(cb => {
        total += parseFloat(cb.getAttribute("data-price"));
    });
    const totalVal = document.getElementById("preorder-total-val");
    if (totalVal) {
        totalVal.textContent = `₹${total.toFixed(2)}`;
    }
}

// Setup floor plan state based on date, time and guest capacity
function updateFloorPlanState() {
    const selectedDate = document.getElementById("booking-date").value;
    const selectedTime = document.getElementById("booking-time").value;
    const guestCount = parseInt(document.getElementById("booking-guests").value) || 2;
    
    const tableNodes = document.querySelectorAll(".table-group");
    
    const renderFloor = (occupiedBookings, overrides) => {
        const occupiedTableIds = occupiedBookings.map(b => b.tableId);
        const blockedTableIds = overrides.map(o => o.id);
            
        tableNodes.forEach(node => {
            const tableId = parseInt(node.getAttribute("data-table-id"));
            const tableCap = parseInt(node.getAttribute("data-capacity"));
            
            node.classList.remove("status-available", "status-occupied", "status-selected");
            
            if (blockedTableIds.includes(tableId)) {
                node.classList.add("status-occupied");
            } else if (occupiedTableIds.includes(tableId)) {
                node.classList.add("status-occupied");
            } else if (tableCap < guestCount) {
                node.classList.add("status-occupied");
            } else {
                if (selectedTable && selectedTable.id === tableId) {
                    node.classList.add("status-selected");
                } else {
                    node.classList.add("status-available");
                }
            }
        });
    };

    if (isLocalFileMode()) {
        const occupied = localActiveBookings.filter(b => b.date === selectedDate && b.time === selectedTime);
        const blockedList = Object.keys(localTableOverrides)
            .filter(id => localTableOverrides[id] === 'blocked')
            .map(id => ({ id: parseInt(id) }));
        renderFloor(occupied, blockedList);
        return;
    }

    Promise.all([
        fetch(`/api/bookings/check?date=${selectedDate}&time=${selectedTime}`).then(res => res.json()),
        fetch("/api/tables/overrides").then(res => res.json())
    ]).then(([occupiedBookings, overrides]) => {
        renderFloor(occupiedBookings, overrides);
    }).catch(err => {
        const occupied = localActiveBookings.filter(b => b.date === selectedDate && b.time === selectedTime);
        const blockedList = Object.keys(localTableOverrides)
            .filter(id => localTableOverrides[id] === 'blocked')
            .map(id => ({ id: parseInt(id) }));
        renderFloor(occupied, blockedList);
    });
}

// Set up all interactive event listeners
function setupEventListeners() {
    // Menu Category Buttons
    const catButtons = document.querySelectorAll(".menu-cat-btn");
    catButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            catButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const category = btn.getAttribute("data-category");
            const vegOnly = document.getElementById("diet-veg").checked;
            const gfOnly = document.getElementById("diet-gf").checked;
            
            renderMenu(category, vegOnly, gfOnly);
        });
    });
    
    // Menu Dietary Toggles
    document.getElementById("diet-veg").addEventListener("change", triggerMenuFilter);
    document.getElementById("diet-gf").addEventListener("change", triggerMenuFilter);
    
    function triggerMenuFilter() {
        const activeCat = document.querySelector(".menu-cat-btn.active").getAttribute("data-category");
        const vegOnly = document.getElementById("diet-veg").checked;
        const gfOnly = document.getElementById("diet-gf").checked;
        renderMenu(activeCat, vegOnly, gfOnly);
    }
    
    // Booking Form changes trigger map refresh
    document.getElementById("booking-date").addEventListener("change", () => {
        selectedTable = null;
        resetFormState();
        updateFloorPlanState();
    });
    document.getElementById("booking-time").addEventListener("change", () => {
        selectedTable = null;
        resetFormState();
        updateFloorPlanState();
    });
    document.getElementById("booking-guests").addEventListener("change", () => {
        selectedTable = null;
        resetFormState();
        updateFloorPlanState();
    });

    // Preorder collapsible toggle trigger
    const preorderToggle = document.getElementById("preorder-toggle");
    const preorderContent = document.getElementById("preorder-content");
    if (preorderToggle && preorderContent) {
        preorderToggle.addEventListener("click", () => {
            preorderToggle.classList.toggle("active");
            preorderContent.classList.toggle("hidden");
        });
    }

    // Close review modal button
    const closeReviewBtn = document.getElementById("close-review-btn");
    if (closeReviewBtn) {
        closeReviewBtn.addEventListener("click", closeReviewModal);
    }

    // Submit new customer review
    const addReviewForm = document.getElementById("add-review-form");
    if (addReviewForm) {
        addReviewForm.addEventListener("submit", handleReviewSubmission);
    }
    
    // Interactive SVG Floor Plan Clicks
    const tableNodes = document.querySelectorAll(".table-group");
    const tooltip = document.getElementById("map-tooltip");
    
    tableNodes.forEach(node => {
        const tableId = parseInt(node.getAttribute("data-table-id"));
        const tableObj = tables.find(t => t.id === tableId);
        
        node.addEventListener("click", () => {
            if (node.classList.contains("status-occupied")) {
                showToast("Unavailable", "Table is fully booked or too small for your party.", "fa-circle-xmark");
                return;
            }
            
            if (selectedTable && selectedTable.id === tableId) {
                selectedTable = null;
                resetFormState();
            } else {
                selectedTable = tableObj;
                selectTable(tableObj);
            }
            updateFloorPlanState();
        });
        
        node.addEventListener("mouseenter", () => {
            if (node.classList.contains("status-occupied")) {
                const guestCount = parseInt(document.getElementById("booking-guests").value);
                if (tableObj.capacity < guestCount) {
                    tooltip.innerHTML = `<strong>${tableObj.name}</strong> - Capacity: ${tableObj.capacity} guests <span style='color: #e74c3c'>(Too Small)</span>`;
                } else {
                    tooltip.innerHTML = `<strong>${tableObj.name}</strong> - <span style='color: #e74c3c'>Fully Booked</span>`;
                }
            } else {
                tooltip.innerHTML = `<strong>${tableObj.name}</strong> - Capacity: ${tableObj.capacity} guests <span style='color: #2ecc71'>(Available)</span>`;
            }
        });
        
        node.addEventListener("mouseleave", () => {
            if (selectedTable) {
                tooltip.innerHTML = `Selected: <strong>${selectedTable.name}</strong> (${selectedTable.capacity} Seats)`;
            } else {
                tooltip.innerHTML = "Hover over a table";
            }
        });
    });
    
    // Form Submission
    document.getElementById("booking-form").addEventListener("submit", handleFormSubmission);

    // Navbar Navigation Highlight
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(a => {
            a.classList.remove("active");
            if (a.getAttribute("href").slice(1) === current) {
                a.classList.add("active");
            }
        });
    });

    // Mobile Navigation Drawer Toggle
    const mobileToggle = document.getElementById("mobile-toggle");
    const navLinks = document.querySelector(".nav-links");
    mobileToggle.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-open");
        const icon = mobileToggle.querySelector("i");
        if (navLinks.classList.contains("mobile-open")) {
            icon.className = "fa-solid fa-xmark";
            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "column";
            navLinks.style.position = "absolute";
            navLinks.style.top = "80px";
            navLinks.style.left = "0";
            navLinks.style.width = "100%";
            navLinks.style.background = "rgba(13, 16, 23, 0.98)";
            navLinks.style.padding = "20px";
            navLinks.style.borderBottom = "1px solid var(--border-card)";
        } else {
            icon.className = "fa-solid fa-bars";
            navLinks.removeAttribute("style");
        }
    });

    // Close mobile nav when clicking item
    navLinks.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
            if (navLinks.classList.contains("mobile-open")) {
                navLinks.classList.remove("mobile-open");
                mobileToggle.querySelector("i").className = "fa-solid fa-bars";
                navLinks.removeAttribute("style");
            }
        });
    });

    // Admin search filter listener
    const searchInput = document.getElementById("admin-search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            renderAdminReservations(e.target.value);
        });
    }
}

// Selecting a table changes form states
function selectTable(table) {
    const readout = document.getElementById("table-readout");
    const readoutVal = document.getElementById("selected-table-val");
    const guestSec = document.getElementById("guest-details");
    const submitBtn = document.getElementById("submit-booking-btn");
    const tooltip = document.getElementById("map-tooltip");
    
    readout.classList.add("highlight-selected");
    readoutVal.innerHTML = `${table.name} (${table.type} - Max ${table.capacity} Seats)`;
    tooltip.innerHTML = `Selected: <strong>${table.name}</strong>`;
    
    guestSec.classList.remove("hidden");
    setTimeout(() => guestSec.classList.add("open"), 50);
    
    submitBtn.classList.remove("disabled");
    submitBtn.removeAttribute("disabled");
}

// Reset form fields
function resetFormState() {
    const readout = document.getElementById("table-readout");
    const readoutVal = document.getElementById("selected-table-val");
    const guestSec = document.getElementById("guest-details");
    const submitBtn = document.getElementById("submit-booking-btn");
    const tooltip = document.getElementById("map-tooltip");
    
    readout.classList.remove("highlight-selected");
    readoutVal.innerHTML = "Please select a table on the map";
    tooltip.innerHTML = "Hover over a table";
    
    guestSec.classList.remove("open");
    setTimeout(() => guestSec.classList.add("hidden"), 400);
    
    submitBtn.classList.add("disabled");
    submitBtn.setAttribute("disabled", "true");

    // Clear preorder selections
    const checkboxes = document.querySelectorAll(".preorder-checkbox");
    checkboxes.forEach(cb => cb.checked = false);
    const totalVal = document.getElementById("preorder-total-val");
    if (totalVal) totalVal.textContent = "₹0.00";

    const preorderToggle = document.getElementById("preorder-toggle");
    const preorderContent = document.getElementById("preorder-content");
    if (preorderToggle && preorderContent) {
        preorderToggle.classList.remove("active");
        preorderContent.classList.add("hidden");
    }
}

// Handle reservation booking submissions
function handleFormSubmission(e) {
    e.preventDefault();
    if (!selectedTable) {
        showToast("Error", "Please select a table from the floor map.", "fa-circle-xmark");
        return;
    }
    
    const date = document.getElementById("booking-date").value;
    const time = document.getElementById("booking-time").value;
    const guests = parseInt(document.getElementById("booking-guests").value);
    const name = document.getElementById("guest-name").value;
    const email = document.getElementById("guest-email").value;
    const phone = document.getElementById("guest-phone").value;
    const requests = document.getElementById("special-requests").value;
    
    // Evaluate pre-orders
    const preorderedItemsCheck = document.querySelectorAll(".preorder-checkbox:checked");
    let preorderTitles = [];
    let preorderSum = 0;
    preorderedItemsCheck.forEach(cb => {
        preorderTitles.push(cb.getAttribute("data-title"));
        preorderSum += parseFloat(cb.getAttribute("data-price"));
    });

    const uniqueId = "AURA-" + Math.floor(100000 + Math.random() * 900000);
    
    const newReservation = {
        id: uniqueId,
        date: date,
        time: time,
        tableId: selectedTable.id,
        tableName: selectedTable.name,
        tableCode: selectedTable.code,
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        guests: guests,
        specialRequests: requests || "None",
        preorderedItems: preorderTitles.length > 0 ? preorderTitles.join(", ") : "None",
        preorderTotal: preorderSum
    };
    
    const runLocalSave = () => {
        localActiveBookings.push(newReservation);
        localStorage.setItem("aura_dining_reservations", JSON.stringify(localActiveBookings));
        
        selectedTable = null;
        resetFormState();
        document.getElementById("booking-form").reset();
        setupDateLimits();
        showToast("Booking Confirmed", `Your table ${newReservation.tableCode} is reserved. Code: ${newReservation.id}`, "fa-circle-check");
        
        updateFloorPlanState();
        renderDashboard();
        renderAdminTables();
        renderAdminReservations();
        
        setTimeout(() => {
            document.getElementById("dashboard").scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    };

    if (isLocalFileMode()) {
        runLocalSave();
        return;
    }

    fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReservation)
    })
    .then(res => res.json())
    .then(saved => {
        selectedTable = null;
        resetFormState();
        document.getElementById("booking-form").reset();
        setupDateLimits();
        showToast("Booking Confirmed", `Your table ${saved.tableCode} is reserved. Code: ${saved.id}`, "fa-circle-check");
        
        updateFloorPlanState();
        renderDashboard();
        renderAdminTables();
        renderAdminReservations();
        
        setTimeout(() => {
            document.getElementById("dashboard").scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    })
    .catch(err => {
        console.warn("Backend offline. Saving booking to local cache.", err);
        runLocalSave();
    });
}

// Render dynamic tickets in the User Dashboard
function renderDashboard() {
    const renderHtml = (bookings) => {
        const noBookingsPanel = document.getElementById("no-bookings");
        const grid = document.getElementById("bookings-grid");
        
        const userBookings = bookings.filter(b => b.id.startsWith("AURA-"));
        
        if (userBookings.length === 0) {
            noBookingsPanel.classList.remove("hidden");
            grid.classList.add("hidden");
            return;
        }
        
        noBookingsPanel.classList.add("hidden");
        grid.classList.remove("hidden");
        grid.innerHTML = "";
        
        userBookings.forEach(booking => {
            const card = document.createElement("div");
            card.className = "ticket-card";
            
            let preorderHtml = "";
            if (booking.preorderedItems && booking.preorderedItems !== "None") {
                preorderHtml = `
                    <div class="ticket-preorders">
                        <div class="ticket-preorders-title">Pre-ordered Food & Drinks</div>
                        <div class="ticket-preorders-list">${booking.preorderedItems}</div>
                        <div class="ticket-preorder-total">
                            <span>Pre-order Total:</span>
                            <span class="gold-text">₹${booking.preorderTotal.toFixed(2)}</span>
                        </div>
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="ticket-header">
                    <span class="ticket-title"><span class="gold-text">AURA</span> DINING</span>
                    <span class="ticket-status-badge">Confirmed</span>
                </div>
                <div class="ticket-body">
                    <div class="ticket-info-grid">
                        <div class="info-item">
                            <span class="info-label">Guest</span>
                            <span class="info-val">${booking.guestName}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Booking Reference</span>
                            <span class="info-val gold-text">${booking.id}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Date</span>
                            <span class="info-val">${formatDateString(booking.date)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Time Slot</span>
                            <span class="info-val">${booking.time}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Table Reserved</span>
                            <span class="info-val gold-text">${booking.tableCode} (${booking.tableName})</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Party Size</span>
                            <span class="info-val">${booking.guests} Guests</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Special Requests</span>
                        <span class="info-val" style="font-size: 0.8rem; line-height: 1.4; color: var(--text-secondary); max-width: 100%; word-break: break-word;">
                            ${booking.specialRequests}
                        </span>
                    </div>
                    ${preorderHtml}
                </div>
                <div class="ticket-footer">
                    <div class="barcode-visual" title="${booking.id}"></div>
                    <div class="ticket-actions">
                        <button class="btn-print-ticket" onclick="printTicket('${booking.id}')">
                            <i class="fa-solid fa-print"></i> Print
                        </button>
                        <button class="btn-cancel-ticket" onclick="confirmCancellation('${booking.id}')">
                            <i class="fa-solid fa-trash-can"></i> Cancel
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    if (isLocalFileMode()) {
        renderHtml(localActiveBookings);
        return;
    }

    fetch("/api/bookings")
        .then(res => res.json())
        .then(bookings => renderHtml(bookings))
        .catch(err => {
            renderHtml(localActiveBookings);
        });
}

// Cancel booking
function cancelBooking(bookingId) {
    const runLocalCancel = () => {
        localActiveBookings = localActiveBookings.filter(b => b.id !== bookingId);
        localStorage.setItem("aura_dining_reservations", JSON.stringify(localActiveBookings));
        showToast("Cancelled", "Reservation cancelled successfully.", "fa-circle-xmark");
        selectedTable = null;
        resetFormState();
        updateFloorPlanState();
        renderDashboard();
        renderAdminTables();
        renderAdminReservations();
    };

    if (isLocalFileMode()) {
        runLocalCancel();
        return;
    }

    fetch(`/api/bookings/${bookingId}`, { method: "DELETE" })
        .then(res => {
            if (res.ok) {
                showToast("Cancelled", "Reservation cancelled successfully.", "fa-circle-xmark");
                selectedTable = null;
                resetFormState();
                updateFloorPlanState();
                renderDashboard();
                renderAdminTables();
                renderAdminReservations();
            } else {
                showToast("Error", "Could not cancel reservation.", "fa-circle-xmark");
            }
        }).catch(err => {
            console.warn("Backend offline. Cancelling booking locally.", err);
            runLocalCancel();
        });
}

window.confirmCancellation = function(bookingId) {
    if (confirm("Are you sure you want to cancel this reservation? This action cannot be undone.")) {
        cancelBooking(bookingId);
    }
};

window.printTicket = function(bookingId) {
    const ticketCards = document.querySelectorAll('.ticket-card');
    let targetCard = null;
    ticketCards.forEach(card => {
        if (card.innerHTML.includes(bookingId)) {
            targetCard = card;
        }
    });
    if (targetCard) {
        targetCard.classList.add('print-active-ticket');
        window.print();
        targetCard.classList.remove('print-active-ticket');
    }
};

// Format YYYY-MM-DD into attractive visual string
function formatDateString(dateStr) {
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    const dateObj = new Date(dateStr + "T00:00:00");
    return dateObj.toLocaleDateString('en-US', options);
}

// Toast Alert Manager
let toastTimeout;
function showToast(title, message, iconClass = "fa-circle-check") {
    const toast = document.getElementById("toast");
    const toastIcon = toast.querySelector(".toast-icon");
    const toastTitle = document.getElementById("toast-title");
    const toastMsg = document.getElementById("toast-message");
    
    clearTimeout(toastTimeout);
    
    toastIcon.className = `fa-solid ${iconClass} toast-icon`;
    toastTitle.textContent = title;
    toastMsg.textContent = message;
    
    toast.classList.add("show");
    
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}

// Admin Dashboard Logic

// Toggle manual table lock override
window.toggleTableOverride = function(tableId) {
    const runLocalToggle = () => {
        if (localTableOverrides[tableId] === "blocked") {
            delete localTableOverrides[tableId];
            showToast("Table Released", "Table has been opened for customer booking.", "fa-circle-check");
        } else {
            localTableOverrides[tableId] = "blocked";
            showToast("Table Blocked", "Table manually blocked from customer booking.", "fa-circle-check");
        }
        localStorage.setItem("aura_dining_table_overrides", JSON.stringify(localTableOverrides));
        updateFloorPlanState();
        renderAdminTables();
    };

    if (isLocalFileMode()) {
        runLocalToggle();
        return;
    }

    fetch(`/api/tables/overrides/${tableId}`, { method: "POST" })
        .then(res => {
            if (res.ok) {
                showToast("Success", "Table override updated successfully.", "fa-circle-check");
                updateFloorPlanState();
                renderAdminTables();
            } else {
                showToast("Error", "Could not toggle table override.", "fa-circle-xmark");
            }
        }).catch(err => {
            console.warn("Backend offline. Toggling table override locally.", err);
            runLocalToggle();
        });
}

// Render Table Override list for Admin Panel
function renderAdminTables() {
    const grid = document.getElementById("admin-tables-grid");
    if (!grid) return;

    const selectedDate = document.getElementById("booking-date").value;
    const selectedTime = document.getElementById("booking-time").value;
    
    const populateAdminTables = (occupiedBookings, overrides) => {
        grid.innerHTML = "";
        const occupiedTableIds = occupiedBookings.map(b => b.tableId);
        const blockedTableIds = overrides.map(o => o.id);

        tables.forEach(table => {
            const btn = document.createElement("div");
            btn.className = "admin-table-btn";
            
            let statusClass = "status-active-available";
            let statusText = "Open";
            
            if (blockedTableIds.includes(table.id)) {
                statusClass = "status-active-blocked";
                statusText = "Blocked";
            } else if (occupiedTableIds.includes(table.id)) {
                statusClass = "status-active-occupied";
                statusText = "Reserved";
            }
            
            btn.classList.add(statusClass);
            btn.setAttribute("onclick", `toggleTableOverride(${table.id})`);
            
            btn.innerHTML = `
                <span class="table-code">${table.code}</span>
                <span class="table-desc">Max ${table.capacity} Seats</span>
                <span class="table-status-label">${statusText}</span>
            `;
            
            grid.appendChild(btn);
        });
    };

    if (isLocalFileMode()) {
        const occupied = localActiveBookings.filter(b => b.date === selectedDate && b.time === selectedTime);
        const blockedList = Object.keys(localTableOverrides)
            .filter(id => localTableOverrides[id] === 'blocked')
            .map(id => ({ id: parseInt(id) }));
        populateAdminTables(occupied, blockedList);
        return;
    }

    Promise.all([
        fetch(`/api/bookings/check?date=${selectedDate}&time=${selectedTime}`).then(res => res.json()),
        fetch("/api/tables/overrides").then(res => res.json())
    ]).then(([occupiedBookings, overrides]) => {
        populateAdminTables(occupiedBookings, overrides);
    }).catch(err => {
        const occupied = localActiveBookings.filter(b => b.date === selectedDate && b.time === selectedTime);
        const blockedList = Object.keys(localTableOverrides)
            .filter(id => localTableOverrides[id] === 'blocked')
            .map(id => ({ id: parseInt(id) }));
        populateAdminTables(occupied, blockedList);
    });
}

// Render Master Reservations table for Admin Panel
function renderAdminReservations(searchQuery = "") {
    const list = document.getElementById("admin-reservations-list");
    if (!list) return;
    
    const populateAdminReservations = (bookings) => {
        list.innerHTML = "";
        bookings.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
        
        if (bookings.length === 0) {
            list.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); font-size: 0.8rem;">No matching reservations found.</td></tr>`;
            return;
        }
        
        bookings.forEach(booking => {
            const row = document.createElement("tr");
            
            let preorderInfo = "";
            if (booking.preorderedItems && booking.preorderedItems !== "None") {
                preorderInfo = `<div style="font-size: 0.7rem; color: var(--gold); margin-top: 2px;"><i class="fa-solid fa-utensils"></i> Order: ₹${booking.preorderTotal.toFixed(2)}</div>`;
            }

            row.innerHTML = `
                <td class="ref-cell">${booking.id}</td>
                <td>
                    <div><strong>${booking.guestName}</strong></div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${booking.guestPhone || 'Mock System'}</div>
                    ${preorderInfo}
                </td>
                <td class="table-cell">${booking.tableCode || 'T' + booking.tableId}</td>
                <td>${formatDateString(booking.date)}</td>
                <td>${booking.time}</td>
                <td>${booking.guests} Guests</td>
                <td>
                    <button class="btn-delete-admin" onclick="cancelBookingFromAdmin('${booking.id}')" title="Cancel Booking">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            `;
            list.appendChild(row);
        });
    };

    const getFilteredLocal = (q) => {
        let filtered = [...localActiveBookings];
        if (q.trim() !== "") {
            const query = q.toLowerCase();
            filtered = filtered.filter(b => 
                b.id.toLowerCase().includes(query) ||
                b.guestName.toLowerCase().includes(query) ||
                b.guestEmail?.toLowerCase().includes(query) ||
                (b.tableName || "").toLowerCase().includes(query) ||
                (b.tableCode || "").toLowerCase().includes(query) ||
                b.date.includes(query) ||
                b.time.includes(query)
            );
        }
        return filtered;
    };

    if (isLocalFileMode()) {
        populateAdminReservations(getFilteredLocal(searchQuery));
        return;
    }

    let url = "/api/bookings";
    if (searchQuery.trim() !== "") {
        url = `/api/bookings/search?q=${encodeURIComponent(searchQuery)}`;
    }
    
    fetch(url)
        .then(res => res.json())
        .then(bookings => populateAdminReservations(bookings))
        .catch(err => {
            populateAdminReservations(getFilteredLocal(searchQuery));
        });
}

window.cancelBookingFromAdmin = function(bookingId) {
    if (confirm(`Are you sure you want to cancel booking ${bookingId}? This will remove it from the master database.`)) {
        cancelBooking(bookingId);
    }
}

// ----------------- CUSTOMER REVIEWS MODULE -----------------

// Open reviews dialog popup modal
window.openReviewModal = function(dishId) {
    currentReviewMenuItemId = dishId;
    setupReviewStarSelector();
    
    const populateReviews = (dish, reviews) => {
        document.getElementById("review-modal-img").src = dish.image;
        document.getElementById("review-modal-img").alt = dish.title;
        document.getElementById("review-modal-title").textContent = dish.title;
        document.getElementById("review-modal-desc").textContent = dish.description;
        
        const count = reviews.length;
        const avg = count > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1) : "0.0";
        document.getElementById("review-modal-avg-stars").textContent = `★ ${avg}`;
        document.getElementById("review-modal-count").textContent = `(${count} reviews)`;
        
        const container = document.getElementById("reviews-list-container");
        container.innerHTML = "";
        
        if (reviews.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; color: var(--text-muted); font-size: 0.8rem; margin-top: 40px;">
                    No reviews yet. Be the first to share your thoughts on this dish!
                </div>
            `;
        } else {
            // Sort reviews newest first
            [...reviews].reverse().forEach(rev => {
                const card = document.createElement("div");
                card.className = "review-card";
                
                let stars = "";
                for (let i = 1; i <= 5; i++) {
                    stars += i <= rev.rating ? "★" : "☆";
                }
                
                card.innerHTML = `
                    <div class="review-card-header">
                        <span class="review-guest">${rev.guestName}</span>
                        <span class="review-stars">${stars}</span>
                        <span class="review-date">${rev.date}</span>
                    </div>
                    <p class="review-text">${rev.comment}</p>
                `;
                container.appendChild(card);
            });
        }
        
        document.getElementById("review-modal").classList.remove("hidden");
    };

    if (isLocalFileMode()) {
        const dish = localMenuItems.find(d => d.id === dishId);
        const reviews = localMockReviews.filter(r => r.menuItemId === dishId);
        if (dish) populateReviews(dish, reviews);
        return;
    }

    Promise.all([
        fetch("/api/menu").then(res => res.json()),
        fetch(`/api/reviews/${dishId}`).then(res => res.json())
    ]).then(([items, reviews]) => {
        const dish = items.find(d => d.id === dishId);
        if (dish) populateReviews(dish, reviews);
    }).catch(err => {
        const dish = localMenuItems.find(d => d.id === dishId);
        const reviews = localMockReviews.filter(r => r.menuItemId === dishId);
        if (dish) populateReviews(dish, reviews);
    });
}

// Close reviews dialog popup modal
window.closeReviewModal = function() {
    document.getElementById("review-modal").classList.add("hidden");
    document.getElementById("add-review-form").reset();
    
    selectedReviewRating = 5;
    updateStarSelectorUI();
    
    const activeCat = document.querySelector(".menu-cat-btn.active").getAttribute("data-category");
    const vegOnly = document.getElementById("diet-veg").checked;
    const gfOnly = document.getElementById("diet-gf").checked;
    renderMenu(activeCat, vegOnly, gfOnly);
}

// Setup review star select event handlers
function setupReviewStarSelector() {
    const starBtns = document.querySelectorAll(".star-select-btn");
    starBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener("click", () => {
            selectedReviewRating = parseInt(newBtn.getAttribute("data-rating"));
            updateStarSelectorUI();
        });
    });
    updateStarSelectorUI();
}

// Reflect selected stars on UI
function updateStarSelectorUI() {
    const starBtns = document.querySelectorAll(".star-select-btn");
    starBtns.forEach(btn => {
        const rating = parseInt(btn.getAttribute("data-rating"));
        if (rating <= selectedReviewRating) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// Handle new guest review submissions
function handleReviewSubmission(e) {
    e.preventDefault();
    if (!currentReviewMenuItemId) return;
    
    const name = document.getElementById("review-name").value;
    const comment = document.getElementById("review-comment").value;
    
    const today = new Date();
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateStr = today.toLocaleDateString('en-US', options);
    
    const newReview = {
        menuItemId: currentReviewMenuItemId,
        guestName: name,
        rating: selectedReviewRating,
        comment: comment,
        date: dateStr
    };
    
    const runLocalReviewSave = () => {
        newReview.id = Date.now();
        localMockReviews.push(newReview);
        localStorage.setItem("aura_dining_reviews", JSON.stringify(localMockReviews));
        showToast("Review Submitted", "Thank you for rating our dish!", "fa-circle-check");
        openReviewModal(currentReviewMenuItemId);
        document.getElementById("add-review-form").reset();
        selectedReviewRating = 5;
        updateStarSelectorUI();
    };

    if (isLocalFileMode()) {
        runLocalReviewSave();
        return;
    }

    fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview)
    })
    .then(res => {
        if (res.ok) {
            showToast("Review Submitted", "Thank you for rating our dish!", "fa-circle-check");
            openReviewModal(currentReviewMenuItemId);
            document.getElementById("add-review-form").reset();
            selectedReviewRating = 5;
            updateStarSelectorUI();
        } else {
            showToast("Error", "Could not submit review.", "fa-circle-xmark");
        }
    })
    .catch(err => {
        console.warn("Backend offline. Saving review locally.", err);
        runLocalReviewSave();
    });
}
