context("Register", () => {
  it("Enters the landing page and tries to go to the register page", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1440, 900);

    cy.contains("Cadastre-se").click();

    cy.contains("Cadastro");
  });

  it("Tries to register a new user", () => {
    cy.intercept("POST", "/register", {
      statusCode: 201,
      body: {
        name: "Ivan",
        email: "ivan@mail.com",
        id: 1,
      },
    }).as("new-user");

    cy.get(":nth-child(2) > .sc-hKFxyN").type("Ivan");
    cy.get(":nth-child(3) > .sc-hKFxyN").type("ivan@mail.com");
    cy.get(":nth-child(4) > .sc-hKFxyN").type("aA@12345");
    cy.get(":nth-child(5) > .sc-hKFxyN").type("aA@12345");
    cy.get(".sc-bdnxRM").click();

    cy.contains("Login");
  });
});

context("Login", () => {
  it("Login with the created user", () => {
    cy.intercept("POST", "/login", {
      statusCode: 200,
      body: {
        user: {
          name: "Ivan",
          email: "ivan@mail.com",
          id: 1,
        },
        accessToken: "TokenLegalzão123",
      },
    }).as("new-user");

    cy.get(":nth-child(2) > .sc-hKFxyN").type("ivan@mail.com");
    cy.get(":nth-child(3) > .sc-hKFxyN").type("aA@12345");
    cy.get(".sc-bdnxRM").click();
  });
});

context("New task", () => {
  it("Creates a new task", () => {
    cy.intercept("GET", "/tasks?completed=false&userId=1", {
      statusCode: 200,
      body: [
        {
          description: "Uma task",
          userId: 1,
          completed: false,
          created_at: new Date(),
        },
        {
          description: "Mais uma task",
          userId: 1,
          completed: false,
          created_at: new Date(),
        },
      ],
    }).as("tasks-list");

    cy.get("input").type("Mais uma terceira task");

    cy.intercept("POST", "/tasks", {
      statusCode: 201,
    }).as("new-task");

    cy.intercept("GET", "/tasks?completed=false&userId=1", {
      statusCode: 200,
      body: [
        {
          description: "Uma task",
          userId: 1,
          completed: false,
          created_at: new Date(),
          id: 1,
        },
        {
          description: "Mais uma task",
          userId: 1,
          completed: false,
          created_at: new Date(),
          id: 2,
        },
        {
          description: "Mais uma outra task",
          userId: 1,
          completed: false,
          created_at: new Date(),
          id: 3,
        },
      ],
    }).as("tasks-list");

    cy.get("section > .sc-bdnxRM").click({ force: true });
  });
});

context("Finish task", () => {
  it("Finishes a task we started before", () => {
    cy.intercept("PATCH", "/tasks/1", {
      statusCode: 200,
      body: [
        {
          description: "Mais uma task",
          userId: 1,
          completed: false,
          created_at: new Date(),
        },
        {
          description: "Mais uma outra task",
          userId: 1,
          completed: false,
          created_at: new Date(),
        },
      ],
    }).as("tasks-list");

    cy.get(":nth-child(1) > .sc-bdnxRM").click();
  });
});
