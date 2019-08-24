console.log('working..');
var form = document.querySelector('#search-form');
var weatherContainer = document.querySelector('#weather-container')
var input = document.querySelector('#search-input')

console.log(form, weatherContainer)

function checkWeather(e) {
    e.preventDefault()

    var searchText = input.value;
    // console.log(searchText)

    var api = `https://community-open-weather-map.p.rapidapi.com/weather?q=${searchText}`

    fetch(api, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "0de5ccfe0bmsh961687a5f8c9383p10e2ddjsn4b65482538e8"
        }
    })
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => handleError(error))

    form.reset()

}


function displayWeather(data) {
    // console.log(data);

    weatherContainer.innerHTML = ''  // clearing the weatherContainer

    var htmlContent = ''

    if (data) {
        console.log(data)
        if (data.main) {

            // console.log(data)

            var city = data.name;
            var main = data.main;
            var weather = data.weather;
            var wind = data.wind;

            // console.log(cityName, main, weather, wind)
            console.log('city', city)
            console.log('mainInfo', main)
            console.log('weather', weather)
            console.log('wind', wind)

            htmlContent =
                " <div class='jumbotron'> \n"
                + "<h2>" + city.toUpperCase() + "</h2> \n"
                + "<div class='weather'> \n"
                + "<p>There will be <strong>" + weather[0].description + " in "
                + city + " today </strong></p> \n"
                + "<p>wind blowing at the speed of <strong>" + wind.speed + ", " + (wind.deg ? wind.deg : '') + "</strong></p>"
                + "<p> \n"
                + "Temperature at " + main.temp + "F" + "<br> \n"
                + "Pressure at " + main.pressure + " \n"
                + "</p> \n"
                + "</div> \n"
                + "<div>"

        } else {
            htmlContent = "<p>sorry... " + data.message + " 😦😦😦 </p>"
        }
    }

    weatherContainer.innerHTML = htmlContent;
}

function handleError(error) {
    weatherContainer.innerHTML = "<p>we couldn't check weather at this time, please check connection and try again later. 😦😦😦</p>"
    console.log(error)
}


form.addEventListener('submit', checkWeather)

