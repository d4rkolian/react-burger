import React from 'react';
import AppHeader from '../app-header/app-header';
import AppStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';

function App() {

	const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

	const [state,setState] = React.useState({
		isLoading: true,
		ingredients: [],
		modalsRed: null,
	});

	React.useEffect(() => {
		const getIngredients = async () => {
	    fetch(API_URL)
	    .then(res => res.json())
	    .then(data => setState({...state, ingredients: data.data, isLoading: false}) )
	    .catch(e => console.log('Error see can I, my young padavan'));
	  }
	  getIngredients();
		},
		[]
	);

  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredients appStyles={AppStyles} ingredients={state.ingredients} isLoading={state.isLoading} />
        <BurgerConstructor appStyles={AppStyles} ingredients={state.ingredients} isLoading={state.isLoading} />
      </main>
    </>
  );
}

export default App;