window.onload = displayLocationBasedWeather;

const api = {
    appId: "a0d5b5ca2d0cf55c0353ea80af19ecea",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
}


// Execute a function when the user releases a key on the keyboard
const search = document.getElementById("search-box")
search.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        getResult(search.value)
    }
});

function getResult(query) {
    let url;
    console.log(arguments.length)
    if (arguments.length == 1)
        url = `${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.appId}`;
    else
        url = `${api.baseUrl}weather?lat=${arguments[0]}&lon=${arguments[1]}&units=metric&APPID=${api.appId}`;

    // api.openweathermap.org/data/2.5/weather?q=London
    fetch(url)
        .then(response => response.json())
        .then(displayWeather);
}


function displayWeather(weather) {
    console.log(weather);
    if (weather.cod != 200)
        alert(weather.message);
    else {
        const city = document.querySelectorAll('.city');
        city.forEach(element => {
            element.innerText = `${weather.name},${weather.sys.country}`;
        });
    
    
        let currentDate = new Date();
        document.querySelector('.date').innerText = dateBuilder(currentDate);
    
        document.querySelector('.temp').innerText = `${Math.round(weather.main.temp)} °C`;
    
        document.querySelector('.weather-des').innerText = `${weather.weather[0].main}`;
    
        document.querySelector('.hi-low').innerText = `${weather.main.temp_min} °C / ${weather.main.temp_max} °C `;
    
    
        document.querySelector(".coord").innerText = `Latitude: ${weather.coord.lat.toFixed(2)} , Longitude: ${weather.coord.lon.toFixed(2)}`;
        document.querySelector('.humidity').innerText = `Humidity: ${weather.main.humidity}`;
        document.querySelector('.pressure').innerText = `Pressure: ${weather.main.pressure}`;
        document.querySelector('.des').innerText = `Weather Description: ${weather.weather[0].description}`;
        document.querySelector('.wind').innerText = `Wind Speed: ${weather.wind.speed}`;
    }

}


function dateBuilder(d) {
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    day = days[d.getDay()];
    date = d.getDate();
    month = months[d.getMonth()];
    year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


function getUserLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getResult(lat, lon)
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}

}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}



function displayLocationBasedWeather() {
    // var x = document.getElementById("demo");
    getResult('Dhaka')
    getUserLocation();
}