// Get elements
const passwordInput = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-btn');
const mainContent = document.querySelector('main');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

// Set the correct password
const correctPassword = 'kim123'; // Change this to your desired password

// Check if user is already logged in
if (localStorage.getItem('loggedIn') === 'true') {
    mainContent.style.display = 'block';
    loginForm.style.display = 'none';
}

// Handle login
submitBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    const enteredPassword = passwordInput.value;

    if (enteredPassword === correctPassword) {
        localStorage.setItem('loggedIn', 'true'); // Set login status
        mainContent.style.display = 'block'; // Show main content
        loginForm.style.display = 'none'; // Hide login form
    } else {
        alert('Incorrect password. Please try again.');
    }
});

// Handle logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedIn'); // Remove login status
    mainContent.style.display = 'none'; // Hide main content
    loginForm.style.display = 'block'; // Show login form
});

// Select all file upload forms
const fileUploadForms = document.querySelectorAll('.file-upload-form');

// Loop through each form and add an event listener
fileUploadForms.forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const fileInput = this.querySelector('input[type="file"]');
        const uploadStatus = this.querySelector('.upload-status');

        // Check if a file is selected
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            uploadStatus.textContent = File "${fileName}" uploaded successfully!; // Fixed string interpolation syntax
            uploadStatus.style.color = 'green';

            // Clear the file input after upload
            fileInput.value = '';
        } else {
            uploadStatus.textContent = 'Please select a file to upload.';
            uploadStatus.style.color = 'red';
        }
    });
});