document.addEventListener('DOMContentLoaded', function() {
    // Sample restaurants data
    const restaurants = [
        {
            id: 1,
            name: "The Crown & Sceptre",
            description: "Traditional British pub serving classic dishes and local ales.",
            cuisine: "British",
            price: "budget",
            rating: 4.5,
            image: "Images/imageofthecrownandsceptre.jpg",
            location: "Holland Park",
            hours: "12:00 PM - 11:00 PM",
            features: ["Outdoor Seating", "Sunday Roast", "Live Sports"],
            menu: ["Fish & Chips", "Shepherd's Pie", "Sunday Roast"]
        },
        {
            id: 2,
            name: "Bella Italia",
            description: "Authentic Italian restaurant with homemade pasta and wood-fired pizzas.",
            cuisine: "Italian",
            price: "moderate",
            rating: 4.9,
            image: "Images/imageofbellaitalia.jpeg",
            location: "Covent Garden",
            hours: "11:30 AM - 10:30 PM",
            features: ["Wine Bar", "Vegetarian Options", "Al Fresco Dining"],
            menu: ["Margherita Pizza", "Spaghetti Carbonara", "Tiramisu"]
        },
        {
            id: 3,
            name: "Taj Mahal",
            description: "Fine Indian dining with traditional curries and modern fusion dishes.",
            cuisine: "Indian",
            price: "expensive",
            rating: 4.8,
            image: "Images/imageoftajmahal.jpg",
            location: "Mayfair",
            hours: "5:00 PM - 11:00 PM",
            features: ["Fine Dining", "Wine Pairing", "Private Dining"],
            menu: ["Butter Chicken", "Biryani", "Naan Bread"]
        }
        // Add more restaurants as needed
    ];

    // Render restaurants
    function renderRestaurants(filteredRestaurants = restaurants) {
        const container = document.getElementById('restaurantsContainer');
        container.innerHTML = '';

        filteredRestaurants.forEach(restaurant => {
            const restaurantCard = document.createElement('div');
            restaurantCard.className = 'restaurant-card';
            restaurantCard.innerHTML = `
                <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
                <div class="restaurant-info">
                    <h3>${restaurant.name}</h3>
                    <span class="cuisine-tag">${restaurant.cuisine}</span>
                    <p>${restaurant.description}</p>
                    <div class="price-rating">
                        <span>Price: ${getPriceSymbol(restaurant.price)}</span>
                        <span>Rating: ${getStars(restaurant.rating)}</span>
                    </div>
                    <button onclick="showRestaurantDetails(${restaurant.id})" class="details-button">View Details</button>
                </div>
            `;
            container.appendChild(restaurantCard);
        });
    }

    // Helper functions
    function getPriceSymbol(price) {
        switch(price) {
            case 'budget': return '£';
            case 'moderate': return '££';
            case 'expensive': return '£££';
            default: return '££';
        }
    }

    function getStars(rating) {
        return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    }

    // Search and filter functionality
    document.getElementById('restaurantSearch').addEventListener('input', filterRestaurants);
    document.getElementById('filterCuisine').addEventListener('change', filterRestaurants);
    document.getElementById('filterPrice').addEventListener('change', filterRestaurants);
    document.getElementById('filterRating').addEventListener('change', filterRestaurants);

    function filterRestaurants() {
        const searchTerm = document.getElementById('restaurantSearch').value.toLowerCase();
        const cuisineFilter = document.getElementById('filterCuisine').value;
        const priceFilter = document.getElementById('filterPrice').value;
        const ratingFilter = parseFloat(document.getElementById('filterRating').value) || 0;

        const filteredRestaurants = restaurants.filter(restaurant => {
            const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm) ||
                                restaurant.description.toLowerCase().includes(searchTerm);
            const matchesCuisine = !cuisineFilter || restaurant.cuisine === cuisineFilter;
            const matchesPrice = !priceFilter || restaurant.price === priceFilter;
            const matchesRating = restaurant.rating >= ratingFilter;
            
            return matchesSearch && matchesCuisine && matchesPrice && matchesRating;
        });

        renderRestaurants(filteredRestaurants);
    }

    // Modal functionality
    window.showRestaurantDetails = function(restaurantId) {
        const restaurant = restaurants.find(r => r.id === restaurantId);
        const modal = document.getElementById('restaurantModal');
        const modalContent = document.getElementById('modalContent');

        modalContent.innerHTML = `
            <h2>${restaurant.name}</h2>
            <img src="${restaurant.image}" alt="${restaurant.name}" style="max-width: 100%; border-radius: 10px;">
            <p><strong>Location:</strong> ${restaurant.location}</p>
            <p><strong>Hours:</strong> ${restaurant.hours}</p>
            <p><strong>Cuisine:</strong> ${restaurant.cuisine}</p>
            <p><strong>Price Range:</strong> ${getPriceSymbol(restaurant.price)}</p>
            <p><strong>Rating:</strong> ${getStars(restaurant.rating)}</p>
            <h3>Features</h3>
            <ul>${restaurant.features.map(f => `<li>${f}</li>`).join('')}</ul>
            <h3>Popular Menu Items</h3>
            <ul>${restaurant.menu.map(item => `<li>${item}</li>`).join('')}</ul>
        `;

        modal.style.display = 'block';
    };

    // Close modal
    document.querySelector('.close-button').addEventListener('click', () => {
        document.getElementById('restaurantModal').style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('restaurantModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initial render
    renderRestaurants();
});
