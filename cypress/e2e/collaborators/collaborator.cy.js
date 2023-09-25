/// <reference types="cypress" />

describe("<Collaborator/>", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=email-input]").should("exist");
    cy.get("[data-cy=email-input]").type("carlos_gomes1809@hotmail.com");
    cy.get("[data-cy=password-input]").should("exist");
    cy.get("[data-cy=password-input]").type("123456");
    cy.get("[data-cy=login-form]").submit();
    cy.wait(3000);
    cy.url().should("include", "/projects");
  });

  it("should display a list of collaborators", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").first().click();
  });

  it("should display a message if there are no collaborators", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").first().click();
    cy.get("[data-cy=no-collaborators-text]").should("exist");
    cy.get("[data-cy=no-collaborators-text]").should(
      "have.text",
      "No hay colaboradores en este proyecto"
    );
  });

  it("should display a button to delete a collaborator", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").first().click();
    cy.get("[data-cy=delete-collaborator-button]").should("exist");
    cy.get("[data-cy=delete-collaborator-button]").should(
      "have.text",
      "Eliminar colaborador"
    );
  });

  it("should display an alert when deleting a collaborator", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").first().click();
    cy.get("[data-cy=delete-collaborator-button]").should("exist").click();
    cy.wait(3000);
    cy.get(
      "[data-cy=modal-delete-project] button[data-cy=delete-action-button]"
    )
      .should("exist")
      .last()
      .click({ force: true });
    cy.get("[data-cy=alert]").should("exist");
    cy.get("[data-cy=alert]").should("have.class", "alert-success");
    cy.get("[data-cy=alert-title]")
      .should("exist")
      .should("have.text", "Colaborador eliminado");
    cy.get("[data-cy=alert-message]").should(
      "exist",
      "El usuario fue eliminado como colaborador correctamente"
    );
  });

  it("should display an alert if the email field is empty when searching for a collaborator", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").first().click();
    cy.get("[data-cy=add-collaborator-link]").should("exist").click();
    cy.get("[data-cy=search-collaborator-button]").should("exist").click();
    cy.get("[data-cy=alert]").should("exist");
    cy.get("[data-cy=alert]").should("have.class", "alert-error");
    cy.get("[data-cy=alert-title]")
      .should("exist")
      .should("have.text", "Error");
    cy.get("[data-cy=alert-message]").should(
      "exist",
      "El correo electronico es obligatorio"
    );
  });

  it("should display an alert if the user is the creator of the project when searching for one collaborator", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").first().click();
    cy.get("[data-cy=add-collaborator-link]").should("exist").click();
    cy.get("[data-cy=search-email-collaborator-input]")
      .should("exist")
      .type("carlos_gomes1809@hotmail.com");
    cy.get("[data-cy=search-collaborator-button]").should("exist").click();
    cy.get("[data-cy=alert]").should("exist");
    cy.get("[data-cy=alert]").should("have.class", "alert-error");
    cy.get("[data-cy=alert-title]")
      .should("exist")
      .should("have.text", "Error");
    cy.get("[data-cy=alert-message]").should(
      "exist",
      "El creador del proyecto no puede ser colaborador"
    );
  });

  it("should display an alert if the user is already a collaborator when searching for one", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").first().click();
    cy.get("[data-cy=add-collaborator-link]").should("exist").click();
    cy.get("[data-cy=search-email-collaborator-input]")
      .should("exist")
      .type("carlos.gomes.1809@gmail.com");
    cy.get("[data-cy=search-collaborator-button]").should("exist").click();
    cy.get("[data-cy=add-collaborator-button]").should("exist").click();
    cy.get("[data-cy=search-collaborator-button]").should("exist").click();
    cy.get("[data-cy=alert]").should("exist");
    cy.get("[data-cy=alert]").should("have.class", "alert-error");
    cy.get("[data-cy=alert-title]")
      .should("exist")
      .should("have.text", "Error");
    cy.get("[data-cy=alert-message]").should(
      "exist",
      "El usuario ya es colaborador"
    );
  });

  it("should display an alert if the user does not exist when searching for a collaborator", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").first().click();
    cy.get("[data-cy=add-collaborator-link]").should("exist").click();
    cy.get("[data-cy=search-email-collaborator-input]")
      .should("exist")
      .type("testing@correo.com");
    cy.get("[data-cy=search-collaborator-button]").should("exist").click();
    cy.get("[data-cy=alert]").should("exist");
    cy.get("[data-cy=alert]").should("have.class", "alert-error");
    cy.get("[data-cy=alert-title]")
      .should("exist")
      .should("have.text", "Error");
    cy.get("[data-cy=alert-message]").should(
      "exist",
      "El usuario no fue encontrado"
    );
  });

  it("should display a button to add a new collaborator", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").first().click();
    cy.get("[data-cy=add-collaborator-link]").should("exist").click();
    cy.get("[data-cy=search-email-collaborator-input]")
      .should("exist")
      .type("test@correo.com");
    cy.get("[data-cy=search-collaborator-button]").should("exist").click();
    cy.get("[data-cy=add-collaborator-button]").should("exist");
    cy.get("[data-cy=add-collaborator-button]").should(
      "have.text",
      "Agregar colaborador"
    );
  });

  it("should display an alert when adding a new collaborator", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").first().click();
    cy.get("[data-cy=add-collaborator-link]").should("exist").click();
    cy.get("[data-cy=search-email-collaborator-input]")
      .should("exist")
      .type("test@correo.com");
    cy.get("[data-cy=search-collaborator-button]").should("exist").click();
    cy.get("[data-cy=add-collaborator-button]").should("exist");
    cy.get("[data-cy=add-collaborator-button]").should(
      "have.text",
      "Agregar colaborador"
    );
    cy.get("[data-cy=add-collaborator-button]").should("exist").click();
    cy.get("[data-cy=alert]").should("exist");
    cy.get("[data-cy=alert]").should("have.class", "alert-success");
    cy.get("[data-cy=alert-title]")
      .should("exist")
      .should("have.text", "Colaborador agregado");
    cy.get("[data-cy=alert-message]").should(
      "exist",
      "El usuario fue agregado como colaborador correctamente"
    );
  });
});
