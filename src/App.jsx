import axios from "axios";
import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { Line } from "react-chartjs-2";
import HourlyModal from "./components/HourlyForcastModal";

export class App extends Component {
  state = {
    location: {},
    chart: {},
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude, longitude } = position.coords;
      const apiKey = "f60022513894d605a73019f85cab7c76";
      const ocApiKey = "a0e78a029fc64aac88ff24befed68ab5";

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
          exclude: `{minutely,daily,alerts}`,
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
        ).toLocaleTimeString("sv-SV"),
        sunset: new Date(
          weatherResponse.data.current.sunset * 1000
        ).toLocaleTimeString("sv-SV"),
        windspeed: weatherResponse.data.current.wind_speed,
        description:
          weatherResponse.data.current.weather[0].description.toUpperCase(),
      };

      this.setState({ hourlyForcast: weatherResponse.data.hourly });
      this.setState({ location: weatherInfo });
    });
  }

  render() {
    const { hourlyForcast } = this.state;

    let tempLabels = [];
    let tempDataItems = [];
    let tempData;
    if (hourlyForcast) {
      hourlyForcast.forEach((hour) => {
        tempLabels.push(
          new Date(hour.dt * 1000).toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        tempDataItems.push(hour.temp);
      });
      tempData = {
        labels: tempLabels,
        datasets: [
          {
            label: "Hourly Temperature",
            data: tempDataItems,
            fill: true,
            backgroundColor: "rgb(25, 99, 82)",
            borderColor: "rgba(85, 199, 132, 0.2)",
          },
        ],
      };
    }

    // let rainLabels = [];
    // let rainDataItems = [];
    // let rainData = [];
    // if (hourlyForcast) {
    //   hourlyForcast.forEach((hour) => {
    //     rainLabels.push(
    //       new Date(hour.dt * 1000).toLocaleTimeString(navigator.language, {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //       })
    //     );
    //     rainDataItems.push(hour.rain.1h);
    //   });
    //   rainData = {
    //     labels: rainLabels,
    //     datasets: [
    //       {
    //         label: "Hourly Temperature",
    //         data: rainDataItems,
    //         fill: true,
    //         backgroundColor: "rgb(25, 99, 82)",
    //         borderColor: "rgba(85, 199, 132, 0.2)",
    //       },
    //     ],
    //   };
    // }

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const temp = this.state.location.temp;
    const location = this.state.location.location;
    const country = this.state.location.country;
    const sunrise = this.state.location.sunrise;
    const sunset = this.state.location.sunset;
    const wind = this.state.location.windspeed;
    const description = this.state.location.description;

    const temp_19hr = this.state.chart.tempHr;

    // debugger;
    return (
      <Segment vertical>
        <Grid container="text">
          <Grid.Row>
            <Grid.Column>
              <h1 id="header">Frasian Weather</h1>
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
                  Your location is: {location}, {country}
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
          <div data-cy="hourlyForcast">
            <Grid.Row>
              <Grid.Column>
                <h3>Hourly Forcast</h3>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {/* <Line
                  canvas
                  height="400"
                  width="800"
                  data-testid="canvas"
                  data={tempData}
                  options={options}
                /> */}
                <HourlyModal hourlyModal={tempData}/>
              </Grid.Column>
            </Grid.Row>
          </div>
        </Grid>
      </Segment>
    );
  }
}

export default App;
