Cypress.Commands.add('login', () => {
  cy.visit('/');
  cy.contains('Log in').click();
  cy.get('#mail').type(Cypress.env('mail'));
  cy.get('#pass').type(Cypress.env('pass'));
  cy.contains('Submit').click();
});

Cypress.Commands.add('addBook', (title, description, authors, favorite = false) => {
  cy.contains('Add new').click();

  cy.get('input[placeholder="Enter book title"]').type(title);
  cy.get('input[placeholder="Enter book description"]').type(description);
  cy.get('input[placeholder="Enter book authors"]').type(authors);

  if (favorite) {
    cy.get('#favorite').check({ force: true });
  }

  cy.contains('Submit').click();
});
