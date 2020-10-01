import React, {useState} from "react"
import defineSeason from './functions/defineSeason'
import axios from 'axios';

const Main = () =>{


    const [weather, setWeather] = useState({});
    const [temperature, setTemperature] = useState({});
    const [wind, setWind] = useState({});
    const [data, setData] = useState({});
    const [forecast, setForecast] = useState({});

    const currentWeather = async () =>{
        const API_KEY = 'a0584d716e9b992064ad01890816506d';
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=51.441643&lon=5.478000&apikey=${API_KEY}&units=metric`;
           
           const request = axios.get(URL)
           const response = await request;
        
           setWeather(response.data.weather[0]);
           setTemperature(response.data.main);
           setWind(response.data.wind);
           setData(response.data);
        }
        const weatherForecast = async () =>{
            const API_KEY = '1266751b2faa16b328461cfc57e7f4d8';
            const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=51.441643&lon=5.478000&apikey=${API_KEY}&units=metric`;
               
               const request = axios.get(URL)
               const response = await request;
            
               setForecast(response.data.list[0].main);
            }

    const {humidity, pressure, temp} = temperature;
    const {speed} = wind;
    const {description, icon, main} = weather;
    const {name} = data;

    return(
        
        <div>
            <button onClick={currentWeather}>Get Data</button>
            {main && (<div className="city">
                <div className="city-flexbox">
                <div className="degrees">
                    <span>{Math.round(temp)}&deg;C</span>
                </div>
                <div className="city-name">
                    <span>{name}</span>
                    <sup>NL</sup><br/><br/>
                    <span className="city-season">{defineSeason()}</span>
                </div>
                </div>
                <div className="info-flexbox">
                    <p>Humidity: {humidity}%</p>
                    <p>Wind: {speed} km/h</p>
                    <p className="info-flexbox-description">{description}</p>
            </div>
            </div>
            )}
            <hr className="linebreak"></hr>
            </div>
    )
}

export default Main;