
import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import './weather-display.css'

import {env} from '../env';

const WeatherDisplay = () => {

    const list = [ 'Choose an option', 'Melbourne', 'Sydney', 'Brisbane', 'Manila'];

    const [weather, setWeather] = useState({
        error: null,
        location: {
            name : "",
            region : "",
            country : ""
        },
        current : {
            temperature : 0,
            wind_speed : 0,
            pressure : 0,
            precip : 0.00,
            weather_icons : [],
            weather_descriptions : []
        }
    });

    const [locationName, setLocationName] = useState('');

    const handleChange = (e) => {
        setLocationName(e.target.value);

        if(e.target.value === 'Choose an option'){
            return;
        }

        axios.get(
            env.weatherstack.baseApi+'/v1/weather/current?query='+e.target.value)
            .then(res => {
                if (res.status === 200){
                    setWeather(res.data);
                    console.log(res.data);
                }
            })
            .catch(err => {
                alert('Something went wrong')
            });
    }

    return(

    <div className="wrapper">
        <div className="child">
            { weather.location.name !== '' && <>
            <div className="weather-location">
                <p>{weather.location.name} {weather.location.region} {weather.location.country}</p>
            </div>
            <div className="weather-details">
                <div className="weather-details-content">
                    <div className="weather-image">
                        {
                            weather.current.weather_icons.map( weatherIcon => {
                                return <img key={weatherIcon} src={weatherIcon} width="200" height="200" />;
                            })
                        }
                    </div>
                </div>
                <div className="weather-info">
                    <p>Wind: {weather.current.wind_speed} kmph</p>
                    <p>Precip: {weather.current.precip} mm</p>
                    <p>Pressure: {weather.current.pressure} mb</p>
                </div>
            </div>
                <div className="temperature-container">
                    <h3>{weather.current.temperature}°c</h3>
                    <div className="temperature-container">
                        {
                            weather.current.weather_descriptions.map(description => {
                                return <p key={description}>{description}</p>;
                            })
                        }
                    </div>
                </div>

            </>
                }
        </div>
        <div className="">
            <select value={locationName} onChange={handleChange}>
                {
                    list.map( option=> {
                        return (
                            <option key={option} value={option}>{option}</option>
                        )
                    })
                }
            </select>
        </div>

    </div>

    )
}

export default WeatherDisplay
