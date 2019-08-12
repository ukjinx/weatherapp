window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(poistion => {
            long = poistion.coords.longitude;
            lat = poistion.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/a9c04ee68e191321625e975ad01431d2/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
            })
                .then(data => {
                    console.log(data);
                    const {temperature,summary,icon} = data.currently;
                //Set DOM Element from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Formula for Celcius value
                    let celcius = (temperature - 32) * (.5556);
                    //Set Icon
                    setIcons (icon, document.querySelector('.icon'));

                    //Change F to C
                    temperatureSection.addEventListener('click', ()=>{
                        if (temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        }else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
            })
        });
    }

    function setIcons (icon,iconID){
        const skycons = new Skycons ({color: "white"})
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});