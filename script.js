// Global Variables
let currentPage = 'home';
let currentTheme = 'light';
let currentUser = {
    id: 1,
    username: 'emmaj',
    name: 'Emma Johnson',
    email: 'emma@example.com',
    bio: 'Creative soul passionate about aesthetics',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjRkZFNEUxIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjRkZCRUQ0Ii8+CjxwYXRoIGQ9Ik03NSA4MGMwLTExLjA0NS04Ljk1NS0yMC0yMC0yMEg0NWMtMTEuMDQ1IDAtMjAgOC45NTUtMjAgMjB2MTBoNTBWODB6IiBmaWxsPSIjRkZCRUQ0Ii8+Cjwvc3ZnPgo=',
    followers: 1200,
    following: 847,
    pins: 523
};

let pins = [];
let collections = [];
let notifications = [];
let currentFilter = 'all';
let searchQuery = '';
let isLoading = false;
let currentPin = null;

// Mock Data
const mockPins = [
    {
        id: 1,
        title: 'Aesthetic Pink Sunset',
        description: 'Beautiful pastel pink sunset over calm waters',
        image: generatePlaceholderImage(300, 400, '#f8b2c9'),
        author: { name: 'Emma Johnson', avatar: currentUser.avatar },
        category: 'aesthetic',
        tags: ['sunset', 'pink', 'aesthetic', 'nature'],
        likes: 234,
        comments: 12,
        saved: false,
        createdAt: new Date(2024, 0, 15)
    },
    {
        id: 2,
        title: 'Minimalist Fashion',
        description: 'Clean lines and neutral tones in modern fashion',
        image: generatePlaceholderImage(300, 500, '#fde4e7'),
        author: { name: 'Sophie Chen', avatar: generateProfileImage('#fde4e7') },
        category: 'fashion',
        tags: ['minimalist', 'fashion', 'neutral', 'clean'],
        likes: 189,
        comments: 8,
        saved: true,
        createdAt: new Date(2024, 0, 18)
    },
    {
        id: 3,
        title: 'Travel Diary Vibes',
        description: 'Capturing memories from around the world',
        image: generatePlaceholderImage(300, 350, '#e8b4f5'),
        author: { name: 'Alex Rivera', avatar: generateProfileImage('#e8b4f5') },
        category: 'travel',
        tags: ['travel', 'diary', 'memories', 'adventure'],
        likes: 456,
        comments: 23,
        saved: false,
        createdAt: new Date(2024, 0, 20)
    },
    {
        id: 4,
        title: 'Inspirational Quote',
        description: 'Daily motivation for creative minds',
        image: generatePlaceholderImage(300, 300, '#ffb6c1'),
        author: { name: 'Maya Patel', avatar: generateProfileImage('#ffb6c1') },
        category: 'quotes',
        tags: ['inspiration', 'motivation', 'quotes', 'mindset'],
        likes: 678,
        comments: 45,
        saved: true,
        createdAt: new Date(2024, 0, 22)
    },
    {
        id: 5,
        title: 'Modern Web Design',
        description: 'Clean and innovative UI/UX design concepts',
        image: generatePlaceholderImage(300, 450, '#ffd0dc'),
        author: { name: 'David Kim', avatar: generateProfileImage('#ffd0dc') },
        category: 'design',
        tags: ['web', 'design', 'ui', 'ux', 'modern'],
        likes: 234,
        comments: 15,
        saved: false,
        createdAt: new Date(2024, 0, 25)
    },
    {
        id: 6,
        title: 'Cozy Coffee Corner',
        description: 'Perfect morning coffee setup inspiration',
        image: generatePlaceholderImage(300, 380, '#f0e4ff'),
        author: { name: 'Luna Garcia', avatar: generateProfileImage('#f0e4ff') },
        category: 'food',
        tags: ['coffee', 'cozy', 'morning', 'aesthetic'],
        likes: 567,
        comments: 34,
        saved: true,
        createdAt: new Date(2024, 0, 28)
    }
];

const mockCollections = [
    {
        id: 1,
        name: 'Aesthetic Vibes',
        description: 'Soft pastels and dreamy aesthetics',
        pins: [1, 2, 4],
        private: false,
        createdAt: new Date(2024, 0, 10)
    },
    {
        id: 2,
        name: 'Fashion Inspiration',
        description: 'Style ideas and outfit inspiration',
        pins: [2],
        private: false,
        createdAt: new Date(2024, 0, 12)
    },
    {
        id: 3,
        name: 'Travel Dreams',
        description: 'Places to visit and travel inspiration',
        pins: [3],
        private: true,
        createdAt: new Date(2024, 0, 14)
    }
];

const mockNotifications = [
    {
        id: 1,
        type: 'like',
        text: 'Sophie Chen liked your pin "Aesthetic Pink Sunset"',
        time: '2 hours ago',
        read: false,
        avatar: generateProfileImage('#fde4e7')
    },
    {
        id: 2,
        type: 'comment',
        text: 'Alex Rivera commented on your pin "Minimalist Fashion"',
        time: '5 hours ago',
        read: false,
        avatar: generateProfileImage('#e8b4f5')
    },
    {
        id: 3,
        type: 'follow',
        text: 'Maya Patel started following you',
        time: '1 day ago',
        read: true,
        avatar: generateProfileImage('#ffb6c1')
    }
];

// Helper Functions
function generatePlaceholderImage(width, height, color) {
    return `data:image/svg+xml;base64,${btoa(`
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="${width}" height="${height}" fill="${color}"/>
            <rect x="20" y="20" width="${width-40}" height="${height-40}" fill="rgba(255,255,255,0.1)" rx="8"/>
            <circle cx="${width/2}" cy="${height/2}" r="30" fill="rgba(255,255,255,0.2)"/>
            <path d="M${width/2-15} ${height/2-10} L${width/2+15} ${height/2-10} L${width/2} ${height/2+10} Z" fill="rgba(255,255,255,0.3)"/>
        </svg>
    `)}`;
}

function generateProfileImage(color) {
    return `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="${color}"/>
            <circle cx="20" cy="16" r="6" fill="rgba(255,255,255,0.8)"/>
            <path d="M30 32c0-4.418-3.582-8-8-8h-4c-4.418 0-8 3.582-8 8v4h20v-4z" fill="rgba(255,255,255,0.8)"/>
        </svg>
    `)}`;
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.getElementById('toast-container').appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showLoading() {
    document.getElementById('loading-skeleton').classList.add('active');
    document.body.classList.add('no-scroll');
}

function hideLoading() {
    document.getElementById('loading-skeleton').classList.remove('active');
    document.body.classList.remove('no-scroll');
}

// Theme Management
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const themeIcon = document.querySelector('#theme-toggle i');
    themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === currentTheme);
    });
    
    localStorage.setItem('theme', currentTheme);
    showToast(`Switched to ${currentTheme} mode`);
}

// Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(`${pageId}-page`).classList.add('active');
    
    // Update navigation states
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === pageId);
    });
    
    currentPage = pageId;
    
    // Load page content
    switch(pageId) {
        case 'home':
            loadHomeFeed();
            break;
        case 'search':
            loadSearchResults();
            break;
        case 'collections':
            loadCollections();
            break;
        case 'profile':
            loadProfile();
            break;
        case 'settings':
            loadSettings();
            break;
        case 'explore':
            loadExplore();
            break;
    }
}

// Home Feed
function loadHomeFeed() {
    const container = document.getElementById('masonry-container');
    container.innerHTML = '';
    
    let filteredPins = currentFilter === 'all' ? mockPins : mockPins.filter(pin => pin.category === currentFilter);
    
    filteredPins.forEach(pin => {
        const pinElement = createPinCard(pin);
        container.appendChild(pinElement);
    });
    
    // Animate pins in
    setTimeout(() => {
        container.querySelectorAll('.pin-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-fadeIn');
            }, index * 100);
        });
    }, 100);
}

function createPinCard(pin) {
    const card = document.createElement('div');
    card.className = 'pin-card';
    card.innerHTML = `
        <img src="${pin.image}" alt="${pin.title}">
        <div class="pin-overlay">
            <div class="pin-info">
                <div class="pin-title">${pin.title}</div>
                <div class="pin-author">
                    <img src="${pin.author.avatar}" alt="${pin.author.name}">
                    <span>${pin.author.name}</span>
                </div>
            </div>
        </div>
        <div class="pin-actions">
            <button class="pin-action-btn" onclick="savePin(${pin.id})">
                <i class="fas fa-bookmark"></i>
            </button>
            <button class="pin-action-btn" onclick="sharePin(${pin.id})">
                <i class="fas fa-share"></i>
            </button>
            <button class="pin-action-btn" onclick="likePin(${pin.id})">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;
    
    card.addEventListener('click', () => openPinModal(pin));
    return card;
}

function filterPins(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    loadHomeFeed();
}

function loadMore() {
    if (isLoading) return;
    
    isLoading = true;
    const btn = document.getElementById('load-more-btn');
    btn.textContent = 'Loading...';
    
    setTimeout(() => {
        // Generate more pins
        const newPins = Array.from({length: 6}, (_, i) => ({
            id: pins.length + i + 1,
            title: `Pin ${pins.length + i + 1}`,
            description: `Description for pin ${pins.length + i + 1}`,
            image: generatePlaceholderImage(300, 300 + Math.random() * 200, '#f8b2c9'),
            author: { name: 'User ' + (i + 1), avatar: generateProfileImage('#fde4e7') },
            category: ['aesthetic', 'fashion', 'travel', 'quotes', 'design', 'food'][Math.floor(Math.random() * 6)],
            tags: ['tag1', 'tag2', 'tag3'],
            likes: Math.floor(Math.random() * 1000),
            comments: Math.floor(Math.random() * 50),
            saved: false,
            createdAt: new Date()
        }));
        
        newPins.forEach(pin => {
            const pinElement = createPinCard(pin);
            document.getElementById('masonry-container').appendChild(pinElement);
        });
        
        btn.textContent = 'Load More';
        isLoading = false;
    }, 1000);
}

// Pin Modal
function openPinModal(pin) {
    currentPin = pin;
    const modal = document.getElementById('pin-modal');
    
    document.getElementById('pin-modal-image').src = pin.image;
    document.getElementById('pin-modal-title').textContent = pin.title;
    document.getElementById('pin-modal-description').textContent = pin.description;
    
    // Load tags
    const tagsContainer = document.getElementById('pin-modal-tags');
    tagsContainer.innerHTML = '';
    pin.tags.forEach(tag => {
        const tagElement = document.createElement('a');
        tagElement.className = 'pin-tag';
        tagElement.href = '#';
        tagElement.textContent = `#${tag}`;
        tagElement.addEventListener('click', (e) => {
            e.preventDefault();
            searchByTag(tag);
        });
        tagsContainer.appendChild(tagElement);
    });
    
    // Load author
    const authorContainer = modal.querySelector('.pin-author');
    authorContainer.innerHTML = `
        <img src="${pin.author.avatar}" alt="${pin.author.name}" class="author-avatar">
        <span class="author-name">${pin.author.name}</span>
    `;
    
    // Load comments
    loadComments(pin.id);
    
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
}

function closePinModal() {
    document.getElementById('pin-modal').classList.remove('active');
    document.body.classList.remove('no-scroll');
    currentPin = null;
}

function loadComments(pinId) {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    
    // Mock comments
    const comments = [
        {
            id: 1,
            author: 'Sophie Chen',
            text: 'This is absolutely beautiful! Love the colors.',
            time: '2 hours ago',
            avatar: generateProfileImage('#fde4e7')
        },
        {
            id: 2,
            author: 'Alex Rivera',
            text: 'So inspiring! Added to my collection.',
            time: '5 hours ago',
            avatar: generateProfileImage('#e8b4f5')
        }
    ];
    
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <img src="${comment.avatar}" alt="${comment.author}" class="comment-avatar">
            <div class="comment-content">
                <div class="comment-author">${comment.author}</div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-time">${comment.time}</div>
            </div>
        `;
        commentsList.appendChild(commentElement);
    });
}

function addComment() {
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    
    if (!text) return;
    
    const commentsList = document.getElementById('comments-list');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    commentElement.innerHTML = `
        <img src="${currentUser.avatar}" alt="${currentUser.name}" class="comment-avatar">
        <div class="comment-content">
            <div class="comment-author">${currentUser.name}</div>
            <div class="comment-text">${text}</div>
            <div class="comment-time">Just now</div>
        </div>
    `;
    
    commentsList.insertBefore(commentElement, commentsList.firstChild);
    input.value = '';
    
    showToast('Comment added successfully!');
}

// Pin Actions
function savePin(pinId) {
    const pin = mockPins.find(p => p.id === pinId);
    if (!pin) return;
    
    pin.saved = !pin.saved;
    
    if (pin.saved) {
        openSaveModal(pin);
    } else {
        showToast('Pin removed from saved');
    }
}

function sharePin(pinId) {
    const pin = mockPins.find(p => p.id === pinId);
    if (!pin) return;
    
    // Create share URL
    const shareUrl = `${window.location.origin}/pin/${pinId}`;
    
    if (navigator.share) {
        navigator.share({
            title: pin.title,
            text: pin.description,
            url: shareUrl
        });
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
            showToast('Link copied to clipboard!');
        });
    }
}

function copyPinLink(pinId) {
    const shareUrl = `${window.location.origin}/pin/${pinId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Pin link copied!');
    });
}

function likePin(pinId) {
    const pin = mockPins.find(p => p.id === pinId);
    if (!pin) return;
    
    pin.likes += 1;
    showToast('Pin liked!');
}

// Save Modal
function openSaveModal(pin) {
    const modal = document.getElementById('save-modal');
    const collectionsList = document.getElementById('save-collections-list');
    
    collectionsList.innerHTML = '';
    
    mockCollections.forEach(collection => {
        const collectionElement = document.createElement('div');
        collectionElement.className = 'collection-item';
        collectionElement.innerHTML = `
            <div class="collection-preview-small">
                <i class="fas fa-folder"></i>
            </div>
            <div class="collection-item-info">
                <h3>${collection.name}</h3>
                <p>${collection.description}</p>
            </div>
        `;
        
        collectionElement.addEventListener('click', () => {
            collection.pins.push(pin.id);
            showToast(`Saved to ${collection.name}`);
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        collectionsList.appendChild(collectionElement);
    });
    
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
}

// Collections
function loadCollections() {
    const container = document.getElementById('collections-grid');
    container.innerHTML = '';
    
    mockCollections.forEach(collection => {
        const collectionElement = document.createElement('div');
        collectionElement.className = 'collection-card';
        collectionElement.innerHTML = `
            <div class="collection-preview">
                <i class="fas fa-folder"></i>
            </div>
            <div class="collection-info">
                <div class="collection-title">${collection.name}</div>
                <div class="collection-description">${collection.description}</div>
                <div class="collection-stats">${collection.pins.length} pins</div>
            </div>
        `;
        
        collectionElement.addEventListener('click', () => {
            openCollectionModal(collection);
        });
        
        container.appendChild(collectionElement);
    });
}

function openCollectionModal(collection) {
    // Implementation for viewing collection details
    showToast(`Opening ${collection.name} collection`);
}

function openCreateCollectionModal() {
    const modal = document.getElementById('collection-modal');
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
}

function createCollection() {
    const name = document.getElementById('collection-name').value.trim();
    const description = document.getElementById('collection-description').value.trim();
    const isPrivate = document.getElementById('collection-private').checked;
    
    if (!name) {
        showToast('Please enter a collection name', 'error');
        return;
    }
    
    const newCollection = {
        id: mockCollections.length + 1,
        name,
        description,
        pins: [],
        private: isPrivate,
        createdAt: new Date()
    };
    
    mockCollections.push(newCollection);
    loadCollections();
    closeModal('collection-modal');
    showToast('Collection created successfully!');
    
    // Reset form
    document.getElementById('collection-form').reset();
}

// Search
function performSearch() {
    const query = document.getElementById('search-input').value.trim();
    if (!query) return;
    
    searchQuery = query;
    showPage('search');
}

function loadSearchResults() {
    const container = document.getElementById('search-results');
    container.innerHTML = '';
    
    if (!searchQuery) {
        container.innerHTML = '<p>Enter a search term to find pins</p>';
        return;
    }
    
    // Filter pins based on search query
    const results = mockPins.filter(pin => 
        pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    if (results.length === 0) {
        container.innerHTML = '<p>No results found</p>';
        return;
    }
    
    const resultsGrid = document.createElement('div');
    resultsGrid.className = 'masonry-container';
    
    results.forEach(pin => {
        const pinElement = createPinCard(pin);
        resultsGrid.appendChild(pinElement);
    });
    
    container.appendChild(resultsGrid);
}

function searchByTag(tag) {
    document.getElementById('search-input').value = tag;
    searchQuery = tag;
    showPage('search');
}

// Search Suggestions
function showSearchSuggestions() {
    const suggestionsContainer = document.getElementById('search-suggestions');
    const query = document.getElementById('search-input').value.trim();
    
    if (!query) {
        suggestionsContainer.classList.remove('active');
        return;
    }
    
    // Mock suggestions
    const suggestions = [
        'aesthetic pink',
        'minimalist fashion',
        'travel inspiration',
        'quotes motivation',
        'web design',
        'coffee aesthetic'
    ].filter(suggestion => suggestion.includes(query.toLowerCase()));
    
    if (suggestions.length === 0) {
        suggestionsContainer.classList.remove('active');
        return;
    }
    
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'search-suggestion';
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener('click', () => {
            document.getElementById('search-input').value = suggestion;
            searchQuery = suggestion;
            showPage('search');
        });
        suggestionsContainer.appendChild(suggestionElement);
    });
    
    suggestionsContainer.classList.add('active');
}

// Upload
function initializeUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadDetails = document.querySelector('.upload-details');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFileUpload(e.dataTransfer.files[0]);
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
        }
    });
}

function handleFileUpload(file) {
    if (!file.type.startsWith('image/')) {
        showToast('Please select an image file', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        // Show image preview
        const uploadArea = document.getElementById('upload-area');
        uploadArea.innerHTML = `
            <img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
        `;
        
        // Show upload details
        document.querySelector('.upload-details').classList.add('active');
        
        // Load collections for selection
        loadCollectionsForUpload();
    };
    reader.readAsDataURL(file);
}

function loadCollectionsForUpload() {
    const select = document.getElementById('pin-collection');
    select.innerHTML = '<option value="">Choose a collection</option>';
    
    mockCollections.forEach(collection => {
        const option = document.createElement('option');
        option.value = collection.id;
        option.textContent = collection.name;
        select.appendChild(option);
    });
}

function uploadPin() {
    const title = document.getElementById('pin-title').value.trim();
    const description = document.getElementById('pin-description').value.trim();
    const tags = document.getElementById('pin-tags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
    const collectionId = document.getElementById('pin-collection').value;
    const sourceUrl = document.getElementById('pin-source').value.trim();
    
    if (!title) {
        showToast('Please enter a title', 'error');
        return;
    }
    
    // Create new pin
    const newPin = {
        id: mockPins.length + 1,
        title,
        description,
        image: generatePlaceholderImage(300, 400, '#f8b2c9'),
        author: { name: currentUser.name, avatar: currentUser.avatar },
        category: 'aesthetic',
        tags,
        likes: 0,
        comments: 0,
        saved: false,
        createdAt: new Date(),
        sourceUrl
    };
    
    mockPins.unshift(newPin);
    
    // Add to collection if selected
    if (collectionId) {
        const collection = mockCollections.find(c => c.id === parseInt(collectionId));
        if (collection) {
            collection.pins.push(newPin.id);
        }
    }
    
    showToast('Pin uploaded successfully!');
    showPage('home');
    
    // Reset form
    document.getElementById('upload-form').reset();
    document.querySelector('.upload-details').classList.remove('active');
    resetUploadArea();
}

function resetUploadArea() {
    const uploadArea = document.getElementById('upload-area');
    uploadArea.innerHTML = `
        <div class="upload-content">
            <i class="fas fa-cloud-upload-alt"></i>
            <h3>Choose a file or drag and drop it here</h3>
            <p>We recommend using high quality .jpg files less than 20MB</p>
        </div>
    `;
}

// Profile
function loadProfile() {
    const profileContent = document.getElementById('profile-content');
    const activeTab = document.querySelector('.profile-tabs .tab-btn.active').dataset.tab;
    
    switch (activeTab) {
        case 'pins':
            loadUserPins();
            break;
        case 'collections':
            loadUserCollections();
            break;
        case 'saved':
            loadSavedPins();
            break;
        case 'likes':
            loadLikedPins();
            break;
    }
}

function loadUserPins() {
    const container = document.getElementById('profile-content');
    container.innerHTML = '<div class="masonry-container" id="profile-pins"></div>';
    
    const userPins = mockPins.filter(pin => pin.author.name === currentUser.name);
    const pinsContainer = document.getElementById('profile-pins');
    
    userPins.forEach(pin => {
        const pinElement = createPinCard(pin);
        pinsContainer.appendChild(pinElement);
    });
}

function loadUserCollections() {
    const container = document.getElementById('profile-content');
    container.innerHTML = '<div class="collections-grid" id="profile-collections"></div>';
    
    const collectionsContainer = document.getElementById('profile-collections');
    
    mockCollections.forEach(collection => {
        const collectionElement = document.createElement('div');
        collectionElement.className = 'collection-card';
        collectionElement.innerHTML = `
            <div class="collection-preview">
                <i class="fas fa-folder"></i>
            </div>
            <div class="collection-info">
                <div class="collection-title">${collection.name}</div>
                <div class="collection-description">${collection.description}</div>
                <div class="collection-stats">${collection.pins.length} pins</div>
            </div>
        `;
        
        collectionsContainer.appendChild(collectionElement);
    });
}

function loadSavedPins() {
    const container = document.getElementById('profile-content');
    container.innerHTML = '<div class="masonry-container" id="saved-pins"></div>';
    
    const savedPins = mockPins.filter(pin => pin.saved);
    const pinsContainer = document.getElementById('saved-pins');
    
    savedPins.forEach(pin => {
        const pinElement = createPinCard(pin);
        pinsContainer.appendChild(pinElement);
    });
}

function loadLikedPins() {
    const container = document.getElementById('profile-content');
    container.innerHTML = '<div class="masonry-container" id="liked-pins"></div>';
    
    // Mock liked pins (would normally come from backend)
    const likedPins = mockPins.slice(0, 3);
    const pinsContainer = document.getElementById('liked-pins');
    
    likedPins.forEach(pin => {
        const pinElement = createPinCard(pin);
        pinsContainer.appendChild(pinElement);
    });
}

function switchProfileTab(tabName) {
    document.querySelectorAll('.profile-tabs .tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    loadProfile();
}

// Settings
function loadSettings() {
    // Load current settings
    document.getElementById('settings-username').value = currentUser.username;
    document.getElementById('settings-email').value = currentUser.email;
    document.getElementById('settings-bio').value = currentUser.bio;
    
    // Set theme toggle
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === currentTheme);
    });
}

function saveSettings() {
    const username = document.getElementById('settings-username').value.trim();
    const email = document.getElementById('settings-email').value.trim();
    const bio = document.getElementById('settings-bio').value.trim();
    
    if (!username || !email) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Update current user
    currentUser.username = username;
    currentUser.email = email;
    currentUser.bio = bio;
    
    showToast('Settings saved successfully!');
}

// Notifications
function loadNotifications() {
    const container = document.getElementById('notifications-list');
    container.innerHTML = '';
    
    mockNotifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification-item ${notification.read ? '' : 'unread'}`;
        notificationElement.innerHTML = `
            <img src="${notification.avatar}" alt="User" class="notification-avatar">
            <div class="notification-content">
                <div class="notification-text">${notification.text}</div>
                <div class="notification-time">${notification.time}</div>
            </div>
        `;
        
        notificationElement.addEventListener('click', () => {
            notification.read = true;
            notificationElement.classList.remove('unread');
            updateNotificationCount();
        });
        
        container.appendChild(notificationElement);
    });
}

function updateNotificationCount() {
    const unreadCount = mockNotifications.filter(n => !n.read).length;
    const countElement = document.querySelector('.notification-count');
    
    if (unreadCount > 0) {
        countElement.textContent = unreadCount;
        countElement.style.display = 'block';
    } else {
        countElement.style.display = 'none';
    }
}

// Explore
function loadExplore() {
    const container = document.getElementById('explore-content');
    const activeTab = document.querySelector('.explore-tabs .tab-btn.active').dataset.tab;
    
    switch (activeTab) {
        case 'trending':
            loadTrendingPins();
            break;
        case 'creators':
            loadTopCreators();
            break;
        case 'boards':
            loadFeaturedBoards();
            break;
    }
}

function loadTrendingPins() {
    const container = document.getElementById('explore-content');
    container.innerHTML = '<div class="masonry-container" id="trending-pins"></div>';
    
    const trendingPins = mockPins.sort((a, b) => b.likes - a.likes).slice(0, 12);
    const pinsContainer = document.getElementById('trending-pins');
    
    trendingPins.forEach(pin => {
        const pinElement = createPinCard(pin);
        pinsContainer.appendChild(pinElement);
    });
}

function loadTopCreators() {
    const container = document.getElementById('explore-content');
    container.innerHTML = '<div class="creators-grid" id="top-creators"></div>';
    
    // Mock top creators
    const creators = [
        { name: 'Sophie Chen', followers: 12500, avatar: generateProfileImage('#fde4e7') },
        { name: 'Alex Rivera', followers: 8900, avatar: generateProfileImage('#e8b4f5') },
        { name: 'Maya Patel', followers: 15200, avatar: generateProfileImage('#ffb6c1') },
        { name: 'David Kim', followers: 7800, avatar: generateProfileImage('#ffd0dc') }
    ];
    
    const creatorsContainer = document.getElementById('top-creators');
    creatorsContainer.style.display = 'grid';
    creatorsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    creatorsContainer.style.gap = '1rem';
    
    creators.forEach(creator => {
        const creatorElement = document.createElement('div');
        creatorElement.className = 'creator-card';
        creatorElement.style.cssText = `
            background: var(--surface-color);
            border-radius: var(--radius-md);
            padding: var(--spacing-lg);
            text-align: center;
            box-shadow: var(--shadow-light);
            transition: all var(--transition-medium);
        `;
        
        creatorElement.innerHTML = `
            <img src="${creator.avatar}" alt="${creator.name}" style="width: 60px; height: 60px; border-radius: 50%; margin-bottom: 1rem;">
            <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">${creator.name}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">${creator.followers.toLocaleString()} followers</p>
            <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Follow</button>
        `;
        
        creatorsContainer.appendChild(creatorElement);
    });
}

function loadFeaturedBoards() {
    const container = document.getElementById('explore-content');
    container.innerHTML = '<div class="collections-grid" id="featured-boards"></div>';
    
    const boardsContainer = document.getElementById('featured-boards');
    
    mockCollections.forEach(collection => {
        const boardElement = document.createElement('div');
        boardElement.className = 'collection-card';
        boardElement.innerHTML = `
            <div class="collection-preview">
                <i class="fas fa-star"></i>
            </div>
            <div class="collection-info">
                <div class="collection-title">${collection.name}</div>
                <div class="collection-description">${collection.description}</div>
                <div class="collection-stats">${collection.pins.length} pins • Featured</div>
            </div>
        `;
        
        boardsContainer.appendChild(boardElement);
    });
}

function switchExploreTab(tabName) {
    document.querySelectorAll('.explore-tabs .tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    loadExplore();
}

// Modal Management
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.classList.remove('no-scroll');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.classList.add('no-scroll');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    pins = [...mockPins];
    collections = [...mockCollections];
    notifications = [...mockNotifications];
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
        const themeIcon = document.querySelector('#theme-toggle i');
        themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Navigation event listeners
    document.querySelectorAll('[data-page]').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            const page = element.dataset.page;
            if (page) showPage(page);
        });
    });
    
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Search
    document.getElementById('search-input').addEventListener('input', showSearchSuggestions);
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-search')) {
            document.getElementById('search-suggestions').classList.remove('active');
        }
    });
    
    // Profile dropdown
    document.getElementById('profile-avatar').addEventListener('click', () => {
        document.getElementById('profile-dropdown').classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.profile-menu')) {
            document.getElementById('profile-dropdown').classList.remove('active');
        }
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            if (category) filterPins(category);
        });
    });
    
    // Load more button
    document.getElementById('load-more-btn').addEventListener('click', loadMore);
    
    // Upload functionality
    initializeUpload();
    document.getElementById('upload-form').addEventListener('submit', (e) => {
        e.preventDefault();
        uploadPin();
    });
    document.getElementById('cancel-upload').addEventListener('click', () => {
        showPage('home');
    });
    
    // Collection creation
    document.getElementById('create-collection-btn').addEventListener('click', openCreateCollectionModal);
    document.getElementById('collection-form').addEventListener('submit', (e) => {
        e.preventDefault();
        createCollection();
    });
    
    // Profile tabs
    document.querySelectorAll('.profile-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            if (tab) switchProfileTab(tab);
        });
    });
    
    // Explore tabs
    document.querySelectorAll('.explore-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            if (tab) switchExploreTab(tab);
        });
    });
    
    // Settings
    document.querySelector('.settings-section .btn-primary').addEventListener('click', saveSettings);
    
    // Theme buttons in settings
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            if (theme !== currentTheme) {
                toggleTheme();
            }
        });
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Pin modal actions
    document.getElementById('save-pin-btn').addEventListener('click', () => {
        if (currentPin) savePin(currentPin.id);
    });
    
    document.getElementById('share-pin-btn').addEventListener('click', () => {
        if (currentPin) sharePin(currentPin.id);
    });
    
    document.getElementById('copy-pin-btn').addEventListener('click', () => {
        if (currentPin) copyPinLink(currentPin.id);
    });
    
    // Comments
    document.getElementById('add-comment-btn').addEventListener('click', addComment);
    document.getElementById('comment-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addComment();
        }
    });
    
    // Notifications
    document.getElementById('notifications-btn').addEventListener('click', () => {
        loadNotifications();
        openModal('notifications-modal');
    });
    
    // Cancel buttons
    document.getElementById('cancel-collection').addEventListener('click', () => {
        closeModal('collection-modal');
    });
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Initialize page
    showLoading();
    setTimeout(() => {
        hideLoading();
        showPage('home');
        updateNotificationCount();
    }, 1000);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input').focus();
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Infinite scroll (optional enhancement)
let isInfiniteScrollEnabled = true;

window.addEventListener('scroll', () => {
    if (!isInfiniteScrollEnabled || isLoading || currentPage !== 'home') return;
    
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition >= documentHeight - 1000) {
        loadMore();
    }
});

// Touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Only process horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal && deltaX > 0) {
            // Swipe right to close modal
            activeModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }
});

// Service Worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    showToast('Something went wrong. Please try again.', 'error');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    showToast('Something went wrong. Please try again.', 'error');
});