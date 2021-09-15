import axios from "axios";
import React, { Component } from "react";

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
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude={,minutely,hourly,daily,alerts}&appid=${apiKey}`
      );
      const weatherInfo = {
        city: locationResponse.data.results[0].components.city,
        temp: weatherResponse.data.current.temp,
        sunrise: weatherResponse.data.current.sunrise,
      };
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
    return (
      <div data-cy="weather-display">
        <h1 id="header">The Weather App</h1>
        <p data-cy="temp">Temperature: {this.state.location.temp}°C</p>
        <p data-cy="location">Your location is: {this.state.location.city} </p>
        <p data-cy="sunrise">Sunrise at: {this.state.location.sunrise} </p>
        <p data-cy="sunset">Sunrise at: {this.state.location.sunset} </p>
        <p>{/* {this.state.location.temp} */}</p>
      </div>
    );
  }
}

export default App;
