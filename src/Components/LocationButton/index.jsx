import React, { useState } from 'react';
import style from './style.module.css';

const LocationButton = ({getRequestParam, getData, requestParam}) => {//Компонент кнопки геопозиционирования
  const [locationState, setLocation] = useState(0);
  
  const handlerMouseDown = () => {//Обработчик нажатия по кнопке геопозиционирования
    if (navigator.geolocation) {//Если определение местоположения в браузере разрешено
      navigator.geolocation.getCurrentPosition(position => {//Получаем объект с координатами
        const { coords } = position;
        setLocation(coords);//Сохраняем в locationState
      });
    } else {
      alert('Geolocation is disabled on this computer!')
    }
  };

  const handlerMouseUp = () => {
    /*Передача координат в качестве параметров функции для формирования запроса на сервер по геоданным */
    getData({
      coords: {
        lat: locationState.latitude,
        lon: locationState.longitude
      },
      weatherType: requestParam.weatherType
    });
    getRequestParam({
      coords: {
        lat: locationState.latitude,
        lon: locationState.longitude
      },
      weatherType: requestParam.weatherType
    });
  };
  /*Применяются два события onMouseDown и onMouseUp тк если применить только onClick и в его обработчике
   определять координаты и передавать их в getData, то обновлённое значение locationState не доступно внутри обработчика onCklick.
   !!!Улучшить код, сделать всё в одном обработчике!!!*/

  return (
    <span 
      className={style.Location}
      onMouseDown={handlerMouseDown}
      onMouseUp={handlerMouseUp}
    ></span>
  )
};

export default LocationButton