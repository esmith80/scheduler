


// beforeEach(() => {
  // cy.log('I run before every test in every spec file!!!!!!');
  // cy.visit("/");
// });

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected");
  });
});