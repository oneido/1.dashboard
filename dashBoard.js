let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;

    console.log('위치를 확인하여 API 통신을 시작합니다. ');

    return getWeather(crd.latitude, crd.longitude);
};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};


function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6b79b2bcbbbd191e01c3a10b5ac0ed70&units=metric`)
        .then(res => res.json())
        .then(data => {
            console.dir(data);
            const temp = data.main.temp;
            const weathers = data.weather[data.weather.length - 1];

            document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`
            document.querySelector(".data").innerText = `🌎${data.name} 🔥${temp} 🌀${data.wind.speed} 🌈${weathers.description}`
            const state = `${weathers.main}`;

            switch (state) {
                case "Rain":

                    document.querySelector(".timeNow").innerText = new Date();
                    document.querySelector(".notaion").innerText = "☔비가 내립니다. 🌂우산을 챙기세요!🌂";
                    document.querySelector("body").classList.add("rain");
                    break;
                case "Mist":
                    document.querySelector(".timeNow").innerText = new Date();
                    document.querySelector(".notaion").innerText = "💧안개가 꼈습니다.";
                    document.querySelector("body").classList.add("mist");
                    break;
                case "Clouds":
                    document.querySelector(".timeNow").innerText = new Date();
                    document.querySelector(".notaion").innerText = "☁️구름이 있습니다.";
                    document.querySelector("body").classList.add("cloud");
                    break;

                case "Drizzle":
                    document.querySelector(".timeNow").innerText = new Date();
                    document.querySelector(".notaion").innerText = "☔ 이슬비가 내립니다. 🌂우산을 챙기세요!🌂";
                    document.querySelector("body").classList.add("drizzle");
                    break;

                case "Clear":
                    document.querySelector(".timeNow").innerText = new Date();
                    document.querySelector(".notaion").innerText = "😀 맑은 하늘입니다.🌞";
                    document.querySelector("body").classList.add("clear");
                    break;
            }



        })
}

function test() {
    navigator.geolocation.getCurrentPosition(success, error, options);
}
navigator.geolocation.getCurrentPosition(success, error, options);
setInterval(test, 6000 * 10 * 15);