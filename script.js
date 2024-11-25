// OpenWeather API Key and URL
const apiKey = "5ca5a24ae71e2ff3a3bbdb5fcf1e1a0f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM Elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to fetch and display weather data
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        // Handle invalid city input
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        // Parse JSON response
        const data = await response.json();

        // Populate the weather details
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Update weather icon based on condition
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/cloud-removebg-preview.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/sun-removebg-preview.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/raining cloud.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/Drizzle-removebg-preview.png";
        } else {
            weatherIcon.src = "images/default-weather.png"; // Fallback for other weather conditions
        }

        // Show weather data and hide error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Add click event listener to the search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
     } // Check weather if city input is not empty
});
