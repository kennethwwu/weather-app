import React, { useState } from 'react';
import { searchLocation } from '../../helpers/httpClient';
import { useMyState } from '../../store/appStateStore'

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [locations, setLocations] = useState([]);
    const [showLocs, setShowLocs] = useState(false);
    const { setCity } = useMyState();

    React.useEffect(() => {
        const getLoactions = async () => {
            try{
                const locations = await searchLocation(query);
                setLocations(locations);
            }catch(e){
                console.log(e);
                setLocations([]);
            }
     
        }

        if(query){
            window['searchDebounce'] = setTimeout(() => {
                getLoactions();
            }, 500)
        }else{
            setLocations([]);
        }

        return () => {
            clearTimeout(window['searchDebounce'])
        }

    }, [query])

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
                    <span aria-label={loc.title}>{loc.title}</span>
                </li>
            )
        })
    }

    return (
        <>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1" role="img" aria-label="search bar">🔎</span>
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
