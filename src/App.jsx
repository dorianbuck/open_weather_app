import axios from "axios";
import React, { Component } from "react";
import { Grid, Header, Icon, Container } from "semantic-ui-react";
import HourlyModal from "./components/HourlyForcastModal";

export class App extends Component {
  state = {
    location: {},
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude, longitude } = position.coords;
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const ocApiKey = process.env.REACT_APP_LOCATION_API_KEY;

      const locationResponse = await axios({
        method: "GET",
        url: `https://api.opencagedata.com/geocode/v1/json`,
        params: { key: `${ocApiKey}`, q: `${latitude}+${longitude}` },
      });

      const weatherResponse = await axios({
        mothod: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall`,
        params: {
          appid: `${apiKey}`,
          lat: `${latitude}`,
          lon: `${longitude}`,
          units: "metric",
          exclude: `{,minutely,alerts}`,
        },
      });

      const weatherInfo = {
        location: locationResponse.data.results[0].components.city
          ? locationResponse.data.results[0].components.city
          : locationResponse.data.results[0].components.county,
        country: locationResponse.data.results[0].components.country,
        temp: weatherResponse.data.current.temp,
        sunrise: new Date(
          weatherResponse.data.current.sunrise * 1000
        ).toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sunset: new Date(
          weatherResponse.data.current.sunset * 1000
        ).toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        }),
        windspeed: weatherResponse.data.current.wind_speed,
        description: weatherResponse.data.current.weather[0].description,
      };

      this.setState({ hourlyForcast: weatherResponse.data.hourly });
      // this.setState({ dailyForcast: weatherResponse.data.daily });

      this.setState({ location: weatherInfo });
    });
  }

  render() {
    const { hourlyForcast } = this.state;
    // const {dailyForcast} = this.state;

    const temp = this.state.location.temp;
    const location = this.state.location.location;
    const country = this.state.location.country;
    const sunrise = this.state.location.sunrise;
    const sunset = this.state.location.sunset;
    const wind = this.state.location.windspeed;
    const description = this.state.location.description;

    // debugger;
    return (
      <Container vertical>
        <Header color="olive" size="huge" textAlign="center" dividing>
          <h1 id="header">Frasian Weather</h1>
        </Header>
        <Grid
          container="text"
          textAlign="justified"
          celled="internally"
        >
          <div data-cy="weather-current" >
            <Grid.Row>
              <Grid.Column>
                <h3>Current Weather</h3>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row >
              <Grid.Column > 
                <p1 data-cy="location">
                  The current weather in {location}, {country} is {description}.
                </p1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p data-cy="temp">
                  <Icon loading name="thermometer half" color="red" size="big" />
                  Temperature: {temp}°C
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p data-cy="sunrise">
                  <Icon loading name="sun" color="yellow" size="big" />
                  Sunrise at: {sunrise}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p data-cy="sunset">
                  <Icon loading name="moon" color="grey" size="big" />
                  Sunset at: {sunset}{" "}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p data-cy="windspeed">
                  <Icon loading name="arrow right" color="olive" size="big" />
                  Windspeed: {wind}m/s
                </p>
              </Grid.Column>
            </Grid.Row>
          </div>
          <div data-cy="hourlyForcast">
            <Grid.Row>
              <Grid.Column>
                <h3>Forcast</h3>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <HourlyModal hourlyRain={hourlyForcast} hourlyTemp={hourlyForcast}/>
              </Grid.Column>
            </Grid.Row>
          </div>
        </Grid>
      </Container>
    );
  }
}

export default App;
