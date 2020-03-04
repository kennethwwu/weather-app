import React, { useEffect } from 'react';
import './App.css';
import SearchBar from './components/searchBar';
import WeatherSection from './components/weatherSection';
import stateContext from './store/cityWeather';
import { useAppState, initialState } from './hooks/useAppState'

const App = () => {

  useEffect(() => {
    document.title = "Weather Widget";
  }, [])

  return (
    <stateContext.Provider value={useAppState(initialState)}>
      <div className="jumbotron">
        <SearchBar />
        <WeatherSection />
      </div>
    </stateContext.Provider>
  );
}

export default App;
