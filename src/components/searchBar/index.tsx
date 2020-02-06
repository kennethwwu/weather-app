import React, { useState, useContext } from 'react';
import { searchLocation, searchLocationByGeo } from '../../helpers/httpClient';
import { getGeolocation } from '../../helpers/geolocation';
import stateContext from '../../store/cityWeather'

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [locations, setLocations] = useState([]);
    const [showLocs, setShowLocs] = useState(false);
    const { setCity } = useContext(stateContext);

    async function getCitybyGeo(){
        try{
            const { coords } = await getGeolocation();
            const [{woeid}] = await searchLocationByGeo(coords);
            setCity(woeid)
        }catch(e){
            console.log(e);
        }
    }

    React.useEffect(() => {
        (async () => {
            try{
                const locations = await searchLocation(query);
                setLocations(locations);
            }catch(e){
                console.log(e);
                setLocations([]);
            }
     
        })()

    }, [query])

    React.useEffect(() => {
        getCitybyGeo();
    }, [])

    const selectCity = location => {
        setQuery(location.title);
        setCity(location.woeid); 
        setShowLocs(false)
    }

    function loadLocations(locations){
        return locations.map( loc => {
            return (
                <li 
                    key={loc.woeid+''} 
                    onClick={() => {selectCity(loc)}}>
                    <a href="#" aria-label={loc.title}>{loc.title}</a>
                </li>
            )
        })
    }

    return (
        <>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">🔎</span>
                </div>
                <input 
                    type="text" 
                    className={"form-control"}
                    placeholder="search a location's weather"
                    value={query}
                    onFocus={ () => setShowLocs(true) } 
                    // onBlur={ () => setShowLocs(false) }  
                    onChange={(e) => setQuery(e.target.value)} />
            </div>

            { showLocs && (<ul>{loadLocations(locations)}</ul>)}
        </>
    )
}
