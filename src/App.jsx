import axios from "axios";
import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
// import LocationData from "./components/LocationData";

export class App extends Component {
  state = {
    location: {},
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude, longitude } = position.coords;
      const apiKey = "f60022513894d605a73019f85cab7c76";
      const ocApiKey = "a0e78a029fc64aac88ff24befed68ab5";
      const locationResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${ocApiKey}`
      );

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude={,minutely,daily,alerts}&appid=${apiKey}`
      );

      const weatherInfo = {
        city: locationResponse.data.results[0].components.city,
        country: locationResponse.data.results[0].components.country,
        temp: weatherResponse.data.current.temp,
        sunrise: new Date(
          weatherResponse.data.current.sunrise * 1000
        ).toLocaleTimeString("sv-SV"),
        sunset: new Date(
          weatherResponse.data.current.sunset * 1000
        ).toLocaleTimeString("sv-SV"),
        windspeed: weatherResponse.data.current.wind_speed,
        description:
          weatherResponse.data.current.weather[0].description.toUpperCase(),

        // temp_19hr: weatherResponse.data.hourly[0].temp,
      };

      let hourlyTemp = " ";
      debugger
      for (let i = 0; i < 48; i++) {
        hourlyTemp += (weatherResponse.data.hourly[i].temp)
      }
       document.getElementById("demo").innerHTML = hourlyTemp;

      this.setState({ location: weatherInfo });
      // debugger;
    });
  }

  // const city = locationResponse.data.results[0].components.city;
  // debugger;
  // if (city != "undefined") {
  //   return locationResponse.data.results[0].components.city;
  // } else {
  //   return JSON.parse("move somewhere better");
  // }

  render() {
    const temp = this.state.location.temp;
    const city = this.state.location.city;
    const country = this.state.location.country;
    const sunrise = this.state.location.sunrise;
    const sunset = this.state.location.sunset;
    const wind = this.state.location.windspeed;
    const description = this.state.location.description;

    
    const temp_19hr = this.state.location.temp_19hr;

    return (
      <Segment vertical>
        <Grid container="text">
          <Grid.Row>
            <Grid.Column>
              <h1 id="header">The Weather App</h1>
              <p id="demo">°C<br></br></p>
            </Grid.Column>
          </Grid.Row>

          <div data-cy="weather-current">
            <Grid.Row>
              <Grid.Column>
                <h3>Current Weather</h3>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p data-cy="temp">Temperature: {temp}°C</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p data-cy="location">
                  Your location is: {city}, {country}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p data-cy="sunrise">Sunrise at: {sunrise}</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p data-cy="sunset">Sunset at: {sunset} </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p data-cy="windspeed">Windspeed: {wind}m/s</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p data-cy="description">Current weather: {description}</p>
              </Grid.Column>
            </Grid.Row>
            <p>{/* {this.state.location.temp} */}</p>
          </div>
          <div data-cy="weather_19hr">
            <Grid.Row>
              <Grid.Column>
                <h3>Hourly Forcast</h3>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p data-cy="temp_19hr">Temperature: {temp_19hr}°C</p>
              </Grid.Column>
            </Grid.Row>
          </div>
        </Grid>
      </Segment>
    );
  }
}

export default App;
