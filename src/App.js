import React, {useState} from 'react';
import {render} from 'react-dom';
import axios from 'axios'
import './App.css';

const WeatherApp = () => {
  const [temperature, setTemperature] = useState('');
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState('Melbourne');
  const [country, setCountry] = useState('AU')

  const getWeatherData = (city, country) => {
    axios({
      method: 'GET',
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=0d52298152c3d3cd6fc3375a33b9ee57`,
    })
    .then((response) => {
      console.log(response.data.main.temp);
      setTemperature((response.data.main.temp - 273.15) * 1.8 + 32);
      setDesc(response.data.weather[0].main);
    })
    .catch((error) =>{
      console.log(error)
    });
  };



  return (
   <>
   <div style={{marginLeft: '33%'}}>
     <div
     style={{
       height: '150px',
       width: '450px',
       backgroundColor: '#94e5ff',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       fontSize: '25px'
     }}
     >
       {new Date().toLocaleString()}
       <br/>
       {city} Weather
       <br/>
       {Math.round(temperature * 100) / 100} ℉
     </div>
     <br/>
     <input
     type='text'
     value= {city}
     onChange={(e) => setCity(e.target.value)}
     />
     <input
     type='text'
     value= {country}
     onChange={(e) => setCountry(e.target.value)}
     />
     <button
     onClick={() =>{
       getWeatherData(city,country);
     }}
     >
       GET
     </button>
   </div>
   </>
  );
};

render(<WeatherApp/>, document.querySelector('#root'));

export default WeatherApp;
