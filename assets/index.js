const forecast = document.getElementById('forecast');
const searchButton = document.getElementById("searchButton");
const searchBar = document.getElementById('searchBar');
const searchHistory = document.getElementById('searchHistory')

searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    const query = searchBar.value.trim();
    if (query !== "") {
        getWeather(query)
    } else {
        alert("Please enter a city")
    }
})

function getWeather(query) {
    const apiKey = 'b6549afb1f5e06e23ab640064bd6dd7e';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=imperial&cnt=6`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        })

        .then(data => {
            if (data.cod === '404') {
                displayError('Enter a valid City');
                return;
            }
            displayWeather(data);
            addToSearchHistory(query);
        })
}

function displayWeather(data) {
    clearContent(forecast)

    var cityName = data.city.name;
    var date = data.list[0].dt_txt;
    var icon = data.list[0].weather[0].icon;
    var temperature = data.list[0].main.temp + 'F';
    var humidity = data.list[0].main.humidity + '%';
    var windSpeed = data.list[0].wind.speed + 'mph';

    const currentWeatherContainer = document.createElement('div');
    currentWeatherContainer.innerHTML = `
        <h2>${cityName}</h2>
        <h3>${date}</h3>
        <img src="http://openweathermap.org/img/w/${icon}.png"/>
        <p>Temperature: ${temperature}</p>
        <p>Humidity: ${humidity}</p>
        <p>Wind Speed: ${windSpeed}</p>`;
    forecast.appendChild(currentWeatherContainer);

    displayFutureForecast(data);
}

function displayFutureForecast(data) {
    clearContent(document.getElementById('futureForecast'));
    const futureForecastContainer = document.getElementById('futureForecast');


    for (let i = 1; i < data.list.length; i++) {
        const forecast = data.list[i];
        const icon = forecast.weather[0].icon;
        const temperature = forecast.main.temp + 'F';
        const humidity = forecast.main.humidity + '%';
        const windSpeed = forecast.wind.speed + 'mph';

        const forecastContainer = document.createElement('div');
        forecastContainer.innerHTML = `
            <img src="http://openweathermap.org/img/w/${icon}.png"/>
            <p>Temperature: ${temperature}</p>
            <p>Humidity: ${humidity}</p>
            <p>Wind Speed: ${windSpeed}</p>`;
        futureForecastContainer.appendChild(forecastContainer);
    }
}

function clearContent(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function addToSearchHistory(query) {
    const searchItem = document.createElement('div');
    searchItem.textContent = query;
    searchHistory.appendChild(searchItem);
}
