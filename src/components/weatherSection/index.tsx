import React, { useContext } from 'react'
import stateContext from '../../store/cityWeather'
import CurrentWeather from '../currentWeather'
import ForcastList from '../forcastList'
import Loading from '../loading'

export default function WeatherSection() {
    const { weather, isLoading } = useContext(stateContext);
    return (
        
        isLoading?<Loading />:(
            weather && 
            (   <>
                    <CurrentWeather/>
                    <ForcastList/>
                </>
            )
        )

    )
}
