import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
  cy.visit('https://techglobal-training.com/frontend/project-4');
});

Given('the user is on {string}', (url) => {
  cy.visit(url);
});

Then('the user should see the {string} heading', (headingText) => {
  cy.get('h1').contains(headingText).should('be.visible');
});

Then('the user should see the table with the headers below', (dataTable) => {
  const expectedHeaders = dataTable.rawTable[0];
  cy.get('table th').each(($el, index) => {
    cy.wrap($el).contains(expectedHeaders[index]).should('be.visible');
  });
});

Then('the user should see the table with the rows below', (dataTable) => {
  dataTable.rawTable.forEach((row, rowIndex) => {
    cy.get(`table tr:nth-child(${rowIndex + 1}) td`).each(($el, colIndex) => {
      cy.wrap($el).contains(row[colIndex]).should('be.visible');
    });
  });
});

Then('the user should see the {string} button is enabled', (buttonText) => {
  cy.contains(buttonText).should('be.enabled');
});

Then('the user should see the {string} text displayed', (text) => {
  cy.get('#total_amount').contains(text).should('be.visible');
});

When('the user clicks on the {string} button', (buttonText) => {
  cy.contains(buttonText).click();
});

Then('the user should see the {string} modal with its heading', (modalHeading) => {
  cy.get('.modal').should('be.visible');
  cy.get('.modal h1').contains(modalHeading).should('be.visible');
});

Then('the user should see the {string} button is enabled', (buttonText) => {
  cy.contains(buttonText).should('be.enabled');
});

Then('the user should see the {string} label', (labelText) => {
  cy.contains(labelText).should('be.visible');
});

Then('the user should see the {string} input box is enabled', (inputField) => {
  cy.get(`input[name="${inputField.toLowerCase()}"]`).should('be.enabled');
});

When('the user enters the quantity as {string}', (quantity) => {
  cy.get('input[name="quantity"]').clear().type(quantity);
});

When('the user enters the product as {string}', (product) => {
  cy.get('input[name="product"]').clear().type(product);
});

When('the user enters the price as {string}', (price) => {
  cy.get('input[name="price"]').clear().type(price);
});

When('the user clicks on the {string} button', (buttonText) => {
  cy.contains(buttonText).click();
});

Then('the user should not see the {string} modal', (modalHeading) => {
  cy.get('.modal').should('not.exist');
});

Then('the user should see the table with the new row below', (dataTable) => {
  const newRow = dataTable.rawTable[0];
  cy.get('table tbody tr:last-child').within(() => {
    cy.get('td').each(($el, index) => {
      cy.wrap($el).contains(newRow[index]).should('be.visible');
    });
  });
});
