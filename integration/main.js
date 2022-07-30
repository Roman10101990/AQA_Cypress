const variables = require("./../support/selectors.js")

describe('The Home Page', () => {
  it('Visit page', () => {
    cy.visit('/')
  })

  it('Verify the page loaded', () => {
    cy.server();
    cy.intercept('/*').as("WaitPageLoaded")
    cy.visit('/')
    cy.wait(5000)
    cy.wait('@WaitPageLoaded').its('response.statusCode').should('eq', 200)
  })

  it('Verify [Log in] button', () => {
    cy.get(variables.loginButton)
  })

  it('clear inputs', () => {
    cy.get(variables.inputUserName).clear()
    cy.get(variables.inputPassword).clear()
  })

  it('Input fields email is visible ', () => {
    cy.get(variables.inputUserName).invoke('attr', 'placeholder').should('contain', 'Username')
    cy.get(variables.inputPassword).invoke('attr', 'placeholder').should('contain', 'Password')
  })

  it('possitive input login and password', () => {
    cy.get(variables.inputUserName).click();
    cy.get(variables.inputUserName).type('standard_user');

    cy.get(variables.inputPassword).click();
    cy.get(variables.inputPassword).type('secret_sauce');

    cy.get(variables.loginButton).click();

    cy.location().should(loc => expect(loc.toString()).to.eq("https://www.saucedemo.com/inventory.html"))
  })

  it('negative test input both empty login and password', () => {
    cy.visit('/')

    cy.get(variables.inputUserName).click();
    cy.get(variables.inputUserName).type(' ');

    cy.get(variables.inputPassword).click();
    cy.get(variables.inputPassword).type(' ');

    cy.get(variables.loginButton).click();
    cy.get(variables.errorAlert);
  })

  it('negative test input correct login and empty password', () => {
    cy.visit('/')

    cy.get(variables.inputUserName).click();
    cy.get(variables.inputUserName).type('standard_user');

    cy.get(variables.inputPassword).click();
    cy.get(variables.inputPassword).type(' ');

    cy.get(variables.loginButton).click();
    cy.get(variables.errorAlert);
  })

  it('negative test input empty login and correct password', () => {
    cy.visit('/')

    cy.get(variables.inputUserName).click();
    cy.get(variables.inputUserName).type(' ');

    cy.get(variables.inputPassword).click();
    cy.get(variables.inputPassword).type('secret_sauce');

    cy.get(variables.loginButton).click();
    cy.get(variables.errorAlert);
  })


  //10 and 11 tasks
  it('Enter the valid credentials to log in', () => {
    cy.get(variables.inputUserName).clear()
    cy.get(variables.inputPassword).clear()

    cy.get(variables.inputUserName).click();
    cy.get(variables.inputUserName).type('standard_user');

    cy.get(variables.inputPassword).click();
    cy.get(variables.inputPassword).type('secret_sauce');

    cy.get(variables.loginButton).click();
    cy.wait(2000)
    cy.location().should(loc => expect(loc.toString()).to.eq("https://www.saucedemo.com/inventory.html"))
  })

  //12,13 and 14 tasks
  it('Click hamburger', () => {
    cy.visit('/')

    cy.get(variables.inputUserName).click();
    cy.get(variables.inputUserName).type('standard_user');

    cy.get(variables.inputPassword).click();
    cy.get(variables.inputPassword).type('secret_sauce');

    cy.get(variables.loginButton).click();
    cy.wait(2000);

    cy.get(variables.burgerMenuBtn).click();

    cy.get(variables.logOutBtn).click();
    cy.wait(1000);
    cy.location().should(loc => expect(loc.toString()).to.eq("https://www.saucedemo.com/"))
  })
})