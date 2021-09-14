describe("it is expected that the user can navigate to", () => {
  before(() => {
    cy.intercept("GET, */weatherData**", { fixture: "weatherData.json" });
    cy.visit("/");
  });

  it('abc', () => {
    
  });
  
});
