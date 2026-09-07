/* ===================================
   Contact Form Validation
   Developer: Bhupesh Indurkar
   =================================== */

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
