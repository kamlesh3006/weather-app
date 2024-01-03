const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const todaysWeather = document.querySelector(".todaysWeather");
const apiKey = "a3119791f73bef8f6770d1ff48a96fb1";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        } catch(error) {
            displayError(error);
        }
    } else{
        displayError("Enter a City name!");
    }
})

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        todaysWeather.textContent = "";
        throw new Error("Could not get Weather data.");
    }
    return await response.json();
}

function displayWeatherData(data) {
    console.log(data);
    const cityName = data.city.name;
    const tempToday = (data.list[0].main.temp - 273.15).toFixed(2);
    const humidityToday = data.list[0].main.humidity;
    const windToday = data.list[0].wind.speed;
    const descToday = data.list[0].weather[0].description;
    const weatherId = data.list[0].weather[0].id;

    todaysWeather.textContent = "";
    todaysWeather.style.display = "flex";
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const windDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const iconDisplay = document.createElement("p");

    cityDisplay.textContent = cityName.toUpperCase();
    cityDisplay.style.textDecoration = "underline";
    cityDisplay.style.color = "black";
    iconDisplay.textContent = weatherEmoji(weatherId);
    tempDisplay.textContent = "Temperature : " + tempToday + "°C";
    tempDisplay.style.color = "black";
    humidityDisplay.textContent = "Humidity : " + humidityToday + "%";
    humidityDisplay.style.color = "black";
    windDisplay.textContent = "Wind speed : " + windToday + "m/s";
    windDisplay.style.color = "black";
    descDisplay.textContent = descToday;
    descDisplay.style.color = "black";
    iconDisplay.classList.add("iconDisplay");

    todaysWeather.appendChild(cityDisplay);
    todaysWeather.appendChild(iconDisplay);
    todaysWeather.appendChild(tempDisplay);
    todaysWeather.appendChild(humidityDisplay);
    todaysWeather.appendChild(windDisplay);
    todaysWeather.appendChild(descDisplay);
    console.log(weatherId);
}

function weatherEmoji(weatherId) {
    if(weatherId === 800){
        return "☀️";
    } else if(weatherId >= 200 && weatherId < 300) {
        return "⛈️";
    } else if(weatherId >= 300 && weatherId < 400) {
        return "🌧️";
    } else if(weatherId >= 500 && weatherId < 600) {
        return "🌧️";
    } else if(weatherId >= 600 && weatherId < 700) {
        return "❄️";
    } else if(weatherId >= 700 && weatherId < 800) {
        return "🌫️";
    } else if(weatherId >= 801 && weatherId < 810) {
        return "☁️";
    }
    return "☀️";
}

function displayError(msg) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = msg;
    errorMessage.classList.add("todaysWeather");
    todaysWeather.style.display ="flex";
    todaysWeather.appendChild(errorMessage);
}