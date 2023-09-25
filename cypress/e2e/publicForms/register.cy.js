/// <reference types="cypress" />

describe("<Register/>", () => {
  it("displays an input field requesting name, email, password, repeat password and a button to submit the form as well as a link to login page", () => {
    cy.visit("/register");
    cy.get("[data-cy=register-form]").should("exist");
    cy.get("[data-cy=name-input]").should("exist");
    cy.get("[data-cy=email-input]").should("exist");
    cy.get("[data-cy=password-input]").should("exist");
    cy.get("[data-cy=repeat-password-input]").should("exist");
    cy.get("[data-cy=submit-register]")
      .should("exist")
      .and("have.text", "Crear cuenta")
      .and("have.attr", "type", "submit");
    cy.get("[data-cy=login-link]")
      .should("have.attr", "href", "/")
      .and("have.text", " Inicia sesión")
      .and("have.prop", "tagName", "A");
    cy.get("[data-cy=forgot-password-link]")
      .should("exist")
      .and("have.text", "¿Olvidaste tu contraseña?")
      .and("have.prop", "tagName", "A");
  });

  it("should redirect to login page by pressing the login link", () => {
    cy.visit("/register");
    cy.get("[data-cy=login-link]").click().url().should("include", "/");
  });

  it("should redirect to forgot password page by pressing the forgot password link", () => {
    cy.visit("/register");
    cy.get("[data-cy=forgot-password-link]")
      .click()
      .url()
      .should("include", "/forgot-password");
  });

  it("should display an error message if all fields are empty", () => {
    cy.visit("/register");
    cy.get("[data-cy=register-form]").submit();
    cy.get("[data-cy=alert]").should("exist").and("have.class", "alert-error");
    cy.get("[data-cy=alert-title]").should("have.text", "Error");
    cy.get("[data-cy=alert-message]").should(
      "have.text",
      "Todos los campos son obligatorios"
    );
  });

  it("should display an error message if both passwords do not match", () => {
    cy.visit("/register");
    cy.get("[data-cy=name-input]").type("Test");
    cy.get("[data-cy=email-input]").type("test@correo.com");
    cy.get("[data-cy=password-input]").type("Test");
    cy.get("[data-cy=repeat-password-input]").type("Test2");
    cy.get("[data-cy=register-form]").submit();
    cy.get("[data-cy=alert]").should("exist").and("have.class", "alert-error");
    cy.get("[data-cy=alert-title]").should("have.text", "Error");
    cy.get("[data-cy=alert-message]").should(
      "have.text",
      "Las contraseñas no coinciden"
    );
  });

  it("should display an error message if the password is too short", () => {
    cy.visit("/register");
    cy.get("[data-cy=name-input]").type("Test");
    cy.get("[data-cy=email-input]").type("test@correo.com");
    cy.get("[data-cy=password-input]").type("Test");
    cy.get("[data-cy=repeat-password-input]").type("Test");
    cy.get("[data-cy=register-form]").submit();
    cy.get("[data-cy=alert]").should("exist").and("have.class", "alert-error");
    cy.get("[data-cy=alert-title]").should("have.text", "Error");
    cy.get("[data-cy=alert-message]").should(
      "have.text",
      "La contraseña debe tener al menos 6 caracteres"
    );
  });

  it("should display an error message showing there's already a user with that email", () => {
    cy.visit("/register");
    cy.get("[data-cy=name-input]").type("Carlos");
    cy.get("[data-cy=email-input]").type("carlos_gomes1809@hotmail.com");
    cy.get("[data-cy=password-input]").type("123456");
    cy.get("[data-cy=repeat-password-input]").type("123456");
    cy.get("[data-cy=register-form]").submit();
    cy.get("[data-cy=alert]").should("exist").and("have.class", "alert-error");
    cy.get("[data-cy=alert-title]").should("have.text", "Error");
    cy.get("[data-cy=alert-message]").should(
      "have.text",
      "El usuario ya existe"
    );
  });
});
