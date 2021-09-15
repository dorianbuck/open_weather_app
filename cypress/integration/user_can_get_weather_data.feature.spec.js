describe("The weather app", () => {
  beforeEach(() => {
    cy.intercept("https://api.openweathermap.org/data/2.5/**", {
      fixture: "weather_response.json",
    });
    cy.intercept("https://api.opencagedata.com/geocode/v1/**", {
      fixture: "location_response.json",
    });
  });

  it("is expected to be displayed on initial render", () => {
    cy.visit("/", {
      onBeforeLoad(window) {
        const stubLocation = {
          coords: {
            latitude: 57.7067832,
            longitude: 11.9671706,
          },
        };
        cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
          (callback) => {
            return callback(stubLocation);
          }
        );
      },
    });

    it("is expected to display a header", () => {
      cy.get("#header").should("contain", "The Weather App");
    });

    cy.get("[data-cy=weather-display]").within(() => {
      cy.get("[data-cy=temp]").should("contain", "16.99°C");
      cy.get("[data-cy=location]").should("contain", "Gothenburg");
      cy.get("[data-cy=sunrise]").should("contain", "Sunrise at: 06:40:19");
      cy.get("[data-cy=sunset]").should("contain", "Sunset at: 19:35:20");
      cy.get("[data-cy=windspeed]").should("contain", 1.540)
      cy.get("[data-cy=description]").should("contain", "CLEAR SKY")
    });

    cy.get("[data-cy=weather-forcast-hourly").within(() => {
      cy.get("data-cy=")
    })
  });
});
