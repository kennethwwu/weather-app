**NOTE: [MetaWeather](https://www.metaweather.com/api/) API delivers real-time weather data to this App, since it is missing `Access-Control-Allow-Origin` header in response, a proxy service has been using to bypass browser security check. **

## Quick Start

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm build`

Builds the app for production to the `build` folder.<br />

### Run in the container:

```bash
    docker build -t weather-app .
    docker run -d -p3000:3000 weather-app
```
