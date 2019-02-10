// Weather api

let APIKey = "166a433c57516f51dfab1f7edaed8413";
let weather_data = document.querySelector('.weather');
const fetch_weather = async (postal) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${postal},us&units=imperial&appid=${APIKey}`;
    let res = await fetch(url);
    let json = await res.json();
    let iconCode = json.weather[0].icon;
    let temp = Math.floor(json.main.temp);
    // console.log(json);

    let weather_html = `
      <div style="text-align:center;"> 
          <h5 class="left">${json.weather[0].main} <img src="http://openweathermap.org/img/w/${iconCode}.png" /> </h5>
          <h5 style=" line-height: 2.5;" class="right">${temp} F° </h5>
      </div>
    `;

    weather_data.innerHTML = weather_html;

  };