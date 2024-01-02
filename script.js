const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const todaysWeather = document.querySelector(".todaysWeather");
const apiKey = "a3119791f73bef8f6770d1ff48a96fb1";

weatherForm.addEventListener("submit", event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city){

    } else{
        displayError("Enter a City name!");
    }
})

function displayError(msg) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = msg;
    errorMessage.classList.add("todaysWeather");
    todaysWeather.style.display ="flex";
    todaysWeather.appendChild(errorMessage);
}