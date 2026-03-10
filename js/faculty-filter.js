/* ===================================
   Faculty Filter & Search
   Developer: Bhupesh Indurkar
   =================================== */

// Faculty search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('facultySearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const facultyCards = document.querySelectorAll('.faculty-card');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            facultyCards.forEach(card => {
                const name = card.querySelector('.faculty-name')?.textContent.toLowerCase() || '';
                const qualification = card.querySelector('.faculty-qualification')?.textContent.toLowerCase() || '';
                const specialization = card.querySelector('.faculty-specialization')?.textContent.toLowerCase() || '';
                
                if (name.includes(searchTerm) || 
                    qualification.includes(searchTerm) || 
                    specialization.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.classList.add('fade-in-up');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            facultyCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.classList.add('fade-in-up');
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.classList.add('fade-in-up');
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Sort functionality
    const sortSelect = document.getElementById('facultySort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const container = document.querySelector('.faculty-grid');
            const cards = Array.from(facultyCards);
            
            cards.sort((a, b) => {
                if (sortValue === 'name') {
                    const nameA = a.querySelector('.faculty-name').textContent;
                    const nameB = b.querySelector('.faculty-name').textContent;
                    return nameA.localeCompare(nameB);
                } else if (sortValue === 'experience') {
                    const expA = parseInt(a.getAttribute('data-experience')) || 0;
                    const expB = parseInt(b.getAttribute('data-experience')) || 0;
                    return expB - expA;
                }
            });
            
            cards.forEach(card => container.appendChild(card));
        });
    }
});

// Faculty card hover effect
document.querySelectorAll('.faculty-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
