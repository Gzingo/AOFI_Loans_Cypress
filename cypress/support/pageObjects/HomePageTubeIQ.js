export class HomePageTubeIQ {
  clickNavigationBar() {
    cy.get('body nav[role="navigation"] [data-intro="Filter panel"]').within(() => {
      cy.get('[data-toggle="tooltip"]').click();
    });
  }

  selectAllFromInbox() {
    cy.get('body nav[data-intro="Navigation menu"]').within(() => {
      cy.get('ul[id="side-menu"] li[id="miInbox"]').click();
      cy.wait(300);
      cy.get('li [data-activity="Tasks"]').within(() => {
        cy.get('ul li').filterTubeIQByText(['Show All', 'Prikaži sve']).realClick();
      });
    });
  }
}
export const onTubeIQHomePage = new HomePageTubeIQ();
