// Enhanced SAFAR Portal Application JavaScript

// Application state
const AppState = {
    currentUser: null,
    currentService: null,
    isLoggedIn: false,
    panicButtonTimer: null,
    locationTracking: true,
    companionLinks: [],
    currentZone: 'Delhi Central',
    centralId: 'CENT001',
    emergencyContacts: [
        { name: "Emergency Services", number: "112" },
        { name: "Family Contact", number: "+91-9876543210" },
        { name: "Local Guide", number: "+91-9876543211" }
    ]
};

// Enhanced service data
const ServiceData = {
    safarIds: [
        {id: "SAFAR001", name: "Vaibhav Shakya", zone: "Sitapura Jaipur", status: "active", linkedGuide: "GUIDE001", location: "JECRC Foundation"},
        {id: "SAFAR002", name: "Himanshu bGaur", zone: "Sitapura Jaipur", status: "active", linkedGuide: "GUIDE002", location: "JECRC Foundation"},
        {id: "SAFAR003", name: "Mohit Sharma", zone: "Sitapura Jaipur", status: "inactive", linkedGuide: null, location: "JECRC Foundation"}
    ],
    guideIds: [
        {id: "GUIDE001", name: "Naveen", zone: "Sitapura Jaipur", verified: true, rating: 4.8, services: ["Hotel", "Transport", "Local Guide"]},
        {id: "GUIDE002", name: "Aayushi Giri", zone: "Sitapura Jaipur", verified: true, rating: 4.9, services: ["Cab Service", "Local Guide"]},
        {id: "GUIDE003", name: "Tushar", zone: "Jagatpura Jaipur", verified: true, rating: 4.7, services: ["Auto Service", "Hotel Booking"]}
    ],
    messageTemplates: [
        "Weather Alert: Heavy rain expected in your area. Please stay safe.",
        "Security Alert: Avoid crowded areas due to ongoing event.",
        "Tourism Update: New attraction opened near your location.",
        "Safety Reminder: Always keep your SafarID visible.",
        "Emergency: Please respond immediately to confirm your safety."
    ],
    hotels: [
        {name: "Taj Delhi", rating: 5, availability: true, guideId: "GUIDE001"},
        {name: "Hotel Ashok", rating: 4, availability: true, guideId: "GUIDE001"},
        {name: "The Leela Palace", rating: 5, availability: false, guideId: "GUIDE002"}
    ],
    transport: [
        {type: "Cab", driver: "Ramesh Kumar", vehicle: "Swift Desire", status: "available", guideId: "GUIDE002"},
        {type: "Auto", driver: "Suresh Yadav", vehicle: "Auto Rickshaw", status: "busy", guideId: "GUIDE003"},
        {type: "Rental", company: "Zoomcar", vehicle: "Hyundai i20", status: "available", guideId: "GUIDE001"}
    ]
};

// Service credentials configuration
const ServiceCredentials = {
    safarguard: {
        safarid: "Tushar",
        idproof: "Parmar",
        fields: {
            username: { label: "SafarID", type: "text" },
            password: { label: "ID Proof Number", type: "password" }
        }
    },
    safarguide: {
        guideid: "Tushar",
        password: "Parmar",
        fields: {
            username: { label: "Guide ID", type: "text" },
            password: { label: "Password", type: "password" }
        }
    },
    safarcentral: {
        officerid: "Tushar",
        password: "Parmar",
        fields: {
            username: { label: "Officer ID", type: "text" },
            password: { label: "Password", type: "password" }
        }
    },
    safarconnect: {
        officerid: "Tushar",
        password: "Parmar",
        fields: {
            username: { label: "Officer ID", type: "text" },
            password: { label: "Password", type: "password" }
        }
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced SAFAR Portal initializing...');
    // Wait for DOM to be fully ready
    setTimeout(() => {
        initializeApplication();
    }, 500);
});

function initializeApplication() {
    console.log('Starting application initialization...');
    initializeEventListeners();
    showPage('loginPage');
    simulateLocationTracking();
    console.log('Application initialized successfully');
}

// Event listeners setup - COMPLETELY REWRITTEN
function initializeEventListeners() {
    console.log('Setting up event listeners...');
    
    // Find and attach login button listeners - FIXED APPROACH
    const loginButtons = document.querySelectorAll('.login-btn');
    console.log('Found login buttons:', loginButtons.length);
    
    loginButtons.forEach((btn, index) => {
        const service = btn.getAttribute('data-service');
        console.log(`Setting up button ${index + 1}: service = "${service}"`);
        
        if (service) {
            // Remove any existing listeners
            btn.onclick = null;
            
            // Add new click listener
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Login button clicked for service: ${service}`);
                openLoginModal(service);
            });
            
            console.log(`Button setup complete for ${service}`);
        } else {
            console.warn('Button found without data-service attribute:', btn);
        }
    });

    // QR scan buttons
    const qrButtons = document.querySelectorAll('.qr-btn');
    console.log('Found QR buttons:', qrButtons.length);
    qrButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showNotification('QR Scanner feature coming soon! Use "Secure Login" for now.', 'info');
        });
    });

    // Modal handlers
    setupModalHandlers();
    
    // Login form
    setupLoginForm();
    
    console.log('Event listeners setup completed');
}

function setupModalHandlers() {
    const loginModal = document.getElementById('loginModal');
    const modalClose = document.querySelector('.modal-close');
    
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLoginModal();
            }
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeLoginModal();
        });
    }
}

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Login modal management - FIXED VERSION
function openLoginModal(service) {
    console.log('openLoginModal called with service:', service);
    
    if (!service) {
        console.error('No service provided to openLoginModal');
        showNotification('System error: No service specified', 'error');
        return;
    }
    
    const loginModal = document.getElementById('loginModal');
    if (!loginModal) {
        console.error('Login modal not found in DOM');
        showNotification('System error: Login modal not found', 'error');
        return;
    }
    
    const modalTitle = document.getElementById('modalTitle');
    const usernameLabel = document.getElementById('usernameLabel');
    const passwordLabel = document.getElementById('passwordLabel');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    
    if (!modalTitle || !usernameLabel || !passwordLabel || !username || !password) {
        console.error('Modal form elements not found');
        showNotification('System error: Modal form elements not found', 'error');
        return;
    }
    
    AppState.currentService = service;
    const config = ServiceCredentials[service];
    
    if (!config) {
        console.error('Service configuration not found for:', service);
        showNotification('System error: Service configuration not found', 'error');
        return;
    }
    
    // Configure modal content
    modalTitle.textContent = `${service.toUpperCase()} Login`;
    usernameLabel.textContent = config.fields.username.label;
    passwordLabel.textContent = config.fields.password.label;
    username.type = config.fields.username.type;
    password.type = config.fields.password.type;
    username.placeholder = `Enter your ${config.fields.username.label}`;
    password.placeholder = `Enter your ${config.fields.password.label}`;
    
    // Clear form
    username.value = '';
    password.value = '';
    
    // Show modal
    loginModal.style.display = 'flex';
    loginModal.classList.remove('hidden');
    
    // Focus on username field
    setTimeout(() => {
        username.focus();
    }, 100);
    
    console.log(`Login modal opened successfully for ${service}`);
    showNotification(`Opening ${service.toUpperCase()} login...`, 'info');
}

function closeLoginModal() {
    console.log('Closing login modal');
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.add('hidden');
        loginModal.style.display = 'none';
    }
    AppState.currentService = null;
}

// Enhanced login handling
function handleLogin(e) {
    e.preventDefault();
    console.log('Handling login...');
    
    const service = AppState.currentService;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    console.log('Login attempt:', { service, username, password: '***' });
    
    if (!service) {
        showNotification('System error: No service selected', 'error');
        return;
    }
    
    if (!username || !password) {
        showNotification('Please fill in all fields', 'warning');
        return;
    }
    
    const credentials = ServiceCredentials[service];
    if (!credentials) {
        console.error('No credentials found for service:', service);
        showNotification('System error: Service configuration not found', 'error');
        return;
    }
    
    // Determine expected credentials
    let expectedUsername, expectedPassword;
    if (service === 'safarguard') {
        expectedUsername = credentials.safarid;
        expectedPassword = credentials.idproof;
    } else if (service === 'safarguide') {
        expectedUsername = credentials.guideid;
        expectedPassword = credentials.password;
    } else {
        expectedUsername = credentials.officerid;
        expectedPassword = credentials.password;
    }
    
    console.log('Expected credentials:', { expectedUsername, expectedPassword: '***' });
    
    // Validate credentials
    if (username === expectedUsername && password === expectedPassword) {
        console.log('Login successful');
        
        // Set app state
        AppState.currentUser = username;
        AppState.isLoggedIn = true;
        
        // Close modal and show dashboard
        closeLoginModal();
        showPage(`${service}Dashboard`);
        
        // Success notification
        showNotification(`✅ Welcome to ${service.toUpperCase()}! System ready.`, 'success');
        
        // Simulate blockchain verification
        setTimeout(() => {
            showNotification('🔗 Blockchain identity verified', 'info');
        }, 2000);
        
    } else {
        console.log('Login failed - invalid credentials');
        showNotification('❌ Invalid credentials. Please check your login details.', 'error');
        
        // Clear password field only
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
}

// Page navigation
function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Initialize page-specific features
        if (pageId.includes('Dashboard')) {
            setTimeout(() => {
                initializePageFeatures(pageId);
                setupLogoutButtons();
            }, 300);
        }
        
        console.log(`Page ${pageId} displayed successfully`);
    } else {
        console.error('Page not found:', pageId);
        showNotification('System error: Page not found', 'error');
    }
}

// Setup logout functionality
function setupLogoutButtons() {
    const logoutButtons = document.querySelectorAll('.logout-btn');
    console.log('Setting up logout buttons:', logoutButtons.length);
    
    logoutButtons.forEach(btn => {
        // Remove existing listeners
        btn.onclick = null;
        
        // Add new listener
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });
}

// Logout function
function logout() {
    console.log('Logging out...');
    
    const previousService = AppState.currentService;
    
    // Clear state
    AppState.currentUser = null;
    AppState.isLoggedIn = false;
    AppState.currentService = null;
    AppState.companionLinks = [];
    
    // Show login page
    showPage('loginPage');
    
    // Notification
    showNotification(`🚪 Logged out successfully`, 'info');
}

// Initialize page-specific features
function initializePageFeatures(pageId) {
    console.log('Initializing features for:', pageId);
    
    switch(pageId) {
        case 'safarguardDashboard':
            initializeSafarguardFeatures();
            break;
        case 'safarguideDashboard':
            initializeSafarguideFeatures();
            break;
        case 'safarcentralDashboard':
            initializeSafarcentralFeatures();
            break;
        case 'safarconnectDashboard':
            initializeSafarconnectFeatures();
            break;
    }
}

// SAFARGUARD Features
function initializeSafarguardFeatures() {
    console.log('Initializing SAFARGUARD features...');
    initializePanicButton();
    initializeTransportSafety();
    startLocationMonitoring();
    updateJourneyProgress();
}

function initializePanicButton() {
    const panicButton = document.getElementById('panicButton');
    if (!panicButton) return;

    let holdTimer = null;
    let holdProgress = 0;

    function startPanicHold(e) {
        e.preventDefault();
        holdProgress = 0;
        panicButton.classList.add('activating');
        
        holdTimer = setInterval(() => {
            holdProgress += 100;
            if (holdProgress >= 3000) {
                triggerEmergency();
                cancelPanicHold();
            }
        }, 100);
    }

    function cancelPanicHold() {
        if (holdTimer) {
            clearInterval(holdTimer);
            holdTimer = null;
        }
        panicButton.classList.remove('activating');
        holdProgress = 0;
    }

    panicButton.addEventListener('mousedown', startPanicHold);
    panicButton.addEventListener('mouseup', cancelPanicHold);
    panicButton.addEventListener('mouseleave', cancelPanicHold);
    panicButton.addEventListener('touchstart', startPanicHold);
    panicButton.addEventListener('touchend', cancelPanicHold);
}

function initializeTransportSafety() {
    const approveRideBtn = document.getElementById('approveRideBtn');
    const generateOtpBtn = document.getElementById('generateOtpBtn');
    
    if (approveRideBtn) {
        approveRideBtn.addEventListener('click', function() {
            this.textContent = '✓ Approved';
            this.disabled = true;
            this.classList.add('btn--secondary');
            showNotification('🚗 Ride approved! Driver notified.', 'success');
            
            const statusEl = document.querySelector('.transport-status .status');
            if (statusEl) {
                statusEl.textContent = '✓ Approved';
                statusEl.className = 'status status--success';
            }
        });
    }
    
    if (generateOtpBtn) {
        generateOtpBtn.addEventListener('click', generateRideOTP);
    }
}

// SAFARGUIDE Features
function initializeSafarguideFeatures() {
    console.log('Initializing SAFARGUIDE features...');
    initializeTouristLookup();
    initializeServiceBooking();
    initializeDriverCoordination();
}

function initializeTouristLookup() {
    const lookupBtn = document.getElementById('lookupTourist');
    const safarIdInput = document.getElementById('safarIdLookup');
    
    if (lookupBtn && safarIdInput) {
        lookupBtn.addEventListener('click', function() {
            const safarId = safarIdInput.value.trim().toUpperCase();
            if (!safarId) {
                showNotification('Please enter a SafarID', 'warning');
                return;
            }
            
            const tourist = ServiceData.safarIds.find(t => t.id === safarId);
            if (tourist) {
                displayTouristInfo(tourist);
                showNotification(`✅ Tourist information loaded for ${safarId}`, 'success');
            } else {
                showNotification('❌ SafarID not found', 'error');
            }
        });
        
        safarIdInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                lookupBtn.click();
            }
        });
    }
}

function displayTouristInfo(tourist) {
    const touristInfo = document.getElementById('touristInfo');
    const touristName = document.getElementById('touristName');
    const touristLocation = document.getElementById('touristLocation');
    const touristStatus = document.getElementById('touristStatus');
    
    if (touristInfo && touristName && touristLocation && touristStatus) {
        touristName.textContent = tourist.name;
        touristLocation.textContent = tourist.location;
        touristStatus.textContent = tourist.status;
        touristStatus.className = `status status--${tourist.status === 'active' ? 'success' : 'warning'}`;
        
        touristInfo.classList.remove('hidden');
    }
}

function initializeServiceBooking() {
    document.querySelectorAll('.service-item .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceName = this.parentElement.querySelector('span').textContent;
            if (this.textContent === 'Book') {
                this.textContent = 'Booked';
                this.disabled = true;
                this.classList.add('btn--secondary');
                showNotification(`🏨 ${serviceName} booked successfully!`, 'success');
            } else if (this.textContent === 'Assign') {
                this.textContent = 'Assigned';
                this.disabled = true;
                this.classList.add('btn--secondary');
                showNotification(`🚗 ${serviceName} assigned to tourist`, 'success');
            }
        });
    });
}

function initializeDriverCoordination() {
    const requestApprovalBtn = document.getElementById('requestApproval');
    
    if (requestApprovalBtn) {
        requestApprovalBtn.addEventListener('click', function() {
            this.textContent = '⏳ Approval Sent';
            this.disabled = true;
            showNotification('🚗 Approval request sent to SAFARGUARD', 'info');
            
            setTimeout(() => {
                showNotification('✅ Transport approved by SAFARGUARD!', 'success');
                this.textContent = '✓ Approved';
                this.classList.add('btn--secondary');
            }, 3000);
        });
    }
}

// SAFARCENTRAL Features
function initializeSafarcentralFeatures() {
    console.log('Initializing SAFARCENTRAL features...');
    initializeAlertSystem();
    initializeTabSystem();
    simulateRealTimeUpdates();
}

function initializeAlertSystem() {
    const sendAlertBtn = document.getElementById('sendAlert');
    const messageTarget = document.getElementById('messageTarget');
    const messageTemplate = document.getElementById('messageTemplate');
    const customMessage = document.getElementById('customMessage');
    
    if (sendAlertBtn) {
        sendAlertBtn.addEventListener('click', function() {
            const target = messageTarget?.value || 'All users';
            const template = messageTemplate?.value || 'Custom message';
            const message = customMessage?.value || template;
            
            if (!message.trim()) {
                showNotification('Please enter a message', 'warning');
                return;
            }
            
            showNotification(`📢 Alert sent to: ${target}`, 'success');
            
            if (customMessage) customMessage.value = '';
            
            setTimeout(() => {
                showNotification(`✅ Alert delivered to ${getTargetCount(target)} recipients`, 'info');
            }, 2000);
        });
    }
    
    if (messageTemplate && customMessage) {
        messageTemplate.addEventListener('change', function() {
            if (this.value !== 'Custom Message') {
                customMessage.value = this.value;
            }
        });
    }
}

function getTargetCount(target) {
    switch(target) {
        case 'All SafarIDs in Zone': return '15';
        case 'All GuideIDs in Zone': return '8';
        case 'Specific SafarID': return '1';
        case 'Specific GuideID': return '1';
        default: return '23';
    }
}

function initializeTabSystem() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function simulateRealTimeUpdates() {
    setInterval(() => {
        if (AppState.currentService === 'safarcentral') {
            updateTrackingData();
        }
    }, 30000);
}

function updateTrackingData() {
    const trackedUsers = document.querySelectorAll('.tracked-user');
    trackedUsers.forEach(user => {
        const location = user.querySelector('.user-location');
        if (location && Math.random() > 0.7) {
            const locations = ['Red Fort Area', 'India Gate Area', 'Lotus Temple', 'Qutub Minar'];
            location.textContent = locations[Math.floor(Math.random() * locations.length)];
        }
    });
}

// SAFARCONNECT Features
function initializeSafarconnectFeatures() {
    console.log('Initializing SAFARCONNECT features...');
    initializeSafarIdGeneration();
    initializeQrGeneration();
}

function initializeSafarIdGeneration() {
    const safarIdForm = document.getElementById('safarIdForm');
    
    if (safarIdForm) {
        safarIdForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const touristName = document.getElementById('touristName').value.trim();
            const idProofType = document.getElementById('idProofType').value;
            const idProofNumber = document.getElementById('idProofNumber').value.trim();
            
            if (!touristName || !idProofType || !idProofNumber) {
                showNotification('Please fill all required fields', 'warning');
                return;
            }
            
            const newSafarId = generateNewSafarId();
            
            ServiceData.safarIds.push({
                id: newSafarId,
                name: touristName,
                zone: AppState.currentZone,
                status: 'active',
                linkedGuide: null,
                location: 'Registration Point'
            });
            
            showNotification(`🆔 SAFAR ID generated: ${newSafarId}`, 'success');
            updateSafarIdSelect(newSafarId, touristName);
            safarIdForm.reset();
            
            setTimeout(() => {
                showNotification('🔗 Blockchain verification completed', 'info');
            }, 2000);
        });
    }
}

function generateNewSafarId() {
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `SAFAR${timestamp}${random}`;
}

function updateSafarIdSelect(newId, name) {
    const safarIdSelect = document.getElementById('safarIdSelect');
    if (safarIdSelect) {
        const option = document.createElement('option');
        option.value = newId;
        option.textContent = `${newId} - ${name}`;
        safarIdSelect.appendChild(option);
    }
}

function initializeQrGeneration() {
    const generateQrBtn = document.getElementById('generateQr');
    const safarIdSelect = document.getElementById('safarIdSelect');
    
    if (generateQrBtn && safarIdSelect) {
        generateQrBtn.addEventListener('click', function() {
            const selectedSafarId = safarIdSelect.value;
            if (!selectedSafarId) {
                showNotification('Please select a SAFAR ID', 'warning');
                return;
            }
            
            generateQrCode(selectedSafarId);
        });
    }
}

function generateQrCode(safarId) {
    const qrDisplay = document.getElementById('qrDisplay');
    const qrSafarId = document.getElementById('qrSafarId');
    const qrGenerated = document.getElementById('qrGenerated');
    const qrExpires = document.getElementById('qrExpires');
    
    if (qrDisplay && qrSafarId && qrGenerated && qrExpires) {
        const now = new Date();
        const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        qrSafarId.textContent = safarId;
        qrGenerated.textContent = now.toLocaleString();
        qrExpires.textContent = expires.toLocaleString();
        
        qrDisplay.classList.remove('hidden');
        
        showNotification(`📱 QR Code generated for ${safarId}`, 'success');
    }
}

// Utility functions
function triggerEmergency() {
    console.log('🚨 EMERGENCY ACTIVATED!');
    showNotification('🚨 EMERGENCY! All services alerted. Help dispatched.', 'error');
    
    setTimeout(() => {
        showNotification('🚑 Emergency services ETA: 5 minutes', 'warning');
    }, 3000);
    
    setTimeout(() => {
        showNotification('👮 SAFARCENTRAL coordinating response', 'info');
    }, 5000);
}

function generateRideOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpCode = document.querySelector('.otp-code');
    const otpDisplay = document.getElementById('otpDisplay');
    const generateOtpBtn = document.getElementById('generateOtpBtn');
    
    if (otpCode && otpDisplay && generateOtpBtn) {
        otpCode.textContent = otp.toString();
        otpDisplay.classList.remove('hidden');
        generateOtpBtn.textContent = 'Generate New OTP';
        
        showNotification('🔢 Safety OTP generated! Share with driver.', 'success');
        
        setTimeout(() => {
            otpDisplay.classList.add('hidden');
            generateOtpBtn.textContent = 'Generate Safety OTP';
            showNotification('⏰ OTP expired. Generate new one if needed.', 'warning');
        }, 30 * 60 * 1000);
    }
}

function simulateLocationTracking() {
    if (!AppState.locationTracking) return;
    
    setInterval(() => {
        if (AppState.isLoggedIn && AppState.currentService === 'safarguard') {
            updateLocationStatus();
        }
    }, 45000);
}

function updateLocationStatus() {
    console.log('📍 Location updated and shared with SAFARCENTRAL');
}

function startLocationMonitoring() {
    console.log('📍 Location monitoring active for SafarID:', AppState.currentUser);
}

function updateJourneyProgress() {
    let progress = 65;
    const progressFill = document.querySelector('.progress-fill');
    
    const updateInterval = setInterval(() => {
        if (progress < 100) {
            progress += Math.random() * 3;
            if (progress > 100) progress = 100;
            
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }
        } else {
            clearInterval(updateInterval);
            showNotification('🎉 Journey completed successfully!', 'success');
        }
    }, 20000);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--space-16);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 400px;
        opacity: 0;
        transform: translateY(-20px);
        transition: all var(--duration-normal) var(--ease-standard);
    `;
    
    const colors = {
        success: { border: 'var(--color-success)', bg: 'rgba(var(--color-success-rgb), 0.1)' },
        error: { border: 'var(--color-error)', bg: 'rgba(var(--color-error-rgb), 0.1)' },
        warning: { border: 'var(--color-warning)', bg: 'rgba(var(--color-warning-rgb), 0.1)' },
        info: { border: 'var(--color-info)', bg: 'rgba(var(--color-info-rgb), 0.1)' }
    };
    
    if (colors[type]) {
        notification.style.borderColor = colors[type].border;
        notification.style.backgroundColor = colors[type].bg;
    }
    
    notification.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: var(--space-12);">
            <span style="font-size: var(--font-size-lg);">${getNotificationIcon(type)}</span>
            <div style="flex: 1;">
                <p style="margin: 0; color: var(--color-text); font-weight: var(--font-weight-medium);">${message}</p>
            </div>
            <button class="notification-close" style="background: none; border: none; color: var(--color-text-secondary); cursor: pointer; font-size: var(--font-size-lg);">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
    
    const duration = type === 'error' ? 10000 : 5000;
    setTimeout(() => removeNotification(notification), duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '🚨',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

function removeNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'e' && AppState.currentService === 'safarguard') {
        e.preventDefault();
        triggerEmergency();
    }
    
    if (e.key === 'Escape') {
        const loginModal = document.getElementById('loginModal');
        if (loginModal && !loginModal.classList.contains('hidden')) {
            closeLoginModal();
        }
    }
});

// Network status
window.addEventListener('online', () => {
    showNotification('🌐 Connection restored. All SAFAR services online.', 'success');
});

window.addEventListener('offline', () => {
    showNotification('📡 Connection lost. Operating in offline mode.', 'warning');
});

// Export for debugging
window.SafarApp = {
    AppState,
    ServiceData,
    triggerEmergency,
    generateRideOTP,
    showNotification,
    openLoginModal,
    closeLoginModal,
    showPage,
    logout,
    generateQrCode,
    initializeApplication
};

console.log('🚀 Enhanced SAFAR Portal loaded and ready!');
