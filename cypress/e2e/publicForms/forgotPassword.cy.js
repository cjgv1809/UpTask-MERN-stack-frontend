/// <reference types="cypress" />

describe("<ForgotPassword/>", () => {
  it("displays an input field requesting email and a button to submit the form as well as a link to login page", () => {
    cy.visit("/forgot-password");
    cy.get("[data-cy=forgot-password-form]").should("exist");
    cy.get("[data-cy=email-input]").should("exist");
    cy.get("[data-cy=submit-forgot-password]")
      .should("exist")
      .and("have.text", "Recuperar cuenta")
      .and("have.attr", "type", "submit");
    cy.get("[data-cy=login-link]")
      .should("have.attr", "href", "/")
      .and("have.text", " Inicia sesión")
      .and("have.prop", "tagName", "A");
    cy.get("[data-cy=register-link]").should("not.exist");
  });

  it("should redirect to login page by pressing the login link", () => {
    cy.visit("/forgot-password");
    cy.get("[data-cy=login-link]").click().url().should("include", "/");
  });

  it("should display an error message if the email field is empty", () => {
    cy.visit("/forgot-password");
    cy.get("[data-cy=forgot-password-form]").submit();
    cy.get("[data-cy=alert]").should("exist").and("have.class", "alert-error");
    cy.get("[data-cy=alert-title]").should("have.text", "Error");
    cy.get("[data-cy=alert-message]").should(
      "have.text",
      "El email es obligatorio"
    );
  });
});
