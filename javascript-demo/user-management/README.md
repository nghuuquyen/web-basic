# 👥 User Management System

A simple web application that demonstrates how to fetch data from an API, display it in a table, search through it, and show detailed information in a modal. This project is perfect for learning JavaScript fundamentals including DOM manipulation, async/await, and event handling.

## 🎯 Learning Objectives

This project helps you understand:
- How to fetch data from an external API using `fetch()`
- Working with async/await for asynchronous operations
- DOM manipulation and element creation
- Event handling (search, click, keyboard events)
- Array methods for filtering data
- Creating modal dialogs
- Error handling in web applications
- Responsive design with CSS

## 🌟 Features

1. **Fetch Users from API**: Load user data from JSONPlaceholder API
2. **Display in Table**: Show users in a clean, organized table
3. **Real-time Search**: Filter users as you type in the search box
4. **View Details**: Click on any user to see their complete information in a modal
5. **Refresh Data**: Reload users from the API with a button click
6. **Error Handling**: Gracefully handle network errors with user-friendly messages
7. **Loading Indicator**: Show a spinner while data is being fetched

## 📁 Project Structure

```
user-management/
├── index.html      # HTML structure and layout
├── style.css       # Styling and design
├── script.js       # JavaScript logic and functionality
└── README.md       # This file
```

## 🚀 How to Run

1. Simply open `index.html` in your web browser
2. No server or build tools required!
3. The app will automatically fetch users from the API and display them

## 🔍 Code Explanation

### 1. HTML Structure (`index.html`)

The HTML file contains:
- **Header**: Title and description
- **Controls Section**: Search input and refresh button
- **Loading Indicator**: Shows while fetching data
- **Error Message**: Displays when something goes wrong
- **Table**: Displays the list of users
- **Modal**: Shows detailed user information

### 2. JavaScript Logic (`script.js`)

#### Global Variables
```javascript
const API_URL = 'https://jsonplaceholder.typicode.com/users';
let allUsers = [];      // Stores all users from API
let filteredUsers = [];  // Stores filtered search results
```

#### Key Functions

**`fetchUsers()`**
- Fetches user data from the API using `fetch()`
- Uses `async/await` to handle the asynchronous operation
- Displays loading indicator during fetch
- Handles errors with try/catch
- Updates the UI with fetched data

**How it works:**
```javascript
async function fetchUsers() {
    try {
        showLoading(true);                    // Show spinner
        const response = await fetch(API_URL); // Fetch data
        const data = await response.json();    // Parse JSON
        allUsers = data;                      // Store data
        renderUsers(filteredUsers);           // Display in table
    } catch (error) {
        showError(`Failed to load users`);   // Handle errors
    }
}
```

**`renderUsers(users)`**
- Takes an array of users as input
- Creates HTML table rows dynamically using `map()`
- Inserts the HTML into the table body
- Shows "no results" message if array is empty

**How it works:**
```javascript
function renderUsers(users) {
    usersTableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td>${user.company.name}</td>
            <td>${user.address.city}</td>
            <td>
                <button onclick="showUserDetails(${user.id})">
                    View Details
                </button>
            </td>
        </tr>
    `).join('');
}
```

**`handleSearch(event)`**
- Listens to input changes in the search box
- Filters the `allUsers` array based on search term
- Uses `filter()` and `includes()` to match search criteria
- Re-renders the table with filtered results

**How it works:**
```javascript
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    filteredUsers = allUsers.filter(user => {
        return (
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.company.name.toLowerCase().includes(searchTerm) ||
            user.address.city.toLowerCase().includes(searchTerm)
        );
    });
    
    renderUsers(filteredUsers);
}
```

**`showUserDetails(userId)`**
- Finds the user by ID using `find()`
- Creates detailed HTML with all user information
- Displays the modal dialog
- Shows personal info, address, and company details

**Modal Control Functions**
- `closeModal()`: Hides the modal
- Modal can be closed by:
  - Clicking the X button
  - Clicking outside the modal
  - Pressing the Escape key

**Helper Functions**
- `showLoading()`: Shows/hides loading spinner
- `showError()`: Displays error messages
- `hideError()`: Hides error messages
- `updateResultsCount()`: Updates the count of displayed users

#### Event Listeners Setup

The app sets up event listeners when the page loads:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();              // Load users on page load
    setupEventListeners();     // Attach all event listeners
});

function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    refreshBtn.addEventListener('click', fetchUsers);
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeModal();
    });
}
```

### 3. Styling (`style.css`)

The CSS provides:
- Modern gradient background
- Responsive table design
- Smooth animations and transitions
- Modal overlay effect
- Loading spinner animation
- Mobile-friendly layout

## 🧪 Try These Exercises

To practice and extend your learning:

1. **Add Sorting**: Add the ability to sort users by name, email, or company
2. **Add Pagination**: Display 10 users per page with next/previous buttons
3. **Edit Users**: Add functionality to edit user information (client-side only)
4. **Delete Users**: Add a delete button to remove users from the list
5. **Add New User**: Create a form to add new users to the list
6. **Local Storage**: Save the user list to localStorage so it persists on refresh
7. **Different API**: Try using a different API like [reqres.in](https://reqres.in/)
8. **Filter by Company**: Add a dropdown to filter users by company name
9. **Export to CSV**: Add a button to download the user list as a CSV file
10. **Dark Mode**: Add a toggle for dark/light theme

## 🔗 API Reference

This project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free fake API for testing and prototyping.

**Endpoint Used**: `https://jsonplaceholder.typicode.com/users`

**Sample User Object**:
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

## 📚 Key JavaScript Concepts Used

### 1. **Async/Await**
```javascript
async function fetchUsers() {
    const response = await fetch(API_URL);
    const data = await response.json();
}
```

### 2. **Array Methods**
- `map()`: Transform array into HTML elements
- `filter()`: Search and filter users
- `find()`: Find a specific user by ID
- `join()`: Combine array of strings into single string

### 3. **Template Literals**
```javascript
const html = `<div>${user.name}</div>`;
```

### 4. **DOM Manipulation**
```javascript
element.innerHTML = ...
element.style.display = ...
element.addEventListener('click', handler)
```

### 5. **Error Handling**
```javascript
try {
    // Code that might fail
} catch (error) {
    // Handle the error
}
```

## 🎨 CSS Features

- **Flexbox**: For responsive layouts
- **Grid**: For detail sections in modal
- **CSS Animations**: Loading spinner and transitions
- **Linear Gradients**: Beautiful background colors
- **Box Shadows**: For depth and elevation
- **Media Queries**: (Can be added for mobile responsiveness)

## 💡 Best Practices Demonstrated

1. **Separation of Concerns**: HTML for structure, CSS for style, JS for behavior
2. **DRY Principle**: Reusable functions like `showLoading()`, `renderUsers()`
3. **Error Handling**: Graceful degradation with try/catch
4. **User Feedback**: Loading states, error messages, result counts
5. **Accessibility**: Keyboard support (Escape to close modal)
6. **Clean Code**: Meaningful variable names, comments, organized structure

## 🐛 Common Issues and Solutions

**Problem**: CORS errors when fetching from API
- **Solution**: JSONPlaceholder allows cross-origin requests, but if using a different API, you may need to use a CORS proxy or backend server

**Problem**: Modal doesn't close
- **Solution**: Check that event listeners are properly attached to close button and window

**Problem**: Search doesn't work
- **Solution**: Ensure `toLowerCase()` is used for case-insensitive matching

**Problem**: Users don't appear
- **Solution**: Check browser console for errors, verify API is accessible

## 📖 Additional Resources

- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN: Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JSONPlaceholder Guide](https://jsonplaceholder.typicode.com/guide/)

## 🎓 Next Steps

After mastering this project, you can:
1. Learn about state management (React, Vue)
2. Explore backend development (Node.js, Express)
3. Build a real API with a database
4. Learn about authentication and authorization
5. Deploy your application to the web

---

**Happy Coding! 🚀**
