import React from 'react';
import { render, cleanup, act, waitForElement } from '@testing-library/react'
import axios from 'axios'
import { initialState, useAppState} from '../hooks/useAppState'
import { Weather } from '../types/weatherType'

const mockData:Weather = {
    title:"Melbourne",
    consolidated_weather:[
        {
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
    ],
    parent:{
        title:"Australia"
    },
    time:"2020-02-06T23:03:18.200298+11:00",
    timezone:"Australia/Melbourne"
}
let mock

beforeEach(() => {
    mock = jest.spyOn(axios, 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: mockData }));
})
afterEach(cleanup)

function testHook(runHook) {
  return function HookWrapper() {
    const { weather } = runHook();

    return (
        weather?<span>loaded</span>:<></>
    );
  }

}

test('test App initial weather data from API', async() => {
    const HookWrapper = testHook(() => useAppState(initialState));
    await act(async () => {
        const { getByText } = render(<HookWrapper />)

        await waitForElement(() => getByText('loaded'));
        getByText('loaded')
    })
    
});

// let useEffect

// beforeEach(() => {
//     useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
// })

// test('test App initial state', () => {
//     const appState = testHook(() => useAppState(initialState));
//     expect(appState.isLoading).toBe(false);
//     expect(appState.city).toBe(1103816);
//     expect(appState.unit).toBe(Units.Celsius);
//     expect(appState.weather).toBeNull();
//     expect(typeof appState.setCity).toBe('function');
//     expect(typeof appState.switchUnit).toBe('function');
// });

// test('test App state after useEffect callback', () => {
//     const appState = testHook(() => useAppState(initialState), false);
//     expect(appState.isLoading).toBe(true);
//     expect(appState.city).toBe(1103816);
//     expect(appState.unit).toBe(Units.Celsius);
//     expect(typeof appState.setCity).toBe('function');
//     expect(typeof appState.switchUnit).toBe('function');
//     expect(useEffect).toHaveBeenCalled();

//     useEffect.mockRestore();
// });