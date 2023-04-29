import React from 'react';
import style from './style.module.css';

const Weather = ({weatherData, weatherType}) => {
  const data = weatherData && weatherData.cod !== '404' && weatherType === 'weather' ? {
    time: weatherData.dt,
    city: weatherData.name,
    country: weatherData.sys.country,
    temp: weatherData.main.temp.toFixed(0),
    pressure: weatherData.main.pressure,
    humidity: weatherData.main.humidity,
    wind: weatherData.wind.speed,
    sunrise: weatherData.sys.sunrise,
    sunset: weatherData.sys.sunset,
    icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
    description: weatherData.weather[0].main,
  } : null;

  const currentTime = (unixDate, dateType) => {
    const date = new Date(unixDate * 1000);// Текущий день из полученного с сервера Timestamp. Множитель 1000 для приведения UNIX к UTC
    const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = monthes[date.getMonth()]
    const time = `${date.getHours()}:${date.getMinutes()}`;
    let result = '';

    if (dateType === 'fullDate') {
      result = `${day} ${month}`;
    } else if (dateType === 'onlyTime') {
      result = time;
    }
    return result;
  };

  return data ? (
    <>
      <div className={style.Current}>
        <div className={style.Current__date}>{currentTime(data.time, 'fullDate')}</div>
        <div className={style.City}>{data.city}, {data.country}</div>
        <div>
          <div className={style.Current__main}>
            <div className={style.Current__temp}>{data.temp} &deg;C</div>
            <img className={style.Current__icon} src={data.icon} alt="icon" />
            <div>{data.description}</div>
          </div>
        </div>
        <div className={style.Current__info}>
          <div>Presure: {data.pressure}hPa</div>
          <div>Humidity: {data.humidity}%</div>
          <div>Wind: {data.wind}m/s</div>
          <div>Sunrise: {currentTime(data.sunrise, 'onlyTime')}</div>
          <div>Sunset: {currentTime(data.sunset, 'onlyTime')}</div>
        </div>
      </div>
    </>
  ) : (<></>)
}

export default Weather;