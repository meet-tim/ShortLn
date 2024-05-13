describe('Shortln app tests', () => {
  it('should allow user to sign up with email, first name, last name, and password', () => {
    cy.visit('https://shortln.konadu.dev/sign-up');
    // Fill in sign up form fields
    cy.get('#firstname').type('Doris');
    cy.get('#lastname').type('Gyebi');
    cy.get('#email').type('nananana@gmail.com');
    cy.get('#password').type('nana123');
    
    // Click on sign up button
    cy.get('button[type="submit"]').click();

     
  });


  it('should login successfully with valid email and password', () => {

    cy.visit('https://shortln.konadu.dev/sign-in'); // Visit the login page

    //assert that the login form elements (email and password input fields are visible.
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');

    // Fill in email and password fields
    cy.get('#email').type('doricy@gmail.com');
    cy.get('#password').type('doris1234');
    
    // Click on login button
    cy.get('.bg-blue-500').click();

    // Assert that the user is redirected to the home page
    cy.url().should('include', '/links');

    //user inputs a value in this field
    cy.get('.pl-24').type('youtube.com');

    //click on shorten now button
    cy.get('.px-12').click();

    


    
    
  });
  

 
})
  