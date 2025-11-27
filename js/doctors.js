// Doctors data with specialties (Tunisian Version)
const doctorsData = [
    // Cardiology
    {
        id: 1,
        name: "Dr. Amina Ben Salah",
        specialty: "Cardiology",
        experience: "15 years",
        rating: 4.9,
        reviews: 324,
        languages: "Arabic, French",
        available: true,
        consultationFee: "150 TND",
        phone: "+216 20 345 678",
        avatar: "AB"
    },
    {
        id: 2,
        name: "Dr. Ahmed Gharsalli",
        specialty: "Cardiology",
        experience: "12 years",
        rating: 4.8,
        reviews: 256,
        languages: "Arabic, French",
        available: true,
        consultationFee: "140 TND",
        phone: "+216 29 112 233",
        avatar: "AG"
    },
    {
        id: 3,
        name: "Dr. Meriem Jlassi",
        specialty: "Cardiology",
        experience: "10 years",
        rating: 4.7,
        reviews: 189,
        languages: "Arabic",
        available: false,
        consultationFee: "135 TND",
        phone: "+216 52 889 440",
        avatar: "MJ"
    },

    // Dermatology
    {
        id: 4,
        name: "Dr. Mohamed Ayedi",
        specialty: "Dermatology",
        experience: "18 years",
        rating: 5.0,
        reviews: 412,
        languages: "Arabic, French",
        available: true,
        consultationFee: "160 TND",
        phone: "+216 50 778 990",
        avatar: "MA"
    },
    {
        id: 5,
        name: "Dr. Salma Ben Youssef",
        specialty: "Dermatology",
        experience: "14 years",
        rating: 4.9,
        reviews: 367,
        languages: "Arabic, English",
        available: true,
        consultationFee: "145 TND",
        phone: "+216 58 443 221",
        avatar: "SB"
    },
    {
        id: 6,
        name: "Dr. Yassine Trabelsi",
        specialty: "Dermatology",
        experience: "9 years",
        rating: 4.6,
        reviews: 198,
        languages: "Arabic",
        available: true,
        consultationFee: "130 TND",
        phone: "+216 25 670 889",
        avatar: "YT"
    },

    // Pediatrics
    {
        id: 7,
        name: "Dr. Rania Khemiri",
        specialty: "Pediatrics",
        experience: "16 years",
        rating: 4.9,
        reviews: 445,
        languages: "Arabic, French",
        available: true,
        consultationFee: "120 TND",
        phone: "+216 23 901 223",
        avatar: "RK"
    },
    {
        id: 8,
        name: "Dr. Sami Gharbi",
        specialty: "Pediatrics",
        experience: "13 years",
        rating: 4.8,
        reviews: 312,
        languages: "Arabic",
        available: true,
        consultationFee: "115 TND",
        phone: "+216 27 502 110",
        avatar: "SG"
    },
    {
        id: 9,
        name: "Dr. Nour Chouchene",
        specialty: "Pediatrics",
        experience: "11 years",
        rating: 4.7,
        reviews: 278,
        languages: "Arabic, French",
        available: false,
        consultationFee: "110 TND",
        phone: "+216 53 908 744",
        avatar: "NC"
    },

    // Neurology
    {
        id: 10,
        name: "Dr. Khaled Ben Amor",
        specialty: "Neurology",
        experience: "20 years",
        rating: 5.0,
        reviews: 389,
        languages: "Arabic, French",
        available: true,
        consultationFee: "180 TND",
        phone: "+216 22 330 551",
        avatar: "KA"
    },
    {
        id: 11,
        name: "Dr. Hiba Marzouk",
        specialty: "Neurology",
        experience: "14 years",
        rating: 4.8,
        reviews: 267,
        languages: "Arabic, Italian",
        available: true,
        consultationFee: "165 TND",
        phone: "+216 28 778 660",
        avatar: "HM"
    },
    {
        id: 12,
        name: "Dr. Mehdi Bouguerra",
        specialty: "Neurology",
        experience: "10 years",
        rating: 4.6,
        reviews: 203,
        languages: "Arabic",
        available: true,
        consultationFee: "155 TND",
        phone: "+216 20 998 112",
        avatar: "MB"
    },

    // Orthopedics
    {
        id: 13,
        name: "Dr. Ines Chikhaoui",
        specialty: "Orthopedics",
        experience: "17 years",
        rating: 4.9,
        reviews: 356,
        languages: "Arabic, French",
        available: true,
        consultationFee: "170 TND",
        phone: "+216 21 443 550",
        avatar: "IC"
    },
    {
        id: 14,
        name: "Dr. Marwen Dabbabi",
        specialty: "Orthopedics",
        experience: "15 years",
        rating: 4.8,
        reviews: 289,
        languages: "Arabic",
        available: true,
        consultationFee: "160 TND",
        phone: "+216 55 234 556",
        avatar: "MD"
    },
    {
        id: 15,
        name: "Dr. Wafa Jemaï",
        specialty: "Orthopedics",
        experience: "12 years",
        rating: 4.7,
        reviews: 234,
        languages: "Arabic, French",
        available: false,
        consultationFee: "150 TND",
        phone: "+216 50 900 772",
        avatar: "WJ"
    },

    // Psychiatry
    {
        id: 16,
        name: "Dr. Houssem Jerbi",
        specialty: "Psychiatry",
        experience: "19 years",
        rating: 5.0,
        reviews: 478,
        languages: "Arabic, French",
        available: true,
        consultationFee: "175 TND",
        phone: "+216 26 781 299",
        avatar: "HJ"
    },
    {
        id: 17,
        name: "Dr. Ons Ghariani",
        specialty: "Psychiatry",
        experience: "13 years",
        rating: 4.9,
        reviews: 392,
        languages: "Arabic",
        available: true,
        consultationFee: "165 TND",
        phone: "+216 24 899 112",
        avatar: "OG"
    },
    {
        id: 18,
        name: "Dr. Wael Hammami",
        specialty: "Psychiatry",
        experience: "10 years",
        rating: 4.7,
        reviews: 256,
        languages: "Arabic, French",
        available: true,
        consultationFee: "155 TND",
        phone: "+216 29 605 443",
        avatar: "WH"
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

document.addEventListener('DOMContentLoaded', function() {
    loadDoctors();
    setupSpecialtyFilters();
    setupSearch();
});

function loadDoctors(filterSpecialty = 'all') {
    const container = document.getElementById('doctorsContainer');
    currentFilter = filterSpecialty;

    container.innerHTML = '<div class="loading-container"><div class="loading-spinner"></div></div>';

    setTimeout(() => {
        let filteredDoctors = filterSpecialty === 'all'
            ? doctorsData
            : doctorsData.filter(doc => doc.specialty.toLowerCase() === filterSpecialty.toLowerCase());

        const groupedDoctors = groupDoctorsBySpecialty(filteredDoctors);

        container.innerHTML = '';

        if (filteredDoctors.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-user-md"></i>
                    <h3>No Doctors Found</h3>
                    <p>Try a different specialty.</p>
                </div>
            `;
            return;
        }

        Object.keys(groupedDoctors).forEach(specialty => {
            const section = createSpecialtySection(specialty, groupedDoctors[specialty]);
            container.appendChild(section);
        });

        animateDoctorCards();
    }, 300);
}

function groupDoctorsBySpecialty(doctors) {
    return doctors.reduce((groups, doctor) => {
        const specialty = doctor.specialty;
        if (!groups[specialty]) groups[specialty] = [];
        groups[specialty].push(doctor);
        return groups;
    }, {});
}

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
                    <span>${doctor.experience}</span>
                </div>
                <div class="doctor-detail-item">
                    <i class="fas fa-language"></i>
                    <span>${doctor.languages}</span>
                </div>
                <div class="doctor-detail-item">
                    <i class="fas fa-phone"></i>
                    <span>${doctor.phone}</span>
                </div>
                <div class="doctor-detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>${doctor.consultationFee}</span>
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

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) starsHTML += '<i class="fas fa-star"></i>';
    if (hasHalfStar) starsHTML += '<i class="fas fa-star-half-alt"></i>';

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) starsHTML += '<i class="far fa-star"></i>';

    return starsHTML;
}

function setupSpecialtyFilters() {
    const buttons = document.querySelectorAll('.specialty-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const specialty = this.getAttribute('data-specialty');

            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            loadDoctors(specialty);

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

            const results = doctorsData.filter(doctor =>
                doctor.name.toLowerCase().includes(query) ||
                doctor.specialty.toLowerCase().includes(query) ||
                doctor.languages.toLowerCase().includes(query)
            );

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

function viewDoctorProfile(doctorId) {
    localStorage.setItem('selected-doctor-id', doctorId);
    window.location.href = 'profil-viewer.html';
}

function bookAppointment(doctorId) {
    const doctor = doctorsData.find(d => d.id === doctorId);

    if (!doctor.available) {
        alert('This doctor is currently unavailable.');
        return;
    }

    const isLoggedIn = localStorage.getItem('healify-user-token');

    if (!isLoggedIn) {
        if (confirm('You need to login to book an appointment. Continue?')) {
            localStorage.setItem('redirect-after-login', 'reservation.html');
            localStorage.setItem('selected-doctor-id', doctorId);
            window.location.href = 'login.html';
        }
        return;
    }

    localStorage.setItem('selected-doctor-id', doctorId);
    window.location.href = 'reservation.html';
}

function scrollToDoctor(doctorId) {
    const doctor = doctorsData.find(d => d.id === doctorId);
    if (!doctor) return;

    const specialty = doctor.specialty.toLowerCase();
    const specialtyBtn = document.querySelector(`[data-specialty="${specialty}"]`);

    if (specialtyBtn) {
        specialtyBtn.click();

        setTimeout(() => {
            const doctorCard = document.querySelector(`[data-doctor-id="${doctorId}"]`);
            if (doctorCard) {
                doctorCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                doctorCard.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.4)';
                setTimeout(() => {
                    doctorCard.style.boxShadow = '';
                }, 2000);
            }

            if (typeof closeSearchBar === 'function') {
                closeSearchBar();
            }
        }, 500);
    }
}

window.viewDoctorProfile = viewDoctorProfile;
window.bookAppointment = bookAppointment;
window.scrollToDoctor = scrollToDoctor;
