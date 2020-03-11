import React from 'react'
import { useMyState } from '../../store/appStateStore'
import DayWeather from '../dayWeather'


export default function ForcastList() {
    const { weather } = useMyState();
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
