// Booking functionality for Healify reservation page

// Sample doctors data (you can also import from doctors.js if needed)
const availableDoctors = [
    {
        id: 1,
        name: 'Dr. Emily Johnson',
        specialty: 'Cardiology',
        rating: 4.9,
        experience: 15,
        avatar: 'EJ',
        price: 150
    },
    {
        id: 2,
        name: 'Dr. Michael Chen',
        specialty: 'Dermatology',
        rating: 4.8,
        experience: 12,
        avatar: 'MC',
        price: 120
    },
    {
        id: 3,
        name: 'Dr. Sarah Williams',
        specialty: 'Pediatrics',
        rating: 4.9,
        experience: 18,
        avatar: 'SW',
        price: 130
    },
    {
        id: 4,
        name: 'Dr. David Martinez',
        specialty: 'Neurology',
        rating: 4.7,
        experience: 20,
        avatar: 'DM',
        price: 180
    },
    {
        id: 5,
        name: 'Dr. Jennifer Brown',
        specialty: 'Orthopedics',
        rating: 4.8,
        experience: 14,
        avatar: 'JB',
        price: 140
    },
    {
        id: 6,
        name: 'Dr. Robert Taylor',
        specialty: 'Psychiatry',
        rating: 4.9,
        experience: 16,
        avatar: 'RT',
        price: 160
    }
];

// Booking state
let bookingState = {
    currentStep: 1,
    selectedDoctor: null,
    selectedDate: null,
    selectedTime: null,
    patientDetails: null,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear()
};

// Time slots
const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM'
];

// Initialize booking page
document.addEventListener('DOMContentLoaded', function() {
    initializeBooking();
});

function initializeBooking() {
    loadDoctors();
    initializeCalendar();
    generateTimeSlots();
    setupNavigation();
    setupFormValidation();
}

// Load doctors into selection
function loadDoctors() {
    const doctorSelection = document.getElementById('doctorSelection');
    if (!doctorSelection) return;

    doctorSelection.innerHTML = availableDoctors.map(doctor => `
        <div class="doctor-option" data-doctor-id="${doctor.id}" onclick="selectDoctor(${doctor.id})">
            <div class="doctor-avatar">${doctor.avatar}</div>
            <div class="doctor-details">
                <div class="doctor-name">${doctor.name}</div>
                <div class="doctor-specialty">${doctor.specialty}</div>
                <div class="doctor-info-row">
                    <span><i class="fas fa-star"></i> ${doctor.rating}</span>
                    <span><i class="fas fa-briefcase"></i> ${doctor.experience} years</span>
                    <span><i class="fas fa-dollar-sign"></i> ${doctor.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Select doctor
function selectDoctor(doctorId) {
    // Remove previous selection
    document.querySelectorAll('.doctor-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Add selection to clicked doctor
    const selectedOption = document.querySelector(`[data-doctor-id="${doctorId}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }

    // Update booking state
    const doctor = availableDoctors.find(d => d.id === doctorId);
    bookingState.selectedDoctor = doctor;

    // Update summary
    updateSummary();

    // Enable next button
    const nextBtn = document.getElementById('btnNext');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

// Initialize calendar
function initializeCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;

    // Add day labels
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayLabelsHTML = dayLabels.map(day => `<div class="calendar-day-label">${day}</div>`).join('');
    
    renderCalendar();
    updateMonthDisplay();

    // Month navigation
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            bookingState.currentMonth--;
            if (bookingState.currentMonth < 0) {
                bookingState.currentMonth = 11;
                bookingState.currentYear--;
            }
            renderCalendar();
            updateMonthDisplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            bookingState.currentMonth++;
            if (bookingState.currentMonth > 11) {
                bookingState.currentMonth = 0;
                bookingState.currentYear++;
            }
            renderCalendar();
            updateMonthDisplay();
        });
    }
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;

    const firstDay = new Date(bookingState.currentYear, bookingState.currentMonth, 1).getDay();
    const daysInMonth = new Date(bookingState.currentYear, bookingState.currentMonth + 1, 0).getDate();
    const today = new Date();
    
    // Clear calendar
    calendarGrid.innerHTML = '';

    // Add day labels
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayLabels.forEach(day => {
        const label = document.createElement('div');
        label.className = 'calendar-day-label';
        label.textContent = day;
        calendarGrid.appendChild(label);
    });

    // Add empty cells for days before first day
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        calendarGrid.appendChild(emptyDay);
    }

    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(bookingState.currentYear, bookingState.currentMonth, day);
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        // Disable past dates
        if (date < today.setHours(0, 0, 0, 0)) {
            dayElement.classList.add('disabled');
        } else {
            // Check if it's today
            if (date.toDateString() === new Date().toDateString()) {
                dayElement.classList.add('today');
            }

            // Add click handler
            dayElement.addEventListener('click', () => selectDate(date));
        }

        calendarGrid.appendChild(dayElement);
    }
}

function updateMonthDisplay() {
    const monthDisplay = document.getElementById('currentMonth');
    if (!monthDisplay) return;

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    monthDisplay.textContent = `${monthNames[bookingState.currentMonth]} ${bookingState.currentYear}`;
}

function selectDate(date) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });

    // Add selection to clicked date
    event.target.classList.add('selected');

    // Update booking state
    bookingState.selectedDate = date;

    // Update summary
    updateSummary();

    // Check if both date and time are selected
    checkStep2Complete();
}

// Generate time slots
function generateTimeSlots() {
    const timeSlotsGrid = document.getElementById('timeSlotsGrid');
    if (!timeSlotsGrid) return;

    timeSlotsGrid.innerHTML = timeSlots.map(time => `
        <div class="time-slot" onclick="selectTime('${time}')">${time}</div>
    `).join('');
}

function selectTime(time) {
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });

    // Add selection to clicked time
    event.target.classList.add('selected');

    // Update booking state
    bookingState.selectedTime = time;

    // Update summary
    updateSummary();

    // Check if both date and time are selected
    checkStep2Complete();
}

function checkStep2Complete() {
    const nextBtn = document.getElementById('btnNext');
    if (!nextBtn) return;

    if (bookingState.selectedDate && bookingState.selectedTime) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}

// Update summary
function updateSummary() {
    // Update doctor info
    if (bookingState.selectedDoctor) {
        document.getElementById('summaryDoctor').innerHTML = bookingState.selectedDoctor.name;
        document.getElementById('summarySpecialty').innerHTML = bookingState.selectedDoctor.specialty;
        document.getElementById('summaryPrice').innerHTML = `$${bookingState.selectedDoctor.price}`;
    }

    // Update date
    if (bookingState.selectedDate) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('summaryDate').innerHTML = bookingState.selectedDate.toLocaleDateString('en-US', options);
    }

    // Update time
    if (bookingState.selectedTime) {
        document.getElementById('summaryTime').innerHTML = bookingState.selectedTime;
    }
}

// Setup navigation
function setupNavigation() {
    const btnNext = document.getElementById('btnNext');
    const btnBack = document.getElementById('btnBack');

    if (btnNext) {
        btnNext.addEventListener('click', handleNext);
        btnNext.disabled = true;
    }

    if (btnBack) {
        btnBack.addEventListener('click', handleBack);
    }
}

function handleNext() {
    if (bookingState.currentStep < 3) {
        // Validate current step
        if (!validateStep(bookingState.currentStep)) {
            return;
        }

        bookingState.currentStep++;
        updateStepDisplay();
    } else {
        // Final step - submit booking
        submitBooking();
    }
}

function handleBack() {
    if (bookingState.currentStep > 1) {
        bookingState.currentStep--;
        updateStepDisplay();
    }
}

function validateStep(step) {
    if (step === 1) {
        if (!bookingState.selectedDoctor) {
            alert('Please select a doctor');
            return false;
        }
    } else if (step === 2) {
        if (!bookingState.selectedDate || !bookingState.selectedTime) {
            alert('Please select both date and time');
            return false;
        }
    } else if (step === 3) {
        const form = document.getElementById('patientForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }
    }
    return true;
}

function updateStepDisplay() {
    // Update step indicators
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        
        if (stepNum < bookingState.currentStep) {
            step.classList.add('completed');
        } else if (stepNum === bookingState.currentStep) {
            step.classList.add('active');
        }
    });

    // Update form content visibility
    document.querySelectorAll('.form-content').forEach((content, index) => {
        content.classList.remove('active');
        if (index + 1 === bookingState.currentStep) {
            content.classList.add('active');
        }
    });

    // Update navigation buttons
    const btnBack = document.getElementById('btnBack');
    const btnNext = document.getElementById('btnNext');

    if (btnBack) {
        btnBack.style.display = bookingState.currentStep > 1 ? 'flex' : 'none';
    }

    if (btnNext) {
        if (bookingState.currentStep === 3) {
            btnNext.innerHTML = 'Confirm Booking <i class="fas fa-check"></i>';
        } else {
            btnNext.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }

        // Enable/disable based on step
        if (bookingState.currentStep === 1) {
            btnNext.disabled = !bookingState.selectedDoctor;
        } else if (bookingState.currentStep === 2) {
            btnNext.disabled = !bookingState.selectedDate || !bookingState.selectedTime;
        } else {
            btnNext.disabled = false;
        }
    }
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('patientForm');
    if (!form) return;

    form.addEventListener('input', function() {
        const nextBtn = document.getElementById('btnNext');
        if (nextBtn && bookingState.currentStep === 3) {
            nextBtn.disabled = !form.checkValidity();
        }
    });
}

// Submit booking
function submitBooking() {
    const form = document.getElementById('patientForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Gather patient details
    bookingState.patientDetails = {
        name: document.getElementById('patientName').value,
        email: document.getElementById('patientEmail').value,
        phone: document.getElementById('patientPhone').value,
        reason: document.getElementById('visitReason').value,
        notes: document.getElementById('additionalNotes').value
    };

    // Create booking object
    const booking = {
        id: Date.now(),
        doctor: bookingState.selectedDoctor,
        date: bookingState.selectedDate,
        time: bookingState.selectedTime,
        patient: bookingState.patientDetails,
        status: 'confirmed',
        createdAt: new Date()
    };

    // Save to localStorage
    saveBooking(booking);

    // Show success modal
    showSuccessModal();

    // Reset booking state after a delay
    setTimeout(() => {
        resetBooking();
    }, 2000);
}

function saveBooking(booking) {
    let bookings = JSON.parse(localStorage.getItem('healify-bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('healify-bookings', JSON.stringify(bookings));
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('show');

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
}

function resetBooking() {
    bookingState = {
        currentStep: 1,
        selectedDoctor: null,
        selectedDate: null,
        selectedTime: null,
        patientDetails: null,
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear()
    };

    // Reset form
    const form = document.getElementById('patientForm');
    if (form) {
        form.reset();
    }

    // Reset selections
    document.querySelectorAll('.doctor-option, .calendar-day, .time-slot').forEach(el => {
        el.classList.remove('selected');
    });

    // Reset summary
    document.getElementById('summaryDoctor').innerHTML = '<span class="summary-empty">Not selected</span>';
    document.getElementById('summarySpecialty').innerHTML = '<span class="summary-empty">-</span>';
    document.getElementById('summaryDate').innerHTML = '<span class="summary-empty">Not selected</span>';
    document.getElementById('summaryTime').innerHTML = '<span class="summary-empty">Not selected</span>';
    document.getElementById('summaryPrice').innerHTML = '$0';

    // Reset step display
    updateStepDisplay();
}

// Export functions for global use
window.selectDoctor = selectDoctor;
window.selectTime = selectTime;
