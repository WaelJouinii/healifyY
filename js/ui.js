// ================================
// UI Interactions for Healify
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Check authentication status
    checkAuthStatus();
    
    // Event Listeners
    setupEventListeners();
    
    // Header scroll effect
    setupHeaderScrollEffect();
});

// ================================
// Event Listeners Setup
// ================================
function setupEventListeners() {
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchBar = document.getElementById('searchBar');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById('searchInput');
    const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', toggleSearchBar);
    }
    
    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', closeSearchBar);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', performSearch);
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Profile button
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', handleProfileClick);
    }
    
    // Menu button (sidebar)
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleSidebar);
    }
    
    // Close search bar when clicking outside
    document.addEventListener('click', function(e) {
        if (searchBar && searchBar.classList.contains('active')) {
            if (!searchBar.contains(e.target) && !searchBtn.contains(e.target)) {
                closeSearchBar();
            }
        }
    });
}

// ================================
// Search Bar Functions
// ================================
function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBar) {
        searchBar.classList.toggle('active');
        
        if (searchBar.classList.contains('active')) {
            setTimeout(() => {
                searchInput?.focus();
            }, 300);
        }
    }
}

function closeSearchBar() {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchBar) {
        searchBar.classList.remove('active');
    }
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    if (searchResults) {
        searchResults.innerHTML = '';
    }
}

function handleSearch(e) {
    const query = e.target.value.trim();
    const searchResults = document.getElementById('searchResults');
    
    if (!searchResults) return;
    
    if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
    }
    
    // Debounce search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        displaySearchResults(query);
    }, 300);
}

function displaySearchResults(query) {
    const searchResults = document.getElementById('searchResults');
    
    if (!searchResults) return;
    
    // Mock search results (replace with actual API call)
    const mockResults = [
        { type: 'doctor', name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', icon: 'fa-user-md' },
        { type: 'doctor', name: 'Dr. Michael Chen', specialty: 'Neurologist', icon: 'fa-user-md' },
        { type: 'specialty', name: 'Cardiology', icon: 'fa-heartbeat' },
        { type: 'specialty', name: 'Neurology', icon: 'fa-brain' },
        { type: 'symptom', name: 'Headache', icon: 'fa-head-side-cough' }
    ];
    
    const filteredResults = mockResults.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        (item.specialty && item.specialty.toLowerCase().includes(query.toLowerCase()))
    );
    
    if (filteredResults.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        return;
    }
    
    searchResults.innerHTML = filteredResults.map(result => `
        <div class="search-result-item" onclick="selectSearchResult('${result.type}', '${result.name}')">
            <i class="fas ${result.icon}" style="margin-right: 10px; color: var(--primary-color);"></i>
            <strong>${result.name}</strong>
            ${result.specialty ? `<span style="color: var(--text-color); opacity: 0.7;"> - ${result.specialty}</span>` : ''}
        </div>
    `).join('');
}

function selectSearchResult(type, name) {
    console.log(`Selected ${type}: ${name}`);
    
    // Navigate based on type
    if (type === 'doctor') {
        window.location.href = 'doctors.html?search=' + encodeURIComponent(name);
    } else if (type === 'specialty') {
        window.location.href = 'doctors.html?specialty=' + encodeURIComponent(name);
    }
    
    closeSearchBar();
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput?.value.trim();
    
    if (query && query.length > 0) {
        window.location.href = 'doctors.html?search=' + encodeURIComponent(query);
    }
}

// ================================
// Theme Functions
// ================================
function initTheme() {
    const savedTheme = localStorage.getItem('healify-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add animation class
    themeToggle?.classList.add('theme-switching');
    
    // Change theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('healify-theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        themeToggle?.classList.remove('theme-switching');
    }, 500);
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// ================================
// Authentication Functions
// ================================
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('healify-user-token');
    const userRole = localStorage.getItem('healify-user-role');
    
    const profileBtn = document.getElementById('profileBtn');
    const calendarItem = document.getElementById('calendarItem');
    const dashboardItem = document.getElementById('dashboardItem');
    
    if (isLoggedIn) {
        // User is logged in
        if (profileBtn) {
            profileBtn.classList.add('has-notification');
        }
        
        // Show calendar and dashboard icons
        if (calendarItem) calendarItem.style.display = 'block';
        if (dashboardItem) {
            dashboardItem.style.display = 'block';
            
            // Set correct dashboard link based on role
            const dashboardLink = dashboardItem.querySelector('a');
            if (dashboardLink && userRole === 'doctor') {
                dashboardLink.href = '../dashboard-doctor.html';
            }
        }
    } else {
        // User is not logged in
        if (calendarItem) calendarItem.style.display = 'none';
        if (dashboardItem) dashboardItem.style.display = 'none';
    }
}

function handleProfileClick() {
    const isLoggedIn = localStorage.getItem('healify-user-token');
    
    if (isLoggedIn) {
        // Navigate to profile page
        window.location.href = 'profil.html';
    } else {
        // Navigate to login page
        window.location.href = 'login.html';
    }
}

// ================================
// Sidebar Functions
// ================================
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
    
    if (overlay) {
        overlay.classList.toggle('active');
    } else {
        // Create overlay if it doesn't exist
        const newOverlay = document.createElement('div');
        newOverlay.className = 'sidebar-overlay active';
        newOverlay.addEventListener('click', toggleSidebar);
        document.body.appendChild(newOverlay);
    }
    
    // Prevent body scroll when sidebar is open
    document.body.style.overflow = sidebar?.classList.contains('active') ? 'hidden' : '';
}

// ================================
// Notification Functions
// ================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ================================
// Header Scroll Effect
// ================================
function setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('backToTop');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll for header
        if (header) {
            if (currentScroll > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Show/hide back to top button
        if (backToTopBtn) {
            if (currentScroll > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // Back to top button click handler
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ================================
// Component Loading Functions
// ================================
function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id "${elementId}" not found`);
        return;
    }
    
    console.log(`Loading component: ${componentPath} into ${elementId}`);
    
    // Add cache busting parameter
    const cacheBuster = `?v=${Date.now()}`;
    
    fetch(componentPath + cacheBuster)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${componentPath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            console.log(`Component loaded successfully: ${componentPath}`);
            console.log(`HTML length: ${html.length} characters`);
            console.log(`First 200 chars:`, html.substring(0, 200));
            element.innerHTML = html;
            console.log(`Component injected into ${elementId}`);
            
            // Re-initialize event listeners after component is loaded
            if (elementId === 'headerPlaceholder') {
                console.log('Initializing header event listeners...');
                setupEventListeners();
                checkAuthStatus();
            }
        })
        .catch(error => {
            console.error('Error loading component:', error);
            // Fallback: show minimal header if component fails to load
            if (elementId === 'headerPlaceholder') {
                element.innerHTML = `
                    <header class="header">
                        <div class="header-container">
                            <div class="logo">
                                <a href="index.html">
                                    <i class="fas fa-heartbeat"></i>
                                    <span class="logo-text">Healify</span>
                                </a>
                            </div>
                        </div>
                    </header>
                `;
            }
        });
}

// ================================
// Utility Functions
// ================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to element
function smoothScrollTo(element) {
    if (!element) return;
    
    const offset = 80; // Header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleSearchBar,
        closeSearchBar,
        toggleTheme,
        toggleSidebar,
        showNotification,
        checkAuthStatus,
        smoothScrollTo
    };
}
