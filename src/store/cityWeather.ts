
import { useState, useEffect, createContext } from 'react';
import { getLocationWeater } from '../helpers/httpClient';
import { Weather } from '../types/weatherType'
import { Units } from '../types/units'

type StateType = {
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
export function useAppState({woeid, defaultUnit, loadingState}) {
    const [city, setCityId] = useState(woeid);
    const [weather, setWeather] = useState<Weather|null>(null);
    const [unit, setUnit] = useState(defaultUnit);
    const [isLoading, setLoading] = useState(loadingState);

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

    function switchUnit(newUnit:Units){
        setUnit(newUnit)
    }

    function setCity(woeid:number){
        setCityId(woeid)
    }

    return { isLoading, city, weather, setCity, unit, switchUnit }
}

const stateContext = createContext<StateType>({
    isLoading: false, 
    city: 1103816, 
    weather: null, 
    setCity: () => {}, 
    unit:Units.Celsius,
    switchUnit: () => {}
})

export default stateContext;