import React, { useState } from 'react';
import style from './style.module.css';

const Search = ({getRequestParam, getData, requestParam}) => {//Компонент поисковой строки и кнопки Search
  const [inputValueState, setInputValue] = useState('');//Значение поисковой строки

  const handlerChangeInput = (event) => {//Обрабочик изменений в поисковой строке
    setInputValue(event.target.value);
  };
  const handlerKeyPress = (event) => {//Обработчик нажатия "Enter"
    const { key } = event;
    if (key === 'Enter') {
      getData({
        cityName: inputValueState,
        coords: requestParam.coords,
        weatherType: requestParam.weatherType
      });
      getRequestParam({
        cityName: inputValueState,
        coords: requestParam.coords,
        weatherType: requestParam.weatherType
      });//Передача названия города в качестве параметра функции для формирования запроса на сервер по названию города
      setInputValue('');
    }
  };
  const handlerClick = () => {//Обработчик нажатия кнопки "Search"
    getData({
      cityName: inputValueState,
      coords: requestParam.coords,
      weatherType: requestParam.weatherType
    });
    getRequestParam({
      cityName: inputValueState,
      coords: requestParam.coords,
      weatherType: requestParam.weatherType
    });
    setInputValue('');
  };

  return (
    <div className={style.SearchWrapper}>
      <input
        type={"text"} 
        className={style.Search} 
        placeholder={"Search city"}
        value={inputValueState}
        onKeyDown={handlerKeyPress}
        onChange={handlerChangeInput}
      />
      <button className={style.SearchBtn} onClick={handlerClick}>Search</button>
    </div>
  )
};

export default Search