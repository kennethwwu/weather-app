import React, { useContext } from 'react'
import stateContext from '../../store/cityWeather'
import moment from 'moment-timezone'
import { calcTempByUnit } from '../../helpers/unitConventor'

export default function DayWeather({weather, isToday}) {
    const { unit } = useContext(stateContext);
    const { applicable_date, weather_state_abbr, min_temp, max_temp, weather_state_name } = weather;
    return (
        <div className={"day-col col-sm-6 col-md-2"}>
            <div><b>{isToday?"Today":moment(applicable_date).format("dddd")}</b></div>
            <img className={"weather-icon"} src={`https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`} alt={weather_state_name}/>
            <div>
                <span className="min-temp">{calcTempByUnit(min_temp, unit).toFixed(0)}<span aria-label={unit}>&deg;</span></span><span aria-label="to">&nbsp;</span>
                <span className="text-muted max-temp">{calcTempByUnit(max_temp, unit).toFixed(0)}<span aria-label={unit}>&deg;</span></span>
            </div>
        </div>
    )
}
