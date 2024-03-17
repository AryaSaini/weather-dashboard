const forecast = document.getElementById('forecast');
const searchButton = document.getElementById("searchButton");
const searchBar = document.getElementById('searchBar');
const futureForecast = document.getElementById('futureForecast')

// document.getElementById('searchButton').addEventListener('click', function () {
//     var query = document.getElementById('searchBar').value;
//     getWeather(query)
// })

function getWeather(query) {
    
    query = query || document.getElementById("searchBar").value;
    localStorage.setItem("lastSearch", query)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=b6549afb1f5e06e23ab640064bd6dd7e&units=imperial&cnt=5`)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        })
        .then(function (data) {
            var cityName = data.city.name;
            var date = data.list[0].dt_txt;
            var icon = data.list[0].weather[0].icon;
            var temperature = data.list[0].main.temp + 'F';
            var humidity = data.list[0].main.humidity + '%';
            var windSpeed = data.list[0].wind.speed + 'mph';
            console.log(`http://openweathermap.org/img/w/${icon}.png`)

            var currentWeather = document.createElement('div');
            currentWeather.innerHTML = `
                <h2> ${cityName}<h2>
                <h3>${date}<h3>
                <img src="http://openweathermap.org/img/w/${icon}.png"/>
                <p>Temperature:${temperature}<p>
                <p>Humidity:${humidity}<p>
                <p>Wind Speed:${windSpeed}<p>`;
            forecast.appendChild(currentWeather);

            var futureForecast = document.getElementById('futureForecast')

            console.log(data)
            for (var i = 1; i < data.list.length; i++) {
                var icon = data.list[i].weather[0].icon;
                var temperature = data.list[i].main.temp + 'F';
                var humidity = data.list[i].main.humidity + '%';
                var windSpeed = data.list[i].wind.speed + 'mph';

                var forecastContainer = document.createElement('div')
                forecastContainer.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png"/>
                <p>Temperature:${temperature}<p>
                <p>Humidity:${humidity}<p>
                <p>Wind Speed:${windSpeed}<p>`;

                console.log(forecastContainer);


                futureForecast.appendChild(forecastContainer);
            }
        }
        )
}

searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    const query = searchBar.value
})