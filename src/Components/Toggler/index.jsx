import React, { useState } from 'react';
import style from './style.module.css';

const Toggler = ({getData, getRequestParam, requestParam}) => {//Компонент переключателя между текущей погодой и 5-ти дневным прогнозом
  const [togglerState, setToggler] = useState('weather');//'weather' - текущая погода, 'forecast' - 5-ти дневный прогноз
  let leftStyle = style.Toggler__left_active;
  let rightStyle = style.Toggler__right;

  const currentClick = () => {
    setToggler('weather');
    getData({
      cityName: requestParam.cityName,
      coords: requestParam.coords,
      weatherType: 'weather'
    });
    getRequestParam({
      cityName: requestParam.cityName,
      coords: requestParam.coords,
      weatherType: 'weather'
    });
  };
  const forecastClick = () => {
    setToggler('forecast');
    getData({
      cityName: requestParam.cityName,
      coords: requestParam.coords,
      weatherType: 'forecast'
    });
    getRequestParam({
      cityName: requestParam.cityName,
      coords: requestParam.coords,
      weatherType: 'forecast'
    });
  };

  if (togglerState === 'weather') {
    leftStyle = style.Toggler__left_active;
    rightStyle = style.Toggler__right;
  } else if (togglerState === 'forecast') {
    leftStyle = style.Toggler__left;
    rightStyle = style.Toggler__right_active;
  }
  
  return (
    <div className={style.Toggler}>
      <button 
        className={leftStyle}
        onClick={currentClick}
      >Current weather</button>
      <button 
        className={rightStyle}
        onClick={forecastClick}
      >5-day forecast</button>
    </div>
  )
};

export default Toggler;