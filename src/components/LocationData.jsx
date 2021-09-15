import React, { Component } from "react";
import axios from "axios";

export class LocationData extends Component {
  state = {
    location: {},
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude, longitude } = position.coords;
      const ocApiKey = "a0e78a029fc64aac88ff24befed68ab5";
      const locationResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${ocApiKey}`
      );

      const locationInfo = {
        city: locationResponse.data.results[0].components.city,
      };
      this.setState({ location: locationInfo });
      // debugger;
      return {locationInfo}
    });
  }
}

export default LocationData;
