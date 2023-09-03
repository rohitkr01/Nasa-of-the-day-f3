// Function to fetch and display the current image of the day
async function getCurrentImageOfTheDay() {
    try {
        const currentDate = new Date().toISOString().split("T")[0];
        const apiKey = "Tu2mqjRB24uSFcC6IV5DKhSz8pbe1H90CoseC8ix"; // Replace with your actual API key
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
    }
}

// Function to fetch and display the image of the day for a selected date
async function getImageOfTheDay(date) {
    try {
        const apiKey = "Tu2mqjRB24uSFcC6IV5DKhSz8pbe1H90CoseC8ix"; // Replace with your actual API key
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