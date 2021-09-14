describe("The weather app", () => {
  before(() => {
    cy.intercept("GET, */weatherData**", { fixture: "weatherData.json" });
    cy.visit("/");
  });

  it("is expected to display a header", () => {
    cy.get("#header").should("contain", "The Weather App");
  });

  it("is expected to show a temperature of 16.99", () => {
    cy.get("#temp").should("contain", 16.99);
  });
});
