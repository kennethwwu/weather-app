
import React, { useState, useEffect, useCallback } from 'react';
import { searchLocationByGeo } from '../helpers/httpClient';
import { getGeolocation } from '../helpers/geolocation';
import { getLocationWeater } from '../helpers/httpClient';
import { Weather } from '../types/weatherType'
import { Units } from '../types/units'

type AppStateType = {
    isLoading: boolean, 
    city: number, 
    weather: Weather|any, 
    setCity: Function, 
    unit:Units,
    switchUnit: Function
}

export const initialState = {
    woeid: 1103816,
    defaultUnit: Units.Celsius,
    loadingState: false
}

// use Melbourne's woeid as default if can read geolocation from browser
export function useAppState({woeid, defaultUnit, loadingState}):AppStateType {
    const [city, setCityId] = useState(woeid);
    const [weather, setWeather] = useState<Weather|null>(null);
    const [unit, setUnit] = useState(defaultUnit);
    const [isLoading, setLoading] = useState(loadingState);
    console.log('useAppState updated')
    useEffect( () => {
        (async () => {
            setLoading(true)
            try{
                const weather = await getLocationWeater(city);
                setWeather(weather);
            }catch(e){
                console.log(e)
            }
            setLoading(false)
        })()
    }, [city])

    React.useEffect(() => {

        async function getCitybyGeo(){
            try{
                const { coords } = await getGeolocation();
                const [{woeid}] = await searchLocationByGeo(coords);
                setCityId(woeid)
            }catch(e){
                console.log(e);
            }
        }

        getCitybyGeo();
    }, [])

    function switchUnit(newUnit:Units){
        setUnit(newUnit)
    }

    const setCity = useCallback((woeid:number) => {
        setCityId(woeid)
    }, [setCityId])

    return { isLoading, city, weather, setCity, unit, switchUnit }
}