document.querySelector('button').addEventListener('click', () => {
    const city = document.querySelector('input').value;
    if (city) {
        checkWeather(city);
    }
});

async function checkWeather(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherIcon = document.querySelector(".weather-icon");
        const condition = data.weather[0].main;

        if (condition === "Clouds") weatherIcon.src = "images/cloud-removebg-preview.png";
        else if (condition === "Clear") weatherIcon.src = "images/sun-removebg-preview.png";
        else if (condition === "Rain") weatherIcon.src = "images/raining cloud.png";
        else if (condition === "Drizzle") weatherIcon.src = "images/Drizzle-removebg-preview.png";
        else weatherIcon.src = "images/default-weather.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
