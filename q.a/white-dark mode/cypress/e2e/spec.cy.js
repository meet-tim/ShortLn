describe('white/dark mode feature', () => {
  it('should allow user to toggle between white and dark mode', () => {

    //visit the link
    cy.visit('https://shortln.konadu.dev/sign-in');

    //click on the light mode button
    cy.get('.absolute > .text-white').click();

    //assert that the background color changes to black
    cy.get('body').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    
    // pause for a few seconds to notice the change
    cy.wait(3000); // Adjust the time as needed (3000 milliseconds = 3 seconds)

    //click on the dark mode button
    cy.get('.absolute > .text-dark-01').click();

    //assert that the background color changes to white
    cy.get('body').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');

    
    


  })
})