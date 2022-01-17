describe(`Click on card should show detail element`, () => {
  beforeEach(() => {
    cy.viewport(480, 600);
  });

  it(`It should show 'Personnes' as title`, () => {
    const expectedTitle: string = 'Personnes';
    cy.visit('/');
    cy.contains(expectedTitle);
  });

  it(`Should show a detail card on 'card' click`, () => {
    const expectedInitials: string = 'JL';
    cy.visit('/');
    cy.get('.card').first().click();
    cy.get('.my-badge').contains(expectedInitials);
  });

  it(`Should show an error message if email and confirmation diverged`, () => {
    const emailCtrl: any = cy.get('[formControlName="email"]');
    // Type an email in the first control
    emailCtrl.type('jla.webprojet@gmail.com');
    
    // Type a dummy email in the second control
    const confirmEmailCtrl: any = cy.get('[formControlName="confirmEmail"]');
    confirmEmailCtrl.type('jean-luc.aubert@aelion.fr');

    cy.get('#email-must-match-error').contains('emails does not match');

  });

  it(`Should display 'Zinedine Zidane' as first element on 'lastName' click`, () => {
    cy.get('[data-name="lastName"]').click();

    const firstRow = cy.get(':nth-child(3) > p');
    firstRow.contains('ZZ');

  });
});

