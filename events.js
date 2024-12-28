document.addEventListener('DOMContentLoaded', function() {
    // Sample events data
    const events = [
        {
            id: 1,
            title: "London Music Festival",
            date: "April 15, 2025",
            time: "12:00 PM - 11:00 PM",
            location: "Hyde Park",
            description: "A three-day celebration of music featuring top artists from around the world.",
            category: "Music",
            price: "paid",
            ticketPrice: "£75",
            image: "Images/imageoflondonmusicfestival.jpg",
            features: ["Multiple Stages", "Food Vendors", "VIP Areas"],
            lineup: ["Artist 1", "Artist 2", "Artist 3"]
        },
        {
            id: 2,
            title: "Modern Art Exhibition",
            date: "April 20, 2025",
            time: "10:00 AM - 6:00 PM",
            location: "Tate Modern",
            description: "Contemporary art exhibition showcasing works from emerging artists.",
            category: "Arts",
            price: "free",
            ticketPrice: "Free",
            image: "Images/imageofmodernartexhibition1.jpg",
            features: ["Guided Tours", "Artist Talks", "Workshop Sessions"]
        },
        {
            id: 3,
            title: "London Food Festival",
            date: "May 1, 2025",
            time: "11:00 AM - 8:00 PM",
            location: "Southbank Centre",
            description: "Celebrate London's diverse culinary scene with food from around the world.",
            category: "Food",
            price: "paid",
            ticketPrice: "£25",
            image: "Images/imageoffoodfestival1.webp",
            features: ["Live Cooking Demos", "Wine Tasting", "Street Food"]
        }
    ];

    // Render events
    function renderEvents(filteredEvents = events) {
        const container = document.getElementById('eventsContainer');
        container.innerHTML = '';

        if (filteredEvents.length === 0) {
            container.innerHTML = '<div class="no-events">No events found matching your criteria</div>';
            return;
        }

        filteredEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-info">
                    <span class="category-tag">${event.category}</span>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-date">${event.date}</p>
                    <p class="event-location">${event.location}</p>
                    <p class="event-price">Price: ${event.ticketPrice}</p>
                    <button onclick="showEventDetails(${event.id})" class="details-button">View Details</button>
                </div>
            `;
            container.appendChild(eventCard);
        });
    }

    // Search and filter functionality
    document.getElementById('eventSearch').addEventListener('input', filterEvents);
    document.getElementById('filterCategory').addEventListener('change', filterEvents);
    document.getElementById('filterMonth').addEventListener('change', filterEvents);
    document.getElementById('filterPrice').addEventListener('change', filterEvents);

    function filterEvents() {
        const searchTerm = document.getElementById('eventSearch').value.toLowerCase();
        const categoryFilter = document.getElementById('filterCategory').value;
        const monthFilter = document.getElementById('filterMonth').value;
        const priceFilter = document.getElementById('filterPrice').value;

        const filteredEvents = events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                                event.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryFilter || event.category === categoryFilter;
            const matchesMonth = !monthFilter || event.date.includes(monthFilter);
            const matchesPrice = !priceFilter || event.price === priceFilter;
            
            return matchesSearch && matchesCategory && matchesMonth && matchesPrice;
        });

        renderEvents(filteredEvents);
    }

    // Modal functionality
    window.showEventDetails = function(eventId) {
        const event = events.find(e => e.id === eventId);
        const modal = document.getElementById('eventModal');
        const modalContent = document.getElementById('modalContent');

        modalContent.innerHTML = `
            <h2>${event.title}</h2>
            <img src="${event.image}" alt="${event.title}" style="max-width: 100%; border-radius: 10px;">
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Category:</strong> ${event.category}</p>
            <p><strong>Price:</strong> ${event.ticketPrice}</p>
            <p>${event.description}</p>
            <h3>Features</h3>
            <ul>${event.features.map(f => `<li>${f}</li>`).join('')}</ul>
            ${event.lineup ? `
                <h3>Lineup</h3>
                <ul>${event.lineup.map(artist => `<li>${artist}</li>`).join('')}</ul>
            ` : ''}
        `;

        modal.style.display = 'block';
    };

    // Close modal
    document.querySelector('.close-button').addEventListener('click', () => {
        document.getElementById('eventModal').style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('eventModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Newsletter form submission
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        this.reset();
    });

    // Initial render
    renderEvents();
});