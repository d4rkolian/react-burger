// cypress test for dran-n-drop in BurgerConstructor component
import '@4tw/cypress-drag-drop'

describe('Drag-n-drop in BurgerConstructor component works correctly', () => {

	it('should be available on localhost:3000', function() {
	    cy.visit('http://localhost:3000');
	  });

	it('should handle drag on the element', () => {

		// задержка, чтобы успеть переключиться на браузер
		cy.wait(1000) 

		// до перетаскивания должен быть блок с уведомлением о пустом списке
		cy.get('p[class^="app_empty"]').should('exist');

		// перетаскивание
		cy.get('div[class^="card_card"]').first().drag('section[id="burgerconstructor"]')

		// после успешного перетаскивания должно пропасть уведомление о пустом списке
		cy.get('p[class^="app_empty"]').should('not.exist');

		// после успешного перетаскивания у элемента должен появиться badge
		cy.get('div[class^="card_card"]').first().children('span[class^="card_badge"]').should('exist');

	})

});