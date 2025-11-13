// API Configuration
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// State
let allUsers = [];
let filteredUsers = [];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const usersTableBody = document.getElementById('usersTableBody');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const refreshBtn = document.getElementById('refreshBtn');
const resultsCount = document.getElementById('resultsCount');
const modal = document.getElementById('userModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    refreshBtn.addEventListener('click', fetchUsers);
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Fetch users from API
async function fetchUsers() {
    try {
        showLoading(true);
        hideError();

        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        allUsers = data;
        filteredUsers = data;
        
        renderUsers(filteredUsers);
        updateResultsCount(filteredUsers.length);
        showLoading(false);
        
    } catch (error) {
        showLoading(false);
        showError(`Failed to load users: ${error.message}`);
        console.error('Error fetching users:', error);
    }
}

// Render users in table
function renderUsers(users) {
    if (users.length === 0) {
        usersTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="no-results">
                    No users found matching your search criteria
                </td>
            </tr>
        `;
        return;
    }

    usersTableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td>${user.company.name}</td>
            <td>${user.address.city}</td>
            <td>
                <button class="view-btn" onclick="showUserDetails(${user.id})">
                    View Details
                </button>
            </td>
        </tr>
    `).join('');
}

// Handle search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (searchTerm === '') {
        filteredUsers = allUsers;
    } else {
        filteredUsers = allUsers.filter(user => {
            return (
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                user.company.name.toLowerCase().includes(searchTerm) ||
                user.address.city.toLowerCase().includes(searchTerm) ||
                user.username.toLowerCase().includes(searchTerm)
            );
        });
    }

    renderUsers(filteredUsers);
    updateResultsCount(filteredUsers.length);
}

// Show user details in modal
function showUserDetails(userId) {
    const user = allUsers.find(u => u.id === userId);
    
    if (!user) {
        console.error('User not found');
        return;
    }

    modalTitle.textContent = `${user.name}'s Profile`;
    
    modalBody.innerHTML = `
        <div class="detail-section">
            <h3>👤 Personal Information</h3>
            <div class="detail-grid">
                <div class="detail-group">
                    <div class="detail-label">Full Name</div>
                    <div class="detail-value">${user.name}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Username</div>
                    <div class="detail-value">@${user.username}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Email</div>
                    <div class="detail-value">${user.email}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Phone</div>
                    <div class="detail-value">${user.phone}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Website</div>
                    <div class="detail-value">
                        <a href="http://${user.website}" target="_blank" style="color: #667eea;">
                            ${user.website}
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="detail-section">
            <h3>📍 Address</h3>
            <div class="detail-grid">
                <div class="detail-group">
                    <div class="detail-label">Street</div>
                    <div class="detail-value">${user.address.street}, ${user.address.suite}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">City</div>
                    <div class="detail-value">${user.address.city}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Zipcode</div>
                    <div class="detail-value">${user.address.zipcode}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Coordinates</div>
                    <div class="detail-value">
                        Lat: ${user.address.geo.lat}<br>
                        Lng: ${user.address.geo.lng}
                    </div>
                </div>
            </div>
        </div>

        <div class="detail-section">
            <h3>🏢 Company</h3>
            <div class="detail-grid">
                <div class="detail-group">
                    <div class="detail-label">Company Name</div>
                    <div class="detail-value">${user.company.name}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Catch Phrase</div>
                    <div class="detail-value">${user.company.catchPhrase}</div>
                </div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Business</div>
                <div class="detail-value">${user.company.bs}</div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Show/hide loading indicator
function showLoading(show) {
    loadingIndicator.style.display = show ? 'block' : 'none';
    document.querySelector('.table-container').style.display = show ? 'none' : 'block';
}

// Show error message
function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'flex';
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Update results count
function updateResultsCount(count) {
    const totalUsers = allUsers.length;
    if (count === totalUsers) {
        resultsCount.textContent = `Showing all ${count} users`;
    } else {
        resultsCount.textContent = `Showing ${count} of ${totalUsers} users`;
    }
}
