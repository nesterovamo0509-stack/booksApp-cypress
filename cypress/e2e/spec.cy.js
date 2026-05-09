describe('Books app', () => {
  it('The main page opens', () => {
    cy.visit('/');
    cy.contains('Books list').should('be.visible');
  });
});

describe('Login tests', () => {
  it('Should successfully login', () => {
    cy.login();

    cy.contains(`Добро пожаловать ${Cypress.env('mail')}`)
      .should('be.visible');
  });

  it('Should not login with empty mail', () => {
    cy.visit('/');

    cy.contains('Log in').click();

    cy.get('#mail').type(' ');
    cy.get('#pass').type(Cypress.env('pass'));

    cy.contains('Submit').click();

    cy.get('#mail')
      .then(($el) => $el[0].checkValidity())
      .should('be.false');
  });

  it('Should not login with empty password', () => {
    cy.visit('/');

    cy.contains('Log in').click();

    cy.get('#mail').type(Cypress.env('mail'));

    cy.contains('Submit').click();

    cy.get('#pass')
      .then(($el) => $el[0].checkValidity())
      .should('be.false');
  });
});

describe('Favorite books tests', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Adding a book to your favorites using the checkbox', () => {
    const title = 'Favorite book with checkbox';

    cy.addBook(title, 'Book description', 'Book author', true);

    cy.get('.card')
      .filter(`:contains("${title}")`)
      .last()
      .within(() => {
        cy.contains(title).should('be.visible');
        cy.contains('Delete from favorite').should('be.visible');
      });
  });

  it('Adding a book to your favorites using the button', () => {
    const title = 'Favorite book with button';

    cy.addBook(title, 'Book description', 'Book author');

    cy.get('.card')
      .filter(`:contains("${title}")`)
      .last()
      .within(() => {
        cy.contains('Add to favorite').click();
        cy.contains('Delete from favorite').should('be.visible');
      });
  });

  it('Delete book from favorite', () => {
    const title = 'Book to delete from favorite';

    cy.addBook(title, 'Book description', 'Book author', true);

    cy.get('.card')
      .filter(`:contains("${title}")`)
      .last()
      .within(() => {
        cy.contains('Delete from favorite').click();
        cy.contains('Add to favorite').should('be.visible');
      });
  });
});