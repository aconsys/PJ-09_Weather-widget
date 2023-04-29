import {useState } from 'react';
import Search from './Components/Search';
import LocationButton from './Components/LocationButton';
import Toggler from './Components/Toggler';
import Weather from './Components/Weather';
import Forecast from  './Components/Forecast';
import './App.css';

function App() {

  const [weatherDataState, setWeatherData] = useState();//Данные о погоде полученные от сервера
  const [requestParam, setRequestParam] = useState({
    cityName: null,
    coords: {
      lat: null,
      lon: null
    },
    weatherType: 'weather'
  });

  const getWeather = (data) => {//Запись данных о погоде в weatherDataState
    setWeatherData(data)
  };

  const request = (url, callback) => {//Запрос данных с сервера
    fetch(url)
    .then(response => response.json())
    .then(data => {
      callback(data)
    })
    .catch(error => console.log(error.message));
  };

  const getRequestParam = (requestData) => {//Получение параметров запроса при срабатывании событий в компонентах
      setRequestParam({
        ...requestParam,
        cityName: requestData.cityName,
        coords: requestData.coords,
        weatherType: requestData.weatherType
      });
  };

  const getData = (requestParam) => {//Генерация запроса на сервер
    //4a72e0ee442702f1b3d94d2244650d0f
    //229ac9bfe4075bdc0fe42a5344614610
    const apiKey = '4a72e0ee442702f1b3d94d2244650d0f';
    let url = '';

    if (requestParam.cityName) {//Выполниться при срабатывании событий в компоненте Search
      url = `https://api.openweathermap.org/data/2.5/${requestParam.weatherType}?q=${requestParam.cityName}&appid=${apiKey}&units=metric`;
    } else if (requestParam.coords) {//Выполниться при срабатывании событий в компоненте LocationButton
      const {lat, lon} = requestParam.coords;
      url = `https://api.openweathermap.org/data/2.5/${requestParam.weatherType}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }

    setWeatherData(null);
    if (requestParam.cityName || requestParam.coords.lat) {//Запрос не выполняется если не введено название города или не получены коопдинаты
      request(url, getWeather);
    }
  };

  return (
    <>
      <header className="header">
        <div className="container container_header">
          <Search 
            getRequestParam={getRequestParam}
            getData={getData}
            requestParam={requestParam}
          />
          <LocationButton 
            getData={getData}
            getRequestParam={getRequestParam}
            requestParam={requestParam}
          />
        </div>
      </header>
      <main className="main">
        <div className="container container_main">
          <Toggler 
            getData={getData}
            getRequestParam={getRequestParam}
            requestParam={requestParam}
          />
          <Weather
            weatherData={weatherDataState}
            weatherType={requestParam.weatherType}
          />
          <Forecast
            weatherData={weatherDataState}
            weatherType={requestParam.weatherType}
          />
        </div>
      </main>
    </>
  );
}

export default App;
