document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    // Form validation and submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            submitForm();
        }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    // Form validation function
    function validateForm() {
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        } else if (name.value.length < 2) {
            showError(name, 'Name must be at least 2 characters');
            isValid = false;
        } else {
            removeError(name);
        }

        // Email validation
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError(email);
        }

        // Subject validation
        const subject = document.getElementById('subject');
        if (!subject.value) {
            showError(subject, 'Please select a subject');
            isValid = false;
        } else {
            removeError(subject);
        }

        // Message validation
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message.value.length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        } else {
            removeError(message);
        }

        return isValid;
    }

    // Validate individual field
    function validateField(field) {
        if (field.required && !field.value.trim()) {
            showError(field, `${field.name} is required`);
        } else {
            removeError(field);
        }
    }

    // Show error message
    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        
        let errorMessage = formGroup.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
    }

    // Remove error message
    function removeError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Form submission
    function submitForm() {
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Disable submit button during submission
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Simulate API call
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            
            contactForm.insertBefore(successMessage, contactForm.firstChild);

            // Reset form
            contactForm.reset();

            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
    }

    // Initialize Google Maps (if needed)
    // Note: You'll need to add your Google Maps API key
    function initMap() {
        const mapOptions = {
            center: { lat: 51.5074, lng: -0.1278 }, // London coordinates
            zoom: 13
        };
        
        const map = new google.maps.Map(
            document.querySelector('.map-container iframe'),
            mapOptions
        );
    }
});
