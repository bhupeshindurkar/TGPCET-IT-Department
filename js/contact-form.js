/* ===================================
   Contact Form Validation
   Developer: Bhupesh Indurkar
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let form submit naturally
            
            // Get form values
            const name = document.querySelector('input[name="name"]').value.trim();
            const email = document.querySelector('input[name="email"]').value.trim();
            const message = document.querySelector('textarea[name="message"]').value.trim();
            
            // Basic validation
            if (name === '' || email === '' || message === '') {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return false;
            }
            
            if (!isValidEmail(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return false;
            }
            
            if (message.length < 10) {
                e.preventDefault();
                alert('Message must be at least 10 characters long.');
                return false;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // For local testing, redirect to thank you page
            // Comment out these lines when using FormSubmit in production
            e.preventDefault();
            setTimeout(() => {
                window.location.href = 'thank-you.html';
            }, 500);
            
            // Form will submit normally in production
            return true;
        });
    }
});

// Validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
