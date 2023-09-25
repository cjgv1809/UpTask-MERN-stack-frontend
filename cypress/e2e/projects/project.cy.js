/// <reference types="cypress" />

describe("<Projects/>", () => {
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

  it("should display a list of projects", () => {
    cy.visit("/projects");
    cy.get("[data-cy=projects-list]").should("exist");
  });

  it("displays an option in the sidebar to create a project", () => {
    cy.visit("/projects");
    cy.get("[data-cy=create-project]")
      .should("exist")
      .and("have.text", "Crear Nuevo Proyecto");
  });

  it("should redirect to create project page by pressing the create project button", () => {
    cy.visit("/projects");
    cy.get("[data-cy=hamburger-button]").should("exist").click({ force: true });
    cy.wait(3000);
    cy.get("[data-cy=create-project]").should("exist").click({ force: true });
    cy.url().should("include", "/projects/create-project");
  });

  it("should display a message if there are no projects", () => {
    cy.visit("/projects");
    cy.get("[data-cy=no-projects-text]")
      .should("exist")
      .and("have.text", "No hay proyectos");
  });

  it("should exist a button to create a new project", () => {
    cy.visit("/projects");
    cy.get("[data-cy=hamburger-button]").should("exist").click({ force: true });
    cy.wait(3000);
    cy.get("[data-cy=create-project]").should("exist").click({ force: true });
    cy.get("[data-cy=project-button]")
      .should("exist")
      .and("have.text", "Crear proyecto");
  });

  it("should display an alert showing that all fields are mandatory when creating a project", () => {
    cy.visit("/projects");
    cy.get("[data-cy=hamburger-button]").should("exist").click({ force: true });
    cy.wait(3000);
    cy.get("[data-cy=create-project]").should("exist").click({ force: true });
    cy.get("[data-cy=submit-project]").should("exist");
    cy.get("[data-cy=submit-project]").submit();
    cy.get("[data-cy=alert]").should("exist");
    cy.get("[data-cy=alert]").should("have.class", "alert-error");
    cy.get("[data-cy=alert-title]")
      .should("exist")
      .should("have.text", "Error");
    cy.get("[data-cy=alert-message]")
      .should("exist")
      .should("have.text", "Todos los campos son obligatorios");
  });

  it("should display an alert showing that a project was created correctly", () => {
    cy.visit("/projects");
    cy.get("[data-cy=hamburger-button]").should("exist").click({ force: true });
    cy.wait(3000);
    cy.get("[data-cy=create-project]").should("exist").click({ force: true });
    cy.get("[data-cy=project-name]").should("exist").type("Test Project");
    cy.get("[data-cy=project-description]").should("exist").type("Test");
    cy.get("[data-cy=project-delivery-date]")
      .should("exist")
      .type("2023-09-30");
    cy.get("[data-cy=project-client]").should("exist").type("Test Client");
    cy.get("[data-cy=submit-project]").should("exist").submit();
    cy.get("[data-cy=alert]").should("exist");
    cy.get("[data-cy=alert]").should("have.class", "alert-success");
    cy.get("[data-cy=alert-title]")
      .should("exist")
      .should("have.text", "Proyecto creado");
    cy.get("[data-cy=alert-message]")
      .should("exist")
      .should("have.text", "El proyecto se ha creado correctamente");
  });

  it("should display an alert showing that a project was updated correctly", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").last().click();
    cy.get("[data-cy=edit-project-link]").should("exist").click();
    cy.get("[data-cy=project-name]")
      .should("exist")
      .clear()
      .type("Test2 Project");
    cy.get("[data-cy=project-description]")
      .should("exist")
      .clear()
      .type("Test2");
    cy.get("[data-cy=project-delivery-date]")
      .should("exist")
      .type("2024-09-30");
    cy.get("[data-cy=project-client]")
      .should("exist")
      .clear()
      .type("Test2 Client");
    cy.get("[data-cy=submit-project]").should("exist").submit();
    cy.get("[data-cy=alert]").should("exist");
    cy.get("[data-cy=alert]").should("have.class", "alert-success");
    cy.get("[data-cy=alert-title]")
      .should("exist")
      .should("have.text", "Proyecto actualizado");
    cy.get("[data-cy=alert-message]")
      .should("exist")
      .should("have.text", "El proyecto se ha actualizado correctamente");
  });

  it("should display an alert showing that a project was deleted correctly", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").last().click();
    cy.get("[data-cy=delete-project-btn]").should("exist").click();
    cy.get("[data-cy=delete-action-button]").should("exist").first().click();
    cy.get("[data-cy=alert]").should("exist");
    cy.get("[data-cy=alert]").should("have.class", "alert-success");
    cy.get("[data-cy=alert-title]")
      .should("exist")
      .should("have.text", "Proyecto eliminado");
    cy.get("[data-cy=alert-message]")
      .should("exist")
      .should("have.text", "El proyecto se ha eliminado correctamente");
  });
});
