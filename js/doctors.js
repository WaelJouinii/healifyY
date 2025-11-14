// Doctors data with specialties
const doctorsData = [
    // Cardiology
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        experience: "15 years",
        rating: 4.9,
        reviews: 324,
        languages: "English, Spanish",
        available: true,
        consultationFee: "$150",
        avatar: "SJ"
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Cardiology",
        experience: "12 years",
        rating: 4.8,
        reviews: 256,
        languages: "English, Mandarin",
        available: true,
        consultationFee: "$140",
        avatar: "MC"
    },
    {
        id: 3,
        name: "Dr. Emily Roberts",
        specialty: "Cardiology",
        experience: "10 years",
        rating: 4.7,
        reviews: 189,
        languages: "English",
        available: false,
        consultationFee: "$135",
        avatar: "ER"
    },
    
    // Dermatology
    {
        id: 4,
        name: "Dr. James Wilson",
        specialty: "Dermatology",
        experience: "18 years",
        rating: 5.0,
        reviews: 412,
        languages: "English, French",
        available: true,
        consultationFee: "$160",
        avatar: "JW"
    },
    {
        id: 5,
        name: "Dr. Lisa Anderson",
        specialty: "Dermatology",
        experience: "14 years",
        rating: 4.9,
        reviews: 367,
        languages: "English, German",
        available: true,
        consultationFee: "$145",
        avatar: "LA"
    },
    {
        id: 6,
        name: "Dr. David Kim",
        specialty: "Dermatology",
        experience: "9 years",
        rating: 4.6,
        reviews: 198,
        languages: "English, Korean",
        available: true,
        consultationFee: "$130",
        avatar: "DK"
    },
    
    // Pediatrics
    {
        id: 7,
        name: "Dr. Maria Garcia",
        specialty: "Pediatrics",
        experience: "16 years",
        rating: 4.9,
        reviews: 445,
        languages: "English, Spanish",
        available: true,
        consultationFee: "$120",
        avatar: "MG"
    },
    {
        id: 8,
        name: "Dr. Robert Taylor",
        specialty: "Pediatrics",
        experience: "13 years",
        rating: 4.8,
        reviews: 312,
        languages: "English",
        available: true,
        consultationFee: "$115",
        avatar: "RT"
    },
    {
        id: 9,
        name: "Dr. Jennifer Lee",
        specialty: "Pediatrics",
        experience: "11 years",
        rating: 4.7,
        reviews: 278,
        languages: "English, Mandarin",
        available: false,
        consultationFee: "$110",
        avatar: "JL"
    },
    
    // Neurology
    {
        id: 10,
        name: "Dr. William Brown",
        specialty: "Neurology",
        experience: "20 years",
        rating: 5.0,
        reviews: 389,
        languages: "English",
        available: true,
        consultationFee: "$180",
        avatar: "WB"
    },
    {
        id: 11,
        name: "Dr. Amanda White",
        specialty: "Neurology",
        experience: "14 years",
        rating: 4.8,
        reviews: 267,
        languages: "English, Italian",
        available: true,
        consultationFee: "$165",
        avatar: "AW"
    },
    {
        id: 12,
        name: "Dr. Christopher Davis",
        specialty: "Neurology",
        experience: "10 years",
        rating: 4.6,
        reviews: 203,
        languages: "English",
        available: true,
        consultationFee: "$155",
        avatar: "CD"
    },
    
    // Orthopedics
    {
        id: 13,
        name: "Dr. Patricia Martinez",
        specialty: "Orthopedics",
        experience: "17 years",
        rating: 4.9,
        reviews: 356,
        languages: "English, Spanish",
        available: true,
        consultationFee: "$170",
        avatar: "PM"
    },
    {
        id: 14,
        name: "Dr. Thomas Miller",
        specialty: "Orthopedics",
        experience: "15 years",
        rating: 4.8,
        reviews: 289,
        languages: "English",
        available: true,
        consultationFee: "$160",
        avatar: "TM"
    },
    {
        id: 15,
        name: "Dr. Karen Thompson",
        specialty: "Orthopedics",
        experience: "12 years",
        rating: 4.7,
        reviews: 234,
        languages: "English, Portuguese",
        available: false,
        consultationFee: "$150",
        avatar: "KT"
    },
    
    // Psychiatry
    {
        id: 16,
        name: "Dr. Daniel Rodriguez",
        specialty: "Psychiatry",
        experience: "19 years",
        rating: 5.0,
        reviews: 478,
        languages: "English, Spanish",
        available: true,
        consultationFee: "$175",
        avatar: "DR"
    },
    {
        id: 17,
        name: "Dr. Michelle Harris",
        specialty: "Psychiatry",
        experience: "13 years",
        rating: 4.9,
        reviews: 392,
        languages: "English",
        available: true,
        consultationFee: "$165",
        avatar: "MH"
    },
    {
        id: 18,
        name: "Dr. Kevin Clark",
        specialty: "Psychiatry",
        experience: "10 years",
        rating: 4.7,
        reviews: 256,
        languages: "English, French",
        available: true,
        consultationFee: "$155",
        avatar: "KC"
    }
];

// Specialty icons mapping
const specialtyIcons = {
    'Cardiology': 'fa-heartbeat',
    'Dermatology': 'fa-hand-sparkles',
    'Pediatrics': 'fa-baby',
    'Neurology': 'fa-brain',
    'Orthopedics': 'fa-bone',
    'Psychiatry': 'fa-user-md'
};

// Current filter
let currentFilter = 'all';

// Initialize doctors page
document.addEventListener('DOMContentLoaded', function() {
    loadDoctors();
    setupSpecialtyFilters();
    setupSearch();
});

// Load and display doctors
function loadDoctors(filterSpecialty = 'all') {
    const container = document.getElementById('doctorsContainer');
    currentFilter = filterSpecialty;
    
    // Show loading state
    container.innerHTML = '<div class="loading-container"><div class="loading-spinner"></div></div>';
    
    // Simulate loading delay for smooth transition
    setTimeout(() => {
        // Filter doctors
        let filteredDoctors = filterSpecialty === 'all' 
            ? doctorsData 
            : doctorsData.filter(doc => doc.specialty.toLowerCase() === filterSpecialty.toLowerCase());
        
        // Group by specialty
        const groupedDoctors = groupDoctorsBySpecialty(filteredDoctors);
        
        // Clear container
        container.innerHTML = '';
        
        // Check if no results
        if (filteredDoctors.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-user-md"></i>
                    <h3>No Doctors Found</h3>
                    <p>We couldn't find any doctors matching your criteria. Please try a different specialty.</p>
                </div>
            `;
            return;
        }
        
        // Render grouped doctors
        Object.keys(groupedDoctors).forEach(specialty => {
            const section = createSpecialtySection(specialty, groupedDoctors[specialty]);
            container.appendChild(section);
        });
        
        // Add smooth scroll animations
        animateDoctorCards();
    }, 300);
}

// Group doctors by specialty
function groupDoctorsBySpecialty(doctors) {
    return doctors.reduce((groups, doctor) => {
        const specialty = doctor.specialty;
        if (!groups[specialty]) {
            groups[specialty] = [];
        }
        groups[specialty].push(doctor);
        return groups;
    }, {});
}

// Create specialty section
function createSpecialtySection(specialty, doctors) {
    const section = document.createElement('div');
    section.className = 'specialty-section';
    section.id = `specialty-${specialty.toLowerCase().replace(/\s+/g, '-')}`;
    
    const icon = specialtyIcons[specialty] || 'fa-stethoscope';
    const doctorCount = doctors.length;
    
    section.innerHTML = `
        <div class="specialty-header">
            <div class="specialty-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="specialty-info">
                <h2>${specialty}</h2>
                <p>${doctorCount} doctor${doctorCount > 1 ? 's' : ''} available</p>
            </div>
        </div>
        <div class="doctors-grid" id="grid-${specialty.toLowerCase()}">
            ${doctors.map(doctor => createDoctorCard(doctor)).join('')}
        </div>
    `;
    
    return section;
}

// Create doctor card
function createDoctorCard(doctor) {
    const stars = generateStars(doctor.rating);
    const statusClass = doctor.available ? '' : 'offline';
    
    return `
        <div class="doctor-card" data-doctor-id="${doctor.id}">
            <div class="doctor-card-header">
                <div class="doctor-avatar">
                    ${doctor.avatar}
                    <div class="doctor-status ${statusClass}"></div>
                </div>
                <div class="doctor-info">
                    <h3 class="doctor-name">${doctor.name}</h3>
                    <div class="doctor-specialty">
                        <i class="fas fa-stethoscope"></i>
                        ${doctor.specialty}
                    </div>
                </div>
            </div>
            
            <div class="doctor-details">
                <div class="doctor-detail-item">
                    <i class="fas fa-briefcase"></i>
                    <span>${doctor.experience} of experience</span>
                </div>
                <div class="doctor-detail-item">
                    <i class="fas fa-language"></i>
                    <span>${doctor.languages}</span>
                </div>
                <div class="doctor-detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>${doctor.consultationFee} consultation fee</span>
                </div>
            </div>
            
            <div class="doctor-rating">
                <div class="stars">${stars}</div>
                <span class="rating-value">${doctor.rating}</span>
                <span class="rating-count">(${doctor.reviews} reviews)</span>
            </div>
            
            <div class="doctor-actions">
                <button class="btn-view-profile" onclick="viewDoctorProfile(${doctor.id})">
                    <i class="fas fa-eye"></i>
                    View Profile
                </button>
                <button class="btn-book" onclick="bookAppointment(${doctor.id})" ${!doctor.available ? 'disabled' : ''}>
                    <i class="fas fa-calendar-check"></i>
                    Book
                </button>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Setup specialty filter buttons
function setupSpecialtyFilters() {
    const buttons = document.querySelectorAll('.specialty-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const specialty = this.getAttribute('data-specialty');
            
            // Update active state
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Load doctors with filter
            loadDoctors(specialty);
            
            // Smooth scroll to doctors container
            setTimeout(() => {
                const doctorsContainer = document.getElementById('doctorsContainer');
                const headerOffset = 150;
                const elementPosition = doctorsContainer.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        });
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            // Search doctors
            const results = doctorsData.filter(doctor => 
                doctor.name.toLowerCase().includes(query) ||
                doctor.specialty.toLowerCase().includes(query) ||
                doctor.languages.toLowerCase().includes(query)
            );
            
            // Display results
            if (results.length > 0) {
                searchResults.innerHTML = results.slice(0, 5).map(doctor => `
                    <div class="search-result-item" onclick="scrollToDoctor(${doctor.id})">
                        <i class="fas fa-user-md"></i>
                        <div>
                            <strong>${doctor.name}</strong> - ${doctor.specialty}
                        </div>
                    </div>
                `).join('');
            } else {
                searchResults.innerHTML = `
                    <div class="search-result-item">
                        <i class="fas fa-search"></i>
                        <div>No doctors found</div>
                    </div>
                `;
            }
        });
    }
}

// Animate doctor cards on scroll
function animateDoctorCards() {
    const cards = document.querySelectorAll('.doctor-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// View doctor profile
function viewDoctorProfile(doctorId) {
    // Store doctor ID and redirect to profile viewer
    localStorage.setItem('selected-doctor-id', doctorId);
    window.location.href = 'profil-viewer.html';
}

// Book appointment
function bookAppointment(doctorId) {
    const doctor = doctorsData.find(d => d.id === doctorId);
    
    if (!doctor.available) {
        alert('This doctor is currently unavailable. Please try another doctor or check back later.');
        return;
    }
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('healify-user-token');
    
    if (!isLoggedIn) {
        if (confirm('You need to login to book an appointment. Would you like to login now?')) {
            localStorage.setItem('redirect-after-login', 'reservation.html');
            localStorage.setItem('selected-doctor-id', doctorId);
            window.location.href = 'login.html';
        }
        return;
    }
    
    // Store doctor ID and redirect to reservation page
    localStorage.setItem('selected-doctor-id', doctorId);
    window.location.href = 'reservation.html';
}

// Scroll to specific doctor
function scrollToDoctor(doctorId) {
    const doctor = doctorsData.find(d => d.id === doctorId);
    if (!doctor) return;
    
    // Filter by specialty first
    const specialty = doctor.specialty.toLowerCase();
    const specialtyBtn = document.querySelector(`[data-specialty="${specialty}"]`);
    
    if (specialtyBtn) {
        specialtyBtn.click();
        
        // Wait for doctors to load, then scroll to specific card
        setTimeout(() => {
            const doctorCard = document.querySelector(`[data-doctor-id="${doctorId}"]`);
            if (doctorCard) {
                doctorCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Highlight the card briefly
                doctorCard.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.4)';
                setTimeout(() => {
                    doctorCard.style.boxShadow = '';
                }, 2000);
            }
            
            // Close search bar
            if (typeof closeSearchBar === 'function') {
                closeSearchBar();
            }
        }, 500);
    }
}

// Export functions for global use
window.viewDoctorProfile = viewDoctorProfile;
window.bookAppointment = bookAppointment;
window.scrollToDoctor = scrollToDoctor;
