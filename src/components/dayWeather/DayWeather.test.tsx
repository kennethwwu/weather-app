import React from 'react';
import { render } from '@testing-library/react';
import DayWeather from './index';
import stateContext, { useAppState, initialState } from '../../store/cityWeather'

const makeWrapper = (hook: any, initialState:any) => ({ children }) => (
    <stateContext.Provider value={hook.call(null, initialState)}>
        {children}
    </stateContext.Provider>
);
const mockData = {

    id: 6537334679928832,
    weather_state_name: "Showers",
    weather_state_abbr: "s",
    wind_direction_compass: "S",
    created: "2020-02-06T09:41:57.579008Z",
    applicable_date: "2020-02-06",
    min_temp: 16.605,
    max_temp: 26.165,
    the_temp: 26.3,
    wind_speed: 4.18565287005753,
    wind_direction: 171.5135091994858,
    air_pressure: 1014.5,
    humidity: 71,
    visibility: 13.055008748906387,
    predictability: 73

}
test('render the single day weather', () => {
    const Wrapper = makeWrapper(useAppState,initialState)
    const { container } = render(<Wrapper><DayWeather weather={mockData} isToday={true}/></Wrapper>);
    expect(container.querySelector('span.min-temp')).toHaveTextContent(/\d+/i);
    expect(container.querySelector('span.max-temp')).toHaveTextContent(/\d+/i);
    expect(container.querySelector('b')).toHaveTextContent(/today/i);
    expect(container.querySelector('img')).toHaveAttribute('alt', 'Showers');
    
});

