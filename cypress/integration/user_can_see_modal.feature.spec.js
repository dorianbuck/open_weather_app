describe("Display of hourly focast modal", () => {
  beforeEach(() => {
    cy.intercept("GET", "*/weatherResponse**", { fixture: "weather_respoonse.json" });
    cy.visit("/");

    cy.get("#hourly-forcast").within(() => {
      cy.get(".modal-button").first().find(".view-button").click();
    });
  });

  it("is expected to open up a modal when view button is clicked", () => {
    cy.get("#modal-container").should("be.visible");
  });
});
