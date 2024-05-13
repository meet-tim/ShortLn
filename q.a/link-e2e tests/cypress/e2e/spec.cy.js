describe('shorten link page tests', () => {
  it('should allow user to enter their link and shorten it', () => {
    //visit the url
    cy.visit('https://shortln.konadu.dev/login');

    //fills the email field
    cy.get('#email').type('doricy@gmail.com');

    //fills the password field
    cy.get('#password').type('doris1234');

    //click on the shorten now button
    cy.get(':nth-child(4) > .w-full').click();

    //assert that the url for the link page exists
    cy.url().should('include', '/links');

    //user types any random email
    cy.get('.grow').type('whatsapp.com');

    //click on the shorten now button
    cy.get('.w-full > .w-fit').click();

    //show all links
    cy.get('.text-blue-500').click();

    //returns to original page
    cy.get('.bg-blue-500').click();

  

  })
})