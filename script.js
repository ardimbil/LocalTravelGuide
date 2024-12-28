document.addEventListener('DOMContentLoaded', function() {
    // Sample event data
    const events = [
        {
            title: 'Summer Music Festival',
            date: 'July 15, 2025',
            location: 'Hyde Park',
            description: 'Three days of live music featuring local and international artists.',
            category: 'Music'
        },
        {
            title: 'Food & Wine Festival',
            date: 'August 5, 2025',
            location: 'Trafalgar Square',
            description: 'Experience the best of London\'s culinary scene.',
            category: 'Food'
        },
        {
            title: 'Art Exhibition',
            date: 'September 20, 2025',
            location: 'Tate Modern',
            description: 'Contemporary art showcase featuring local artists.',
            category: 'Art'
        },
        {
            title: 'London Marathon',
            date: 'October 3, 2025',
            location: 'City of London',
            description: 'Annual running event through the streets of London.',
            category: 'Sports'
        },
        {
            title: 'Tech Conference',
            date: 'September 15, 2025',
            location: 'ExCeL London',
            description: 'Leading technology conference featuring industry experts and innovative showcases.',
            category: 'Technology'
        }
    ];

    function renderEvents(filteredEvents = events) {
        const container = document.getElementById('events-container');
        container.innerHTML = ''; // Clear existing events

        if (filteredEvents.length === 0) {
            container.innerHTML = '<p class="no-events">No events found matching your criteria.</p>';
            return;
        }

        filteredEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.setAttribute('data-title', event.title);
            eventCard.innerHTML = `
                <span class="category-tag">${event.category}</span>
                <h3>${event.title}</h3>
                <p class="event-date">${event.date}</p>
                <p class="event-location">${event.location}</p>
                <p>${event.description}</p>
                <button class="reminder-button" onclick="setReminder('${event.title}')">
                    Set Reminder
                </button>
                <p class="reminder-set">Reminder set!</p>
            `;
            container.appendChild(eventCard);
        });
    }

    // Handle search and filter
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const monthFilter = document.getElementById('filterMonth').value;
        
        const filteredEvents = events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                                event.description.toLowerCase().includes(searchTerm) ||
                                event.location.toLowerCase().includes(searchTerm);
            const matchesMonth = !monthFilter || event.date.includes(monthFilter);
            return matchesSearch && matchesMonth;
        });
        
        renderEvents(filteredEvents);
    });

    document.getElementById('filterMonth').addEventListener('change', (e) => {
        const monthFilter = e.target.value;
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        
        const filteredEvents = events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                                event.description.toLowerCase().includes(searchTerm) ||
                                event.location.toLowerCase().includes(searchTerm);
            const matchesMonth = !monthFilter || event.date.includes(monthFilter);
            return matchesSearch && matchesMonth;
        });
        
        renderEvents(filteredEvents);
    });

    // Function to set reminder (will be called from the onclick event)
    window.setReminder = function(eventTitle) {
        // Check if notifications are supported
        if (!("Notification" in window)) {
            alert("This browser does not support notifications");
            return;
        }

        // Request permission and show notification
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                // Create notification
                const notification = new Notification(`Event Reminder: ${eventTitle}`, {
                    body: "Don't forget about this upcoming event!",
                    icon: "/path/to/icon.png" // Add your icon path here
                });

                // Show success message
                const reminderMsg = document.querySelector(`[data-title="${eventTitle}"] .reminder-set`);
                if (reminderMsg) {
                    reminderMsg.style.display = 'block';
                    
                    // Hide the message after 3 seconds
                    setTimeout(() => {
                        reminderMsg.style.display = 'none';
                    }, 3000);
                }

                // Store in localStorage
                const reminders = JSON.parse(localStorage.getItem('eventReminders') || '[]');
                if (!reminders.includes(eventTitle)) {
                    reminders.push(eventTitle);
                    localStorage.setItem('eventReminders', JSON.stringify(reminders));
                }
            }
        });
    };

    // Hide loading spinner and render initial events
    document.getElementById('loading').style.display = 'none';
    renderEvents();
});
