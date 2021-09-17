describe("Display of hourly focast modal", () => {
  beforeEach(() => {
    cy.intercept("https://api.openweathermap.org/data/2.5/**", {
      fixture: "weather_response.json",
    });
    cy.intercept("https://api.opencagedata.com/geocode/v1/**", {
      fixture: "location_response.json",
    });
    cy.visit("/");

    cy.get("[data-cy=forecast]").within(() => {
      cy.get("[data-cy=hourly-modal]")
        .first()
        .find("[data-cy=view-button]")
        .click();
    });
  });

  it("is expected to open up a modal when view button is clicked", () => {
    cy.get("[data-cy=hourly-modal-container]").should("be.visible");
  });
  it("is exptected to display a graph of hourly temp", () => {
    cy.get("[data-cy=temp-hourly-graph]").should("be.visible");
  });
  it("is expected to display a graph with hourly percipitation", () => {
    cy.get("[data-cy=rain-hourly-graph]").should("be.visible");
  });
});

describe("Displays modal for daily forecast", () => {
  beforeEach(() => {
    cy.intercept("https://api.openweathermap.org/data/2.5/**", {
      fixture: "weather_response.json",
    });
    cy.intercept("https://api.opencagedata.com/geocode/v1/**", {
      fixture: "location_response.json",
    });
    cy.visit("/");

    cy.get("[data-cy=forecast]").within(() => {
      cy.get("[data-cy=daily-modal]")
        .first()
        .find("[data-cy=view-button-daily]")
        .click();
    });
    it("is expected to open up a modal when view button is clicked", () => {
      cy.get("[data-cy=daily-modal-container]").should("be.visible");
    });
    it("is exptected to display a graph of daily temp", () => {
      cy.get("[data-cy=temp-daily-graph]").should("be.visible");
    });
    it("is expected to display a graph with daily percipitation", () => {
      cy.get("[data-cy=rain-daily-graph]").should("be.visible");
    });
  });
});
