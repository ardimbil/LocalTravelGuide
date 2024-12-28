document.addEventListener('DOMContentLoaded', function() {
    // Sample parks data
    const parks = [
        {
            id: 1,
            name: "Hyde Park",
            description: "One of London's largest parks, featuring the Serpentine lake and various monuments.",
            size: "large",
            features: ["lake", "cafe", "sports"],
            image: "Images/imageofhydepark.jpg",
            location: "Central London",
            openingHours: "5:00 AM - Midnight",
            facilities: ["Toilets", "Cafe", "Boat Hire", "Playground"],
            activities: ["Boating", "Swimming", "Cycling", "Horse Riding"]
        },
        {
            id: 2,
            name: "Regent's Park",
            description: "Beautiful park with Queen Mary's Gardens and the Open Air Theatre.",
            size: "large",
            features: ["playground", "cafe", "sports"],
            image: "Images/imageofregentspark.jpg",
            location: "North West London",
            openingHours: "5:00 AM - 11:00 PM",
            facilities: ["Toilets", "Cafe", "Sports Facilities"],
            activities: ["Tennis", "Football", "Theatre"]
        },
        {
            id: 3,
            name: "St. James's Park",
            description: "The oldest Royal Park in London, home to the Mall and Horse Guards Parade.",
            size: "medium",
            features: ["lake", "cafe"],
            image: "Images/imageofstjamespark.jpg",
            location: "Central London",
            openingHours: "5:00 AM - Midnight",
            facilities: ["Toilets", "Cafe", "Duck Island"],
            activities: ["Bird Watching", "Picnicking"]
        }
        // Add more parks as needed
    ];

    // Render parks
    function renderParks(filteredParks = parks) {
        const container = document.getElementById('parksContainer');
        container.innerHTML = '';

        filteredParks.forEach(park => {
            const parkCard = document.createElement('div');
            parkCard.className = 'park-card';
            parkCard.innerHTML = `
                <img src="${park.image}" alt="${park.name}" class="park-image">
                <div class="park-info">
                    <h3>${park.name}</h3>
                    <p>${park.description}</p>
                    <div class="park-features">
                        ${park.features.map(feature => 
                            `<span class="feature-tag">${feature}</span>`
                        ).join('')}
                    </div>
                    <button onclick="showParkDetails(${park.id})" class="details-button">View Details</button>
                </div>
            `;
            container.appendChild(parkCard);
        });
    }

    // Search and filter functionality
    document.getElementById('parkSearch').addEventListener('input', filterParks);
    document.getElementById('filterSize').addEventListener('change', filterParks);
    document.getElementById('filterFeatures').addEventListener('change', filterParks);

    function filterParks() {
        const searchTerm = document.getElementById('parkSearch').value.toLowerCase();
        const sizeFilter = document.getElementById('filterSize').value;
        const featureFilter = document.getElementById('filterFeatures').value;

        const filteredParks = parks.filter(park => {
            const matchesSearch = park.name.toLowerCase().includes(searchTerm) ||
                                park.description.toLowerCase().includes(searchTerm);
            const matchesSize = !sizeFilter || park.size === sizeFilter;
            const matchesFeature = !featureFilter || park.features.includes(featureFilter);
            
            return matchesSearch && matchesSize && matchesFeature;
        });

        renderParks(filteredParks);
    }

    // Modal functionality
    window.showParkDetails = function(parkId) {
        const park = parks.find(p => p.id === parkId);
        const modal = document.getElementById('parkModal');
        const modalContent = document.getElementById('modalContent');

        modalContent.innerHTML = `
            <h2>${park.name}</h2>
            <img src="${park.image}" alt="${park.name}" style="max-width: 100%; border-radius: 10px;">
            <p><strong>Location:</strong> ${park.location}</p>
            <p><strong>Opening Hours:</strong> ${park.openingHours}</p>
            <h3>Facilities</h3>
            <ul>${park.facilities.map(f => `<li>${f}</li>`).join('')}</ul>
            <h3>Activities</h3>
            <ul>${park.activities.map(a => `<li>${a}</li>`).join('')}</ul>
        `;

        modal.style.display = 'block';
    };

    // Close modal
    document.querySelector('.close-button').addEventListener('click', () => {
        document.getElementById('parkModal').style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('parkModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Weather widget
    function updateWeather() {
        // Simulated weather data - replace with actual API call
        const weather = {
            temperature: '18°C',
            condition: 'Partly Cloudy',
            humidity: '65%'
        };

        document.getElementById('weatherInfo').innerHTML = `
            <p><strong>Temperature:</strong> ${weather.temperature}</p>
            <p><strong>Condition:</strong> ${weather.condition}</p>
            <p><strong>Humidity:</strong> ${weather.humidity}</p>
        `;
    }

    // Initial render
    renderParks();
    updateWeather();
});
