// Booking functionality for Healify reservation page (Tunisian version)

// Sample doctors data
const availableDoctors = [
    { id: 1, name: 'Dr. Ahmed Ben Ali', specialty: 'Cardiologie', rating: 4.9, experience: 15, avatar: 'AB', price: 450 },
    { id: 2, name: 'Dr. Salma Trabelsi', specialty: 'Dermatologie', rating: 4.8, experience: 12, avatar: 'ST', price: 360 },
    { id: 3, name: 'Dr. Youssef Mhiri', specialty: 'Pédiatrie', rating: 4.9, experience: 18, avatar: 'YM', price: 390 },
    { id: 4, name: 'Dr. Rania Ben Romdhane', specialty: 'Neurologie', rating: 4.7, experience: 20, avatar: 'RB', price: 540 },
    { id: 5, name: 'Dr. Karim Mansouri', specialty: 'Orthopédie', rating: 4.8, experience: 14, avatar: 'KM', price: 420 },
    { id: 6, name: 'Dr. Leila Hammami', specialty: 'Psychiatrie', rating: 4.9, experience: 16, avatar: 'LH', price: 480 }
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
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
];

// Initialize booking page
document.addEventListener('DOMContentLoaded', initializeBooking);

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
                    <span><i class="fas fa-briefcase"></i> ${doctor.experience} ans</span>
                    <span><i class="fas fa-dollar-sign"></i> ${doctor.price} د</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Select doctor
function selectDoctor(doctorId) {
    document.querySelectorAll('.doctor-option').forEach(option => option.classList.remove('selected'));
    const selectedOption = document.querySelector(`[data-doctor-id="${doctorId}"]`);
    if (selectedOption) selectedOption.classList.add('selected');

    bookingState.selectedDoctor = availableDoctors.find(d => d.id === doctorId);
    updateSummary();

    const nextBtn = document.getElementById('btnNext');
    if (nextBtn) nextBtn.disabled = false;
}

// Calendar
function initializeCalendar() {
    renderCalendar();
    updateMonthDisplay();

    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    if (prevBtn) prevBtn.addEventListener('click', () => {
        bookingState.currentMonth--;
        if (bookingState.currentMonth < 0) {
            bookingState.currentMonth = 11;
            bookingState.currentYear--;
        }
        renderCalendar();
        updateMonthDisplay();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        bookingState.currentMonth++;
        if (bookingState.currentMonth > 11) {
            bookingState.currentMonth = 0;
            bookingState.currentYear++;
        }
        renderCalendar();
        updateMonthDisplay();
    });
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;

    const firstDay = new Date(bookingState.currentYear, bookingState.currentMonth, 1).getDay();
    const daysInMonth = new Date(bookingState.currentYear, bookingState.currentMonth + 1, 0).getDate();
    const today = new Date();
    
    calendarGrid.innerHTML = '';
    const dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    dayLabels.forEach(day => {
        const label = document.createElement('div');
        label.className = 'calendar-day-label';
        label.textContent = day;
        calendarGrid.appendChild(label);
    });

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        calendarGrid.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(bookingState.currentYear, bookingState.currentMonth, day);
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        if (date < today.setHours(0, 0, 0, 0)) dayElement.classList.add('disabled');
        else {
            if (date.toDateString() === new Date().toDateString()) dayElement.classList.add('today');
            dayElement.addEventListener('click', () => selectDate(date));
        }

        calendarGrid.appendChild(dayElement);
    }
}

function updateMonthDisplay() {
    const monthDisplay = document.getElementById('currentMonth');
    if (!monthDisplay) return;

    const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    monthDisplay.textContent = `${monthNames[bookingState.currentMonth]} ${bookingState.currentYear}`;
}

function selectDate(date) {
    document.querySelectorAll('.calendar-day').forEach(day => day.classList.remove('selected'));
    event.target.classList.add('selected');
    bookingState.selectedDate = date;
    updateSummary();
    checkStep2Complete();
}

// Time slots
function generateTimeSlots() {
    const timeSlotsGrid = document.getElementById('timeSlotsGrid');
    if (!timeSlotsGrid) return;

    timeSlotsGrid.innerHTML = timeSlots.map(time => `
        <div class="time-slot" onclick="selectTime('${time}')">${time}</div>
    `).join('');
}

function selectTime(time) {
    document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
    event.target.classList.add('selected');
    bookingState.selectedTime = time;
    updateSummary();
    checkStep2Complete();
}

function checkStep2Complete() {
    const nextBtn = document.getElementById('btnNext');
    if (!nextBtn) return;
    nextBtn.disabled = !(bookingState.selectedDate && bookingState.selectedTime);
}

// Update summary
function updateSummary() {
    if (bookingState.selectedDoctor) {
        document.getElementById('summaryDoctor').innerHTML = bookingState.selectedDoctor.name;
        document.getElementById('summarySpecialty').innerHTML = bookingState.selectedDoctor.specialty;
        document.getElementById('summaryPrice').innerHTML = `${bookingState.selectedDoctor.price} د`;
    }
    if (bookingState.selectedDate) {
        const options = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
        document.getElementById('summaryDate').innerHTML = bookingState.selectedDate.toLocaleDateString('fr-FR', options);
    }
    if (bookingState.selectedTime) document.getElementById('summaryTime').innerHTML = bookingState.selectedTime;
}

// Navigation and form submission functions (same as original)...

window.selectDoctor = selectDoctor;
window.selectTime = selectTime;
