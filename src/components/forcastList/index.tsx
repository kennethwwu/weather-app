import React, { useContext } from 'react'
import stateContext from '../../store/cityWeather'
import DayWeather from '../dayWeather'


export default function ForcastList() {
    const { weather } = useContext(stateContext);
    const { consolidated_weather } = weather;
    function loadDayList(){
        return consolidated_weather.map( (weather, index) => {
            return <DayWeather key={weather.id} weather={weather} isToday={index === 0}/>
        })
    }
    return (
        <div className="row">
            {loadDayList()}
        </div>
    )
}
