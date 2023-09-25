/// <reference types="cypress" />

describe("<Login/>", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays two input fields requesting email and password and a button to submit the form as well as two links to forgot-password and register pages", () => {
    cy.get("[data-cy=login-form]").should("exist");
    cy.get("[data-cy=email-input]").should("exist");
    cy.get("[data-cy=password-input]").should("exist");
    cy.get("[data-cy=submit-login]")
      .should("exist")
      .and("have.text", "Iniciar sesión")
      .and("have.attr", "type", "submit");
    cy.get("[data-cy=forgot-password-link]")
      .should("have.attr", "href", "/forgot-password")
      .and("have.text", "¿Olvidaste tu contraseña?")
      .and("have.prop", "tagName", "A");
    cy.get("[data-cy=register-link]")
      .should("have.attr", "href", "/register")
      .and("have.text", " Regístrate")
      .and("have.prop", "tagName", "A");
  });

  it("should redirect to forgot-password and register pages by pressing those links", () => {
    cy.get("[data-cy=forgot-password-link]")
      .click()
      .url()
      .should("include", "/forgot-password");
    cy.visit("/");
    cy.get("[data-cy=register-link]")
      .click()
      .url()
      .should("include", "/register");
  });

  it("should display an error message if any field is empty", () => {
    cy.get("[data-cy=login-form]").submit();
    cy.wait(3000);
    cy.get("[data-cy=alert]").should("exist");
    cy.get("[data-cy=alert]").should("have.class", "alert-error");
    cy.get("[data-cy=alert-title]")
      .should("exist")
      .should("have.text", "Error");
    cy.get("[data-cy=alert-message]")
      .should("exist")
      .should("have.text", "Todos los campos son obligatorios");
  });

  it("should display an error message if the password is incorrect", () => {
    cy.get("[data-cy=email-input]")
      .should("exist")
      .should("be.visible")
      .and("not.be.disabled")
      .type("carlos_gomes1809@hotmail.com");
    cy.get("[data-cy=password-input]")
      .should("exist")
      .should("be.visible")
      .and("not.be.disabled")
      .type("Test1234");
    cy.get("[data-cy=login-form]").submit();
    cy.wait(3000);
    cy.get("[data-cy=alert]").should("exist");
    cy.contains("[data-cy=alert-title]", "Error").should("be.visible");
    cy.contains("[data-cy=alert-message]", "Contraseña incorrecta").should(
      "be.visible"
    );
  });

  it("should redirect to home page if the login is successful and then logout to close the session", () => {
    cy.get("[data-cy=email-input]").should("exist");
    cy.get("[data-cy=email-input]").type("carlos_gomes1809@hotmail.com");
    cy.get("[data-cy=password-input]").should("exist");
    cy.get("[data-cy=password-input]").type("123456");
    cy.get("[data-cy=login-form]").submit();
    cy.wait(3000);
    cy.get("[data-cy=alert]").should("not.exist");
    cy.url().should("include", "/projects");
    cy.wait(3000);
    cy.get("[data-cy=hamburger-button]").should("exist").click({ force: true });
    cy.get("[data-cy=logout]").should("exist");
    cy.get("[data-cy=logout]").click({ force: true });
    cy.wait(3000);
    cy.url().should("include", "/");
  });
});
