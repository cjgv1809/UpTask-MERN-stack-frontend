/// <reference types="cypress" />

describe("<Tasks/>", () => {
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

  it("should display a message showing that there is no tasks", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").last().click();
    cy.get("[data-cy=no-tasks-text]")
      .should("exist")
      .and("have.text", "No hay tareas en este proyecto");
  });

  it("should exist a create task button", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").last().click();
    cy.get("[data-cy=create-task-btn]")
      .should("exist")
      .and("have.text", "Crear tarea");
  });

  it("should create a task", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").last().click();
    cy.get("[data-cy=create-task-btn]").should("exist").click();
    cy.get("[data-cy=task-name]").should("exist").first().type("Task 1");
    cy.get("[data-cy=task-description]")
      .should("exist")
      .first()
      .type("Description 1");
    cy.get("[data-cy=task-delivery-date]")
      .should("exist")
      .first()
      .type("2023-09-30");
    cy.get("[data-cy=task-priority]").should("exist").first().select("Alta");
    cy.get("[data-cy=submit-task]")
      .should("exist")
      .first()
      .and("have.text", "Crear");
    cy.get("[data-cy=submit-task]").first().click();
  });

  it("should display a list of tasks", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").last().click();
    cy.get("[data-cy=tasks-list]").should("exist");
  });

  it("should update a task", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").last().click();
    cy.get("[data-cy=tasks-list]").should("exist");
    cy.get("[data-cy=edit-task-button]").should("exist").last().click();
    cy.get("[data-cy=task-name]").should("exist").last().clear().type("Task 2");
    cy.get("[data-cy=task-description]")
      .should("exist")
      .last()
      .clear()
      .type("Description 2");
    cy.get("[data-cy=task-delivery-date]")
      .should("exist")
      .last()
      .clear()
      .type("2024-09-30");
    cy.get("[data-cy=task-priority]").should("exist").last().select("Baja");
    cy.get("[data-cy=submit-task]")
      .should("exist")
      .last()
      .and("have.text", "Guardar");
    cy.get("[data-cy=submit-task]").last().click();
  });

  it("should delete a task", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").last().click();
    cy.get("[data-cy=delete-task-button]").should("exist").last().click();
    cy.get("[data-cy=delete-action-button]").should("exist").eq(1).click();
  });

  it("should update a task status to mark as complete", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").last().click();
    cy.get("[data-cy=tasks-list]").should("exist");
    cy.get("[data-cy=task-status]").should("exist").last().check();
  });

  it("should update a task status to mark as incomplete", () => {
    cy.visit("/projects");
    cy.get("[data-cy=preview-project-link]").should("exist").last().click();
    cy.get("[data-cy=tasks-list]").should("exist");
    cy.get("[data-cy=task-status]").should("exist").last().uncheck();
  });
});
