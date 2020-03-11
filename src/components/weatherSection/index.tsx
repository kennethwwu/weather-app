import React from 'react'
import { useMyState } from '../../store/appStateStore'
import CurrentWeather from '../currentWeather'
import ForcastList from '../forcastList'
import Loading from '../loading'

export default function WeatherSection() {
    const { weather, isLoading } = useMyState();
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
