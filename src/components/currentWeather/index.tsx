import React, { useContext } from 'react'
import stateContext from '../../store/cityWeather'
import moment from 'moment-timezone'
import { Units } from '../../types/units'
import { calcTempByUnit } from '../../helpers/unitConventor'

export default function CurrentWeather() {
    const { weather, unit, switchUnit } = useContext(stateContext);
    const { title, parent, consolidated_weather, time, timezone } = weather;
    const { the_temp, weather_state_name, weather_state_abbr, humidity, visibility, wind_speed, wind_direction_compass} = consolidated_weather[0]
    return (
        <div className="mb-3 clearfix">
            <h4>
                {title}, {parent.title} 
            </h4>
            <div className="btn-group btn-group-sm float-right" role="group">
                <button 
                    type="button" 
                    aria-label="Celsius"
                    className={"btn "+(unit === Units.Celsius?'btn-primary':'btn-muted')} 
                    onClick={() => switchUnit(Units.Celsius)}>&#8451;</button>
                <button 
                    type="button"
                    aria-label="Fahrenheit" 
                    className={"btn "+(unit === Units.Fahrenheit?'btn-primary':'btn-muted')} 
                    onClick={() => switchUnit(Units.Fahrenheit)}>&#8457;</button>
            </div>
            <div>{moment(time).tz(timezone).format("ddd, MMM Do")}</div>
            <div>{weather_state_name}</div>
            <div className="row">
                <div className="col-6">
                    <div>
                        <img className={"weather-icon"} src={`https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`} alt={weather_state_name}/> 
                        <span className="current-temp" >{calcTempByUnit(the_temp, unit).toFixed(0)}</span> {unit === Units.Celsius?<span aria-label={unit}>&#8451;</span>:<span aria-label={unit}>&#8457;</span>}
                    </div>
                </div>
                <div className="col-6">
                    <div><span>Humidity:</span> {humidity}%</div>
                    <div><span>Visibility:</span> {visibility.toFixed(0)}</div>
                    <div><span>Wind:</span> {wind_speed.toFixed(0)} kph {wind_direction_compass.toLower}</div>
                </div>
          </div>
        </div>
    )
}
