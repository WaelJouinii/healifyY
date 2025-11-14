// Dashboard functionality for Healify

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Check authentication
    checkAuthentication();
    
    // Load user data
    loadUserData();
    
    // Load dashboard data
    loadAppointments();
    loadStats();
    loadRecentActivity();
    loadHealthRecords();
    loadNotifications();
    loadFavoriteDoctors();
    
    // Setup event listeners
    setupEventListeners();
}

// Check if user is authenticated
function checkAuthentication() {
    const token = localStorage.getItem('healify-user-token');
    if (!token) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html?redirect=dashboard-clien.html';
        return;
    }
}

// Load user data
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('healify-user-data') || '{}');
    const userName = userData.firstName || userData.name || 'User';
    
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
}

// Load appointments from localStorage
function loadAppointments() {
    const bookings = JSON.parse(localStorage.getItem('healify-bookings') || '[]');
    const upcomingList = document.getElementById('upcomingAppointmentsList');
    
    if (!upcomingList) return;
    
    // Filter upcoming appointments
    const now = new Date();
    const upcomingAppointments = bookings.filter(booking => {
        const appointmentDate = new Date(booking.date);
        return appointmentDate >= now && booking.status === 'confirmed';
    }).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 3);
    
    if (upcomingAppointments.length === 0) {
        upcomingList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <p>No upcoming appointments</p>
            </div>
        `;
        return;
    }
    
    upcomingList.innerHTML = upcomingAppointments.map(appointment => {
        const appointmentDate = new Date(appointment.date);
        const day = appointmentDate.getDate();
        const month = appointmentDate.toLocaleString('en-US', { month: 'short' });
        
        return `
            <div class="appointment-item" onclick="viewAppointment(${appointment.id})">
                <div class="appointment-date">
                    <div class="appointment-day">${day}</div>
                    <div class="appointment-month">${month}</div>
                </div>
                <div class="appointment-details">
                    <div class="appointment-doctor">${appointment.doctor.name}</div>
                    <div class="appointment-specialty">${appointment.doctor.specialty}</div>
                    <div class="appointment-time">
                        <i class="fas fa-clock"></i>
                        ${appointment.time}
                    </div>
                </div>
                <span class="appointment-status status-${appointment.status}">${appointment.status}</span>
            </div>
        `;
    }).join('');
}

// Load stats
function loadStats() {
    const bookings = JSON.parse(localStorage.getItem('healify-bookings') || '[]');
    
    // Total appointments
    const totalAppointments = bookings.length;
    document.getElementById('totalAppointments').textContent = totalAppointments;
    
    // Upcoming appointments
    const now = new Date();
    const upcoming = bookings.filter(booking => {
        const appointmentDate = new Date(booking.date);
        return appointmentDate >= now && booking.status === 'confirmed';
    }).length;
    document.getElementById('upcomingAppointments').textContent = upcoming;
    
    // Doctors consulted (unique doctors)
    const uniqueDoctors = [...new Set(bookings.map(b => b.doctor.id))];
    document.getElementById('doctorsConsulted').textContent = uniqueDoctors.length;
    
    // Prescriptions (mock data)
    document.getElementById('totalPrescriptions').textContent = Math.min(bookings.length * 2, 15);
}

// Load recent activity
function loadRecentActivity() {
    const activityList = document.getElementById('recentActivityList');
    if (!activityList) return;
    
    const bookings = JSON.parse(localStorage.getItem('healify-bookings') || '[]');
    
    // Generate activity from bookings
    const activities = bookings.slice(-5).reverse().map(booking => {
        const timeSince = getTimeSince(new Date(booking.createdAt));
        return {
            icon: 'fa-calendar-check',
            title: `Appointment booked with ${booking.doctor.name}`,
            time: timeSince,
            type: 'booking'
        };
    });
    
    // Add some mock activities
    if (activities.length < 3) {
        activities.push(
            {
                icon: 'fa-user-edit',
                title: 'Profile updated successfully',
                time: '2 days ago',
                type: 'profile'
            },
            {
                icon: 'fa-file-medical',
                title: 'New health record uploaded',
                time: '5 days ago',
                type: 'record'
            },
            {
                icon: 'fa-prescription',
                title: 'Prescription received from Dr. Johnson',
                time: '1 week ago',
                type: 'prescription'
            }
        );
    }
    
    if (activities.length === 0) {
        activityList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history"></i>
                <p>No recent activity</p>
            </div>
        `;
        return;
    }
    
    activityList.innerHTML = activities.slice(0, 5).map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

// Load health records
function loadHealthRecords() {
    const recordsList = document.getElementById('healthRecordsList');
    if (!recordsList) return;
    
    // Mock health records
    const records = [
        { name: 'Blood Test Results', date: 'Nov 10, 2025', icon: 'fa-vial' },
        { name: 'X-Ray Report', date: 'Nov 5, 2025', icon: 'fa-x-ray' },
        { name: 'Prescription History', date: 'Oct 28, 2025', icon: 'fa-prescription' },
        { name: 'Vaccination Record', date: 'Oct 15, 2025', icon: 'fa-syringe' }
    ];
    
    recordsList.innerHTML = records.map((record, index) => `
        <div class="record-item" onclick="viewRecord(${index})">
            <div class="record-icon">
                <i class="fas ${record.icon}"></i>
            </div>
            <div class="record-info">
                <div class="record-name">${record.name}</div>
                <div class="record-date">${record.date}</div>
            </div>
            <i class="fas fa-download record-action"></i>
        </div>
    `).join('');
}

// Load notifications
function loadNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;
    
    const bookings = JSON.parse(localStorage.getItem('healify-bookings') || '[]');
    
    // Generate notifications from upcoming appointments
    const now = new Date();
    const upcomingAppointments = bookings.filter(booking => {
        const appointmentDate = new Date(booking.date);
        const hoursDiff = (appointmentDate - now) / (1000 * 60 * 60);
        return hoursDiff > 0 && hoursDiff < 48;
    });
    
    const notifications = upcomingAppointments.map(appointment => {
        const appointmentDate = new Date(appointment.date);
        const timeSince = getTimeSince(appointmentDate, true);
        return {
            icon: 'fa-calendar-alt',
            title: 'Upcoming Appointment',
            message: `You have an appointment with ${appointment.doctor.name} ${timeSince}`,
            time: timeSince,
            unread: true
        };
    });
    
    // Add mock notifications
    notifications.push(
        {
            icon: 'fa-star',
            title: 'New Doctor Available',
            message: 'Dr. Sarah Williams is now accepting appointments',
            time: '2 hours ago',
            unread: true
        },
        {
            icon: 'fa-bell',
            title: 'Appointment Reminder',
            message: 'Don\'t forget your appointment tomorrow at 10:00 AM',
            time: '5 hours ago',
            unread: false
        },
        {
            icon: 'fa-prescription',
            title: 'Prescription Ready',
            message: 'Your prescription is ready for pickup',
            time: '1 day ago',
            unread: false
        }
    );
    
    notificationsList.innerHTML = notifications.slice(0, 5).map((notif, index) => `
        <div class="notification-item ${notif.unread ? 'unread' : ''}" onclick="markNotificationRead(${index})">
            <div class="notification-icon">
                <i class="fas ${notif.icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${notif.title}</div>
                <div class="notification-message">${notif.message}</div>
                <div class="notification-time">${notif.time}</div>
            </div>
        </div>
    `).join('');
}

// Load favorite doctors
function loadFavoriteDoctors() {
    const favoritesList = document.getElementById('favoriteDoctorsList');
    if (!favoritesList) return;
    
    // Get unique doctors from bookings
    const bookings = JSON.parse(localStorage.getItem('healify-bookings') || '[]');
    const doctorMap = new Map();
    
    bookings.forEach(booking => {
        const doctorId = booking.doctor.id;
        if (!doctorMap.has(doctorId)) {
            doctorMap.set(doctorId, {
                ...booking.doctor,
                appointments: 1
            });
        } else {
            const doctor = doctorMap.get(doctorId);
            doctor.appointments++;
            doctorMap.set(doctorId, doctor);
        }
    });
    
    const favoriteDoctors = Array.from(doctorMap.values())
        .sort((a, b) => b.appointments - a.appointments)
        .slice(0, 4);
    
    if (favoriteDoctors.length === 0) {
        favoritesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-user-md"></i>
                <p>No favorite doctors yet</p>
            </div>
        `;
        return;
    }
    
    favoritesList.innerHTML = favoriteDoctors.map(doctor => `
        <div class="favorite-doctor-item" onclick="viewDoctorProfile(${doctor.id})">
            <div class="doctor-avatar-small">${doctor.avatar}</div>
            <div class="favorite-doctor-info">
                <div class="favorite-doctor-name">${doctor.name}</div>
                <div class="favorite-doctor-specialty">${doctor.specialty}</div>
            </div>
            <div class="favorite-doctor-rating">
                <i class="fas fa-star"></i>
                ${doctor.rating}
            </div>
        </div>
    `).join('');
}

// Helper function to get time since
function getTimeSince(date, future = false) {
    const now = new Date();
    const diff = future ? date - now : now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (future) {
        if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`;
        if (hours > 0) return `in ${hours} hour${hours > 1 ? 's' : ''}`;
        if (minutes > 0) return `in ${minutes} minute${minutes > 1 ? 's' : ''}`;
        return 'soon';
    } else {
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'just now';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Sidebar handlers
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', toggleSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // ESC key to close sidebar/search
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const sidebar = document.querySelector('.sidebar');
            const searchBar = document.querySelector('.search-bar');
            
            if (sidebar && sidebar.classList.contains('active')) {
                toggleSidebar();
            }
            if (searchBar && searchBar.classList.contains('active')) {
                closeSearchBar();
            }
        }
    });
    
    // Update sidebar based on auth status
    updateSidebarAuth();
}

function updateSidebarAuth() {
    const isLoggedIn = localStorage.getItem('healify-user-token');
    const body = document.body;
    
    if (isLoggedIn) {
        body.classList.add('logged-in');
    } else {
        body.classList.remove('logged-in');
    }
}

function handleLogout(e) {
    e.preventDefault();
    
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('healify-user-token');
        localStorage.removeItem('healify-user-role');
        localStorage.removeItem('healify-user-data');
        
        window.location.href = 'index.html';
    }
}

// View appointment details
function viewAppointment(appointmentId) {
    console.log('Viewing appointment:', appointmentId);
    // In a real app, this would navigate to appointment details page
    alert('Appointment details coming soon!');
}

// View record
function viewRecord(recordIndex) {
    console.log('Viewing record:', recordIndex);
    alert('Record viewer coming soon!');
}

// View doctor profile
function viewDoctorProfile(doctorId) {
    console.log('Viewing doctor:', doctorId);
    window.location.href = `profil-viewer.html?doctor=${doctorId}`;
}

// Mark notification as read
function markNotificationRead(index) {
    console.log('Marking notification as read:', index);
    event.currentTarget.classList.remove('unread');
}

// Mark all notifications as read
function markAllRead() {
    document.querySelectorAll('.notification-item').forEach(item => {
        item.classList.remove('unread');
    });
}

// Upload health record
function uploadRecord() {
    alert('File upload feature coming soon!');
}

// Update health metrics
function updateMetrics() {
    alert('Health metrics update feature coming soon!');
}

// Start video call
function startVideoCall() {
    alert('Video consultation feature coming soon!');
}

// Prescriptions Data (In production, this would come from backend)
const prescriptionsData = [
    {
        id: 1,
        date: '2024-11-20',
        doctor: {
            name: 'Dr. Sarah Smith',
            specialty: 'Cardiologist',
            avatar: 'SS'
        },
        status: 'active',
        medicines: [
            {
                name: 'Aspirin',
                type: 'Tablet',
                dosage: '75mg',
                frequency: 'Once daily',
                duration: '30 days',
                timing: 'After breakfast',
                instructions: 'Take with a full glass of water. Do not crush or chew.'
            },
            {
                name: 'Atorvastatin',
                type: 'Tablet',
                dosage: '10mg',
                frequency: 'Once daily',
                duration: '30 days',
                timing: 'Before bedtime',
                instructions: 'Take at the same time each day. Avoid grapefruit juice.'
            }
        ],
        diagnosis: 'Mild Hypertension',
        notes: 'Continue medication for 30 days. Schedule follow-up appointment. Monitor blood pressure regularly.',
        nextReview: '2024-12-20'
    },
    {
        id: 2,
        date: '2024-11-15',
        doctor: {
            name: 'Dr. Michael Johnson',
            specialty: 'General Physician',
            avatar: 'MJ'
        },
        status: 'active',
        medicines: [
            {
                name: 'Vitamin D3',
                type: 'Capsule',
                dosage: '1000 IU',
                frequency: 'Once daily',
                duration: '90 days',
                timing: 'With any meal',
                instructions: 'Take with food for better absorption.'
            },
            {
                name: 'Calcium Carbonate',
                type: 'Tablet',
                dosage: '500mg',
                frequency: 'Twice daily',
                duration: '90 days',
                timing: 'Morning and evening',
                instructions: 'Take 2 hours apart from other medications.'
            }
        ],
        diagnosis: 'Vitamin D Deficiency',
        notes: 'Patient advised to increase sun exposure and dietary calcium intake. Retest after 3 months.',
        nextReview: '2025-02-15'
    },
    {
        id: 3,
        date: '2024-10-05',
        doctor: {
            name: 'Dr. Emily Williams',
            specialty: 'ENT Specialist',
            avatar: 'EW'
        },
        status: 'completed',
        medicines: [
            {
                name: 'Amoxicillin',
                type: 'Capsule',
                dosage: '500mg',
                frequency: 'Three times daily',
                duration: '7 days',
                timing: 'Every 8 hours',
                instructions: 'Complete the full course even if symptoms improve. Take with food to prevent stomach upset.'
            },
            {
                name: 'Paracetamol',
                type: 'Tablet',
                dosage: '650mg',
                frequency: 'As needed',
                duration: '7 days',
                timing: 'Every 4-6 hours',
                instructions: 'For fever or pain. Do not exceed 4 doses in 24 hours.'
            }
        ],
        diagnosis: 'Acute Pharyngitis',
        notes: 'Patient responded well to treatment. Symptoms resolved within 5 days.',
        nextReview: 'Completed'
    }
];

let currentPrescription = null;

// View prescriptions
function viewPrescriptions() {
    // Load prescriptions from localStorage or use sample data
    const prescriptions = JSON.parse(localStorage.getItem('healify-prescriptions')) || prescriptionsData;
    
    // Save to localStorage if not exists
    if (!localStorage.getItem('healify-prescriptions')) {
        localStorage.setItem('healify-prescriptions', JSON.stringify(prescriptionsData));
    }

    const modal = document.getElementById('prescriptionModal');
    const container = document.getElementById('prescriptionsListModal');

    if (prescriptions.length === 0) {
        container.innerHTML = `
            <div class="empty-prescriptions">
                <i class="fas fa-prescription"></i>
                <h3>No Prescriptions Yet</h3>
                <p>Your prescriptions will appear here after consultations</p>
            </div>
        `;
    } else {
        container.innerHTML = prescriptions.map(prescription => {
            const statusClass = prescription.status === 'active' ? 'status-active' :
                              prescription.status === 'completed' ? 'status-completed' : 'status-expired';
            
            return `
                <div class="prescription-card" onclick="viewPrescriptionDetail(${prescription.id})">
                    <div class="prescription-header">
                        <div class="prescription-date">
                            <i class="fas fa-calendar"></i>
                            ${formatDate(prescription.date)}
                        </div>
                        <span class="prescription-status ${statusClass}">
                            ${prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                        </span>
                    </div>
                    <div class="prescription-doctor">
                        <div class="doctor-avatar-small">${prescription.doctor.avatar}</div>
                        <div class="doctor-info-small">
                            <h4>${prescription.doctor.name}</h4>
                            <p>${prescription.doctor.specialty}</p>
                        </div>
                    </div>
                    <div class="prescription-medicines">
                        <div class="medicine-count">
                            <i class="fas fa-pills"></i> 
                            ${prescription.medicines.length} Medicine${prescription.medicines.length > 1 ? 's' : ''}
                        </div>
                        <div class="medicine-list">
                            ${prescription.medicines.map(med => 
                                `<span class="medicine-tag">${med.name}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    modal.classList.add('show');
}

// View prescription detail
function viewPrescriptionDetail(prescriptionId) {
    const prescriptions = JSON.parse(localStorage.getItem('healify-prescriptions')) || prescriptionsData;
    currentPrescription = prescriptions.find(p => p.id === prescriptionId);

    if (!currentPrescription) return;

    const modal = document.getElementById('prescriptionDetailModal');
    const content = document.getElementById('prescriptionDetailContent');

    const statusClass = currentPrescription.status === 'active' ? 'status-active' :
                       currentPrescription.status === 'completed' ? 'status-completed' : 'status-expired';

    content.innerHTML = `
        <div class="prescription-detail-header">
            <h3>Prescription #${currentPrescription.id.toString().padStart(5, '0')}</h3>
            <p>Issued on ${formatDate(currentPrescription.date)}</p>
        </div>

        <div class="detail-section">
            <div class="detail-section-title">
                <i class="fas fa-user-md"></i>
                Doctor Information
            </div>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">Doctor Name</div>
                    <div class="detail-value">${currentPrescription.doctor.name}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Specialty</div>
                    <div class="detail-value">${currentPrescription.doctor.specialty}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Prescription Date</div>
                    <div class="detail-value">${formatDate(currentPrescription.date)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Status</div>
                    <div class="detail-value">
                        <span class="prescription-status ${statusClass}">
                            ${currentPrescription.status.charAt(0).toUpperCase() + currentPrescription.status.slice(1)}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="detail-section">
            <div class="detail-section-title">
                <i class="fas fa-stethoscope"></i>
                Diagnosis
            </div>
            <div class="detail-item">
                <div class="detail-value">${currentPrescription.diagnosis}</div>
            </div>
        </div>

        <div class="detail-section">
            <div class="detail-section-title">
                <i class="fas fa-pills"></i>
                Prescribed Medications
            </div>
            ${currentPrescription.medicines.map((medicine, index) => `
                <div class="medicine-detail-card">
                    <div class="medicine-detail-header">
                        <h4 class="medicine-name">${index + 1}. ${medicine.name}</h4>
                        <span class="medicine-type">${medicine.type}</span>
                    </div>
                    <div class="medicine-details">
                        <div class="medicine-detail-item">
                            <i class="fas fa-capsules"></i>
                            <span><strong>Dosage:</strong> ${medicine.dosage}</span>
                        </div>
                        <div class="medicine-detail-item">
                            <i class="fas fa-clock"></i>
                            <span><strong>Frequency:</strong> ${medicine.frequency}</span>
                        </div>
                        <div class="medicine-detail-item">
                            <i class="fas fa-calendar-day"></i>
                            <span><strong>Duration:</strong> ${medicine.duration}</span>
                        </div>
                        <div class="medicine-detail-item">
                            <i class="fas fa-sun"></i>
                            <span><strong>Timing:</strong> ${medicine.timing}</span>
                        </div>
                    </div>
                    <div class="instructions-box">
                        <strong><i class="fas fa-info-circle"></i> Instructions:</strong>
                        <p>${medicine.instructions}</p>
                    </div>
                </div>
            `).join('')}
        </div>

        ${currentPrescription.notes ? `
            <div class="detail-section">
                <div class="detail-section-title">
                    <i class="fas fa-file-medical"></i>
                    Additional Notes
                </div>
                <div class="notes-box">
                    <p>${currentPrescription.notes}</p>
                </div>
            </div>
        ` : ''}

        <div class="detail-section">
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">Next Review</div>
                    <div class="detail-value">${currentPrescription.nextReview}</div>
                </div>
            </div>
        </div>
    `;

    // Close the prescriptions list modal
    document.getElementById('prescriptionModal').classList.remove('show');
    
    // Show detail modal
    modal.classList.add('show');
}

// Close prescription modal
function closePrescriptionModal() {
    const modal = document.getElementById('prescriptionModal');
    modal.classList.remove('show');
}

// Close prescription detail modal
function closePrescriptionDetailModal() {
    const modal = document.getElementById('prescriptionDetailModal');
    modal.classList.remove('show');
}

// Download prescription as PDF
function downloadPrescription() {
    if (!currentPrescription) return;
    
    // In production, this would generate a PDF
    alert('PDF download feature: In production, this would generate a PDF file with the prescription details.');
    
    // Simulate download
    console.log('Downloading prescription:', currentPrescription);
}

// Print prescription
function printPrescription() {
    if (!currentPrescription) return;
    
    const printContent = document.getElementById('prescriptionDetailContent').innerHTML;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Prescription - ${currentPrescription.id}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .prescription-detail-header {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                }
                .detail-section {
                    margin-bottom: 20px;
                }
                .detail-section-title {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 15px;
                    color: #333;
                }
                .detail-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                }
                .detail-item {
                    background: #f9fafb;
                    padding: 10px;
                    border-radius: 5px;
                }
                .detail-label {
                    font-size: 12px;
                    color: #666;
                    margin-bottom: 5px;
                }
                .detail-value {
                    font-weight: bold;
                    color: #333;
                }
                .medicine-detail-card {
                    background: #f8fafc;
                    border: 2px solid #e2e8f0;
                    border-radius: 10px;
                    padding: 15px;
                    margin-bottom: 15px;
                    page-break-inside: avoid;
                }
                .medicine-name {
                    color: #667eea;
                    margin-bottom: 10px;
                }
                .medicine-details {
                    margin: 10px 0;
                }
                .medicine-detail-item {
                    margin: 5px 0;
                }
                .instructions-box {
                    background: #fef3c7;
                    border: 2px solid #fde047;
                    border-radius: 5px;
                    padding: 10px;
                    margin-top: 10px;
                }
                .notes-box {
                    background: #e0f2fe;
                    border: 2px solid #7dd3fc;
                    border-radius: 5px;
                    padding: 10px;
                }
                .prescription-status {
                    display: inline-block;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 12px;
                }
                .status-active {
                    background: #10b981;
                    color: white;
                }
                @media print {
                    body { margin: 0; }
                }
            </style>
        </head>
        <body>
            ${printContent}
            <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
                <p>This is a computer-generated prescription from Healify</p>
                <p>Printed on: ${new Date().toLocaleString()}</p>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// View lab reports
function viewLabReports() {
    alert('Lab reports viewer coming soon!');
}

// Close modals on ESC key or outside click
document.addEventListener('DOMContentLoaded', function() {
    // ESC key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePrescriptionModal();
            closePrescriptionDetailModal();
        }
    });

    // Click outside to close modals
    const prescriptionModal = document.getElementById('prescriptionModal');
    const prescriptionDetailModal = document.getElementById('prescriptionDetailModal');

    if (prescriptionModal) {
        prescriptionModal.addEventListener('click', function(e) {
            if (e.target === prescriptionModal) {
                closePrescriptionModal();
            }
        });
    }

    if (prescriptionDetailModal) {
        prescriptionDetailModal.addEventListener('click', function(e) {
            if (e.target === prescriptionDetailModal) {
                closePrescriptionDetailModal();
            }
        });
    }
});

// Export functions for global use
window.viewAppointment = viewAppointment;
window.viewRecord = viewRecord;
window.viewDoctorProfile = viewDoctorProfile;
window.markNotificationRead = markNotificationRead;
window.markAllRead = markAllRead;
window.uploadRecord = uploadRecord;
window.updateMetrics = updateMetrics;
window.startVideoCall = startVideoCall;
window.viewPrescriptions = viewPrescriptions;
window.viewPrescriptionDetail = viewPrescriptionDetail;
window.closePrescriptionModal = closePrescriptionModal;
window.closePrescriptionDetailModal = closePrescriptionDetailModal;
window.downloadPrescription = downloadPrescription;
window.printPrescription = printPrescription;
window.viewLabReports = viewLabReports;
