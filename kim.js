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

// Get elements for file upload and folder management
const form = document.getElementById("upload-form");
const fileInput = document.getElementById("file-input");
const uploadedFilesContainer = document.getElementById("uploaded-files");
const loadingIndicator = document.getElementById("loading");
const folderSelect = document.getElementById("folder-select");
const createFolderBtn = document.getElementById("create-folder-btn");
const folderNameInput = document.getElementById("folder-name");

// Object to hold created folders and their files
let folders = {};

// Handle folder creation
createFolderBtn.addEventListener("click", () => {
    const folderName = folderNameInput.value.trim();
    
    if (folderName && !folders[folderName]) {
        folders[folderName] = []; // Initialize an array for files in this folder
        
        // Update dropdown
        const option = document.createElement("option");
        option.value = folderName;
        option.textContent = folderName;
        folderSelect.appendChild(option);
        
        // Clear input field
        folderNameInput.value = '';
    } else {
        alert('Please enter a valid and unique folder name.');
    }
});

// Handle file upload
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const file = fileInput.files[0];
    const selectedFolder = folderSelect.value; // Get selected folder

    if (!selectedFolder) {
        alert('Please select a folder or create one before uploading.');
        return;
    }

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    loadingIndicator.style.display = "block"; // Show loading indicator

    // Simulate an upload delay
    setTimeout(() => {
        const fileItem = { name: file.name, url: URL.createObjectURL(file) };
        
        // Store the uploaded file in the corresponding folder array
        folders[selectedFolder].push(fileItem);

        // Display files for the selected folder
        displayFiles(selectedFolder);

        loadingIndicator.style.display = "none"; // Hide loading indicator
        fileInput.value = ""; // Clear file input
    }, 1000); // Simulate a 1-second upload delay
});

// Function to display files for the selected folder
function displayFiles(folder) {
    uploadedFilesContainer.innerHTML = ''; // Clear previous files
    
    if (folders[folder].length > 0) {
        folders[folder].forEach(file => {
            const fileItem = document.createElement("div");
            fileItem.classList.add("file-item");

            const fileNameDisplay = document.createElement("p");
            fileNameDisplay.textContent = file.name;

            const previewLink = document.createElement("a");
            previewLink.href = file.url;
            previewLink.textContent = "View";
            previewLink.target="_blank";  // Open in new tab

            const removeBtnDisplay = document.createElement("button");
            removeBtnDisplay.classList.add("remove-btn");
            removeBtnDisplay.innerHTML = "&times;";
            
            removeBtnDisplay.onclick = () => {
                uploadedFilesContainer.removeChild(fileItem);
                folders[folder] = folders[folder].filter(f => f.name !== file.name);
                displayFiles(folder); // Refresh displayed files for this folder
                URL.revokeObjectURL(file.url); // Release the object URL
            };

            fileItem.appendChild(fileNameDisplay);
            fileItem.appendChild(previewLink);
            fileItem.appendChild(removeBtnDisplay);
            uploadedFilesContainer.appendChild(fileItem);
        });
    } else {
        uploadedFilesContainer.innerHTML = '<p>No files uploaded in this folder.</p>';
    }
}

// Update displayed files when the selected folder changes
folderSelect.addEventListener('change', (event) => {
    const selectedFolder = event.target.value;
    
    if (selectedFolder) {
        displayFiles(selectedFolder); // Display files for the newly selected folder
    } else {
        uploadedFilesContainer.innerHTML = '<p>Select a folder to view its files.</p>'; // Clear displayed files if no folder is selected
    }
});