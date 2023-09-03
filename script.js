
// Function to show the loading spinner and hide the content
function showLoadingSpinner() {
    const loadingSpinner = document.getElementById("loading-spinner");
    const currentImageContainer = document.getElementById("current-image-container");

    loadingSpinner.style.display = "block"; // Show the loading spinner
    currentImageContainer.style.display = "none"; // Hide the content
}

// Function to hide the loading spinner and show the content
function hideLoadingSpinner() {
    const loadingSpinner = document.getElementById("loading-spinner");
    const currentImageContainer = document.getElementById("current-image-container");

    loadingSpinner.style.display = "none"; // Hide the loading spinner
    currentImageContainer.style.display = "block"; // Show the content
}

// Function to fetch and display the current image of the day
async function getCurrentImageOfTheDay() {
    try {
        // Show the loading spinner and hide the content
        showLoadingSpinner();

        const currentDate = new Date().toISOString().split("T")[0];
        const apiKey = "Tu2mqjRB24uSFcC6IV5DKhSz8pbe1H90CoseC8ix"; 

        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const currentImageContainer = document.getElementById("current-image-container");
        currentImageContainer.innerHTML = `
            <h2>${data.title}</h2>
            <p>Date: ${data.date}</p>
            <img src="${data.url}" alt="${data.title}" />
            <p>${data.explanation}</p>
        `;

    } catch (error) {
        console.error(error);
    } finally {
        // Hide the loading spinner and show the content
        hideLoadingSpinner();
    }
}

// Function to fetch and display the image of the day for a selected date
async function getImageOfTheDay(date) {
    try {
        // Show the loading spinner and hide the content
        showLoadingSpinner();

        const apiKey = "Tu2mqjRB24uSFcC6IV5DKhSz8pbe1H90CoseC8ix";  

        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const currentImageContainer = document.getElementById("current-image-container");
        currentImageContainer.innerHTML = `
            <h2>${data.title}</h2>
            <p>Date: ${data.date}</p>
            <img src="${data.url}" alt="${data.title}" />
            <p>${data.explanation}</p>
        `;

        saveSearch(date);

    } catch (error) {
        console.error(error);
    } finally {
        // Hide the loading spinner and show the content
        hideLoadingSpinner();
    }
}



// Function to save a date to local storage
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
    addSearchToHistory(date);
}

// Function to display search history in the UI
function addSearchToHistory(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    const searchHistoryList = document.getElementById("search-history");
    const listItem = document.createElement("li");
    listItem.textContent = date;
    listItem.addEventListener("click", function() {
        getImageOfTheDay(date);
    });
    searchHistoryList.appendChild(listItem);
}

// Initial call to fetch and display the current image of the day
getCurrentImageOfTheDay();

// Handle form submission
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const searchInput = document.getElementById("search-input");
    const selectedDate = searchInput.value;
    if (selectedDate) {
        getImageOfTheDay(selectedDate);
        searchInput.value = ""; // Clear the input field after submission
    }
});



// ******** Implementing white to dark mode and dark to white Mode  *********

// Function to toggle between dark and light modes
function toggleDarkMode() {
    const body = document.body;
    const toggleIcon = document.querySelector(".toggle-icon i");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        toggleIcon.classList.remove("fa-sun");
        toggleIcon.classList.add("fa-moon");
    } else {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        toggleIcon.classList.remove("fa-moon");
        toggleIcon.classList.add("fa-sun");
    }
}

// Handle dark mode toggle icon click
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", toggleDarkMode);
