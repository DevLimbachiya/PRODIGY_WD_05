const apiKey = "b190a0605344cc4f3af08d0dd473dd25";

async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) return;

    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const weatherData = await weatherResponse.json();
    displayWeather(weatherData);

    const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const forecastData = await forecastResponse.json();
    displayForecast(forecastData);
}

function displayWeather(data) {
    if (data.cod !== 200) {
        document.getElementById("weather-info").innerHTML = "City not found.";
        return;
    }
    document.getElementById("temp-div").innerHTML = `<p>${data.main.temp}°C</p>`;
    document.getElementById("weather-info").innerHTML = `
        <p>${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("weather-icon").src = iconUrl;
    document.getElementById("weather-icon").style.display = "block";
}

function displayForecast(data) {
    const forecastContainer = document.getElementById("hourly-forecast");
    forecastContainer.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        const forecast = data.list[i * 8];
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        const item = `
            <div class="hourly-item">
                <p>${new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <img src="${iconUrl}" alt="Weather icon">
                <p>${forecast.main.temp}°C</p>
            </div>
        `;
        forecastContainer.innerHTML += item;
    }
}
