let cityName=document.querySelector(".weather-city");
let weatherdateTime=document.querySelector(".weather-date-time");
let weathercasting=document.querySelector(".weather-forecasting");
let weatherIcon=document.querySelector(".weather-icon");
let w_temp=document.querySelector(".weather-temperature");
let w_min=document.querySelector(".weather-min");
let w_max=document.querySelector(".weather-max");
let weatherfeels=document.querySelector(".weather-feels");
let weatherhumidity=document.querySelector(".weather-humidity");
let weatherwind=document.querySelector(".weather-wind");
let weatherpressure=document.querySelector(".weather-pressure");
let citySearch=document.querySelector(".weather-search")

const getCountryName=(code)=>{
    return  new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

const getDateTime=(dt)=>{
const curDate=new Date(dt*1000);
console.log(curDate)

const options={
  weekday:"long",
  year:"numeric",
  month:"long",
  day:"numeric",
  hour:"numeric",
  minute:"numeric",
};

const formatter=new Intl.DateTimeFormat('en-US',options);
console.log(formatter)
return formatter.format(curDate);

}


let city="hyderabad";
citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=document.querySelector(".City-Name")
    console.log(cityName.value);
    city=cityName.value;
    getweatherdata();
    cityName.value="";
})

const getweatherdata=async()=>{
    const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=2738a01973f538d784f46cf790e5261a`;

    try{
        const res=await fetch(weatherUrl);
        const data= await res.json();
        console.log(data);

      const{main,name, weather, wind,sys,dt}=data;
      cityName.innerHTML=`${name}.${getCountryName(sys.country)}`;
      weatherdateTime.innerHTML=getDateTime(dt);

      weathercasting.innerHTML=`${weather[0].main}`;
      weatherIcon.innerHTML=`<img src=https://openweathermap.org/img/wn/${weather[0].icon}@2x.png>`
      w_temp.innerHTML = `${parseFloat(main.temp - 273.15).toFixed(2)}&#176;C`; // Convert from Kelvin to Celsius

      w_max.innerHTML = `Max: ${parseFloat(main.temp_max - 273.15).toFixed(2)}&#176;C`;
      w_min.innerHTML = `Min: ${parseFloat(main.temp_min - 273.15).toFixed(2)}&#176;C`;
      weatherfeels.innerHTML=`${main.feels_like}&#176`;
      weatherhumidity.innerHTML=`${main.humidity}%`;
      weatherwind.innerHTML=`${wind.speed}m/s`;
      weatherpressure.innerHTML=`${main.pressure } hPa`

    }
    catch(error){
        console.log(error);
    }
};

document.body.addEventListener("load",getweatherdata())