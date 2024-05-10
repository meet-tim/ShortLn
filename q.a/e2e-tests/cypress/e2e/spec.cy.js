describe('Login functionality on shortln website', () => {
  it('should login successfully with valid email and password', () => {

    // Visit the login page before each test
    cy.visit('https://shortln.konadu.dev/sign-in');

    //assert that the login form elements (email and password input fields are visible.
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');

    // Fill in email and password fields
    cy.get('#email').type('doricy@gmail.com');
    cy.get('#password').type('doris1234');
    
    // Click on login button
    cy.get('.ng-submitted > :nth-child(4)').click();

    // Assert that the user is redirected to the home page
    cy.url().should('include', '/https://shortln.konadu.dev/links');
    
  });



  it('should redirect to sign up page when clicking on sign up', () => {
    // Click on sign up link
    cy.get('.text-red-500').click();

    // Assert that the user is redirected to the sign up page
    cy.url().should('include', '/https://shortln.konadu.dev/sign-up');
  });
})
  