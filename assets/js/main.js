// Alle Elemente geholt
let buttonEl = document.querySelector("button");
let inputEl = document.querySelector("#input");
let cityEl = document.querySelector("#city");
let tempEl = document.querySelector("#temp");
let iconEl = document.querySelector("#icon");
let sunsetEl = document.querySelector("#sunset");
let sunriseEl = document.querySelector("#sunrise");
let descriptionEl = document.querySelector("#description");
let windEl = document.querySelector("#wind");
let pressureEl = document.querySelector("#pressure");
let divOut = document.querySelector("#out");
let sunriseDiv = document.querySelector("#sunriseDiv");
let sunsetDiv = document.querySelector("#sunsetDiv");
let windDiv = document.querySelector("#windDiv");
let articleEl = document.querySelector("article");




let key = "e43a999eb14f82488295ed959ce5f7cd";


//Alle Funktionaliäten sollen erst nach dem Klick passieren
buttonEl.addEventListener("click", () => {

    //Am Anfang die alten Elemente entfernen
    sunriseDiv.childElementCount > 1 ? sunriseDiv.innerHTML = "" : "";
    sunsetDiv.childElementCount > 1 ? sunsetDiv.innerHTML = "" : "";
    windDiv.childElementCount > 1 ? windDiv.innerHTML = "" : "";

    // divOut.innerHTML = "";

    let cintyInput = inputEl.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cintyInput}&appid=${key}&units=metric&lang=de`)

        .then((response) => response.json())
        .then((data) => {
            console.log(data);



            cityEl.textContent = cintyInput
            // ============== Temperatur ================================
            let temp = data.main.temp;
            tempEl.textContent = `${temp.toFixed(1)} °C`;

            //Falls die Temperatur heiß oder kalt ist, den text färben
            if (temp >= 23) {
                tempEl.style.color = "red";
            } else if (temp <= 5) {
                tempEl.style.color = "darkblue";
            } else {
                tempEl.style.color = "black";
            }

            // ============== Beschreibung ================================
            let description = data.weather[0].description;
            descriptionEl.textContent = description;

            // ============== Wetter Icon ================================
            let iconID = data.weather[0].icon;
            //Diese URL dynamisch mit der geholten iconID
            let icon = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
            iconEl.src = icon;
            // ============== Zeit ================================
            let unix_timestamp = data.dt;
            let time = convertFromUnixToTime(unix_timestamp);
            console.log(time);


            // ============== Sonnenuntergang & Sonnenaufgang ================================
            let country = data.sys.country;
            let sunrise = data.sys.sunrise;
            let sunriseTime = (new Date(sunrise * 1000)).toLocaleTimeString(country);
            let sunset = data.sys.sunset;
            let sunsetTime = (new Date(sunset * 1000)).toLocaleTimeString(country);
            // sunriseEl.textContent = `${sunriseTime}`;

            //*================== Sunrise ==================
            let imgSunriseEl = document.createElement("img");
            imgSunriseEl.src = "https://media4.giphy.com/media/hsgoFoHbqNDaXkcVG5/giphy.gif?cid=ecf05e4707h9wbej8ac5srihf541k6ikvkhc5j7esdrmdc5l&rid=giphy.gif&ct=s";
            sunriseDiv.appendChild(imgSunriseEl);

            // ========= Zwei <p> erstellen und in das sunriseDiv einfügen
            let newSunriseP1 = document.createElement("p");
            newSunriseP1.textContent = "Sonnenaufgang";
            sunriseDiv.appendChild(newSunriseP1);

            let newSunriseP2 = document.createElement("p");
            newSunriseP2.textContent = `${sunriseTime}`;
            newSunriseP2.setAttribute("id", "sunrise")
            sunriseDiv.appendChild(newSunriseP2);

            //*================== Sunset ==================
            let imgSunsetEl = document.createElement("img");
            imgSunsetEl.src = "https://media4.giphy.com/media/SWOrko6ftbH1bO5Vml/giphy.gif?cid=ecf05e470977i01c9ah0w6r17qzggzf0umi8z30i2fkyex0h&rid=giphy.gif&ct=s";
            sunsetDiv.appendChild(imgSunsetEl);

            // ========= Zwei <p> erstellen und in das sunsetDiv einfügen
            let newSunsetP1 = document.createElement("p");
            newSunsetP1.textContent = "Sonnenuntergang";
            sunsetDiv.appendChild(newSunsetP1);

            let newSunsetP2 = document.createElement("p");
            newSunsetP2.textContent = `${sunsetTime}`;
            newSunsetP2.setAttribute("id", "sunset")
            sunsetDiv.appendChild(newSunsetP2);

            //*================== Wind ==================
            let wind = data.wind.speed;
            let imgWindEl = document.createElement("img");
            imgWindEl.src = "https://media0.giphy.com/media/XmfjDw9rYnYhAbKtsa/giphy.gif?cid=ecf05e4796z17xqk2d2mt9xaqkwn62o6393xqzgsc4nj909z&rid=giphy.gif&ct=s";
            windDiv.appendChild(imgWindEl);

            // ========= Zwei <p> erstellen und in das sunsetDiv einfügen
            let newWindP1 = document.createElement("p");
            newWindP1.textContent = "Windgeschw.";
            windDiv.appendChild(newWindP1);

            let newWindP2 = document.createElement("p");
            newWindP2.textContent = `${wind} meter/sec`;
            newWindP2.setAttribute("id", "sunset")
            windDiv.appendChild(newWindP2);



            // let newSunsetP = document.createElement("p");
            // newSunsetP.textContent = "Sonnenuntergang";
            // sunsetDiv.insertBefore(newSunsetP, sunsetDiv.firstChild);

            // ============== Wind ================================
            // let windgeschwEl = document.querySelector("#windgeschw");
            // windgeschwEl.textContent = `Windgeschw.`;

            // windEl.textContent = `${wind} meter/sec`;
            // let newWindP = document.createElement("p");
            // newWindP.textContent = "Windgeschw.";
            // windDiv.insertBefore(newWindP, windDiv.firstChild);






            // class Weather {
            //     constructor(temperature, icon, description, sunrise, sunset, wind) {
            //         this.temperature = temperature;
            //         this.icon = icon;
            //         this.description = description;
            //         this.sunrise = sunrise;
            //         this.sunset = sunset;
            //         this.wind = wind;
            //     }
            // }

            // let weather = new Weather(temp, icon, description, sunriseTime, sunsetTime, wind);
            // console.log(weather)

            // for (let key in weather) {
            //     console.log(key);
            //     console.log(weather[key]);

            //     let newPEl = document.createElement("p");
            //     let newDivEl = document.createElement("div");
            //     newPEl.textContent = weather[key];
            //     divOut.insertAdjacentElement("afterbegin", newPEl);

            // }


        })

})
//=============== Von Unix zu einem normalen Datum ==============
function convertFromUnixToTime(unix) {
    let date1 = new Date(unix);
    let time = date1.toLocaleTimeString();
    return time;
}