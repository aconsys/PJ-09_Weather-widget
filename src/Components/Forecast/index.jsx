import React from 'react';
import style from './style.module.css';

const Daily = ({data}) => {
  
  const currentTime = (unixDate) => {
    const date = new Date(unixDate * 1000);// Текущий день из полученного с сервера Timestamp. Множитель 1000 для приведения UNIX к UTC
    const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = date.getDate();
    const weekDay = week[date.getDay()];
    const month = monthes[date.getMonth()]
    
    return `${weekDay}, ${day} ${month}`;
  };

  return (
    <div>
        {
            data.map((item, index) => {

              return (
                <div className={style.Forecast__day} key={index}>
                  <div className={style.Forecast__date}>{currentTime(item.dt)}</div>
                  <img className={style.Forecast__icon} src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" />
                  <div className={style.Forecast__temp}>{item.main.temp.toFixed(0)} &deg;C</div>
                  <div className={style.Forecast__describe}>{item.weather[0].main}</div>
                </div>
              )
            })
        }
    </div>
  ) 
};

const Forecast = ({weatherData, weatherType}) => {

  const filterData = (weatherData) => {
    const result = [];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() >= 10 ? date.getMonth() : '0' + date.getMonth();
    const day = date.getDate();
    const today = `${year}-${month}-${day}`;//Текущая дата для отсчёта сследующих 5 дней
    const targetHour = '12:00:00';//Время по которому будем выбирать элементы из принятого массива
    const totalDataArr = weatherData.list;//Массив данных по 5-ти дневному прогнозу с шагом 3 часа (40 элементов массива)

    totalDataArr.forEach((item, index) => {
      const [date, time] = item.dt_txt.split(' ');//dt_txt: "Дата Время" из принятых данных, разделяем на соответсвующие перемнные
      if (date !== today && time === targetHour) {
        result.push(totalDataArr[index])
      }
    });

    return result;
  };

  let data = null;
  let cityInfo = null;

  if (weatherData && weatherData.cod !== '404' && weatherType === 'forecast') {
    data = filterData(weatherData);
    cityInfo = {
      city: weatherData.city.name,
      country: weatherData.city.country
    }
  }

  return data ? (
    <>
      <div className={style.Forecast}>
        <div className={style.City}>{cityInfo.city}, {cityInfo.country}</div>
        <Daily
          data={data}
        />
      </div>
    </>
  ) : (<></>)
}

export default Forecast;