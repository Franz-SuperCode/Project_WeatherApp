// fetch("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=e43a999eb14f82488295ed959ce5f7cd")
//     // then kriegt eine callback funktion übergeben: then(function)
//     .then((response) => response.json())
//     // gibt wieder ein promise zurück
//     .then((data) => {
//         console.log(data);

//     })


let city = "london";
let key = "e43a999eb14f82488295ed959ce5f7cd";
let icon;

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    // then kriegt eine callback funktion übergeben: then(function)
    .then((response) => response.json())
    // gibt wieder ein promise zurück
    .then((data) => {
        console.log(data);


        let cityName = data.name;
        console.log(cityName);

        let temp = data.main.temp;
        console.log(temp - 273.15);

        //Wetter Icon-ID holen
        let iconID = data.weather[0].icon;
        console.log(iconID);
        //Diese URL dynamisch mit der geholten iconID
        icon = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
        let newImg = document.createElement("img");
        newImg.src = icon;
        document.body.appendChild(newImg);

        let unix_timestamp = data.dt;
        let time = convertFromUnixToTime(unix_timestamp)
        console.log(time);

        //Neues Array mit den Werten und das dann mit forEach ins HTML
        let newArray = [];


        let description = data.weather[0].description;
        newArray.push(description);
        let pressure = `Pressure: ${data.main.pressure} hPa`;
        newArray.push(pressure);
        let humidity = `Humidity: ${data.main.humidity} %`;
        newArray.push(humidity);

        let sunrise = data.sys.sunrise;
        newArray.push(convertFromUnixToTime(sunrise));
        let sunset = data.sys.sunset;
        newArray.push(convertFromUnixToTime(sunset));
        let coordinateX = data.coord.lon;
        newArray.push(coordinateX);
        let coordinateY = data.coord.lat;
        newArray.push(coordinateY);
        let weatherMain = data.weather[0].main;
        newArray.push(weatherMain);
        console.log(newArray);

        newArray.forEach(element => {
            let newP = document.createElement("p");
            newP.innerText = element;
            document.body.appendChild(newP);
        });


        console.log("description", description);
        console.log("pressure", pressure);
        console.log("humidity", humidity);
        console.log("sunrise", sunrise);
        console.log("sunset", sunset);
        console.log("coordinateX", coordinateX);
        console.log("coordinateY", coordinateY);
        console.log("weatherMain", weatherMain);


    })

function convertFromUnixToTime(unix) {
    let date1 = new Date(unix);
    let time = date1.toLocaleTimeString();
    return time;
}