describe("The weather app", () => {
  it("is expected to display on initial render", () => {
    // cy.intercept("GET, */weatherData**", { fixture: "weatherData.json" });
    it("is expected to be displayed on initial render", () => {
      cy.visit("/", {
        onBeforeLoad(window) {
          const stubLocation = {
            coords: {
              latitude: 55.5167,
              longitude: 13,
            },
          };
          cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
            (callback) => {
              return callback(stubLocation);
            }
          );
        },
      });
      cy.get("[data-cy=weather-display]").within(() => {
        cy.get("[data-cy=temp]").should("contain", "7°C");
        cy.get("[data-cy=location]").should("contain", "Stockholm");
        cy.get("[data-cy=country]").should("contain", "Sweden");
        cy.get("[data-cy=sunrise]").should("contain", "05:31");
        cy.get("[data-cy=sunset]").should("contain", "20:01");
      });
    });
    cy.get("[data-cy=weather-display]").within(() => {
      cy.get("[data-cy=temp]").should("contain", "16.99°C");
      cy.get("[data-cy=location]").should("contain", "Virum");
    });
  });

  it("is expected to display a header", () => {
    cy.get("#header").should("contain", "The Weather App");
  });

  it("is expected to show a temperature of 16.99°C", () => {
    cy.get("#temp").should("contain", "16.99°C");
  });
});
