import React from 'react';
import AppHeader from '../app-header/app-header';
import AppStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {

	const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredients appStyles={AppStyles} apiUrl={API_URL} />
        <BurgerConstructor appStyles={AppStyles} apiUrl={API_URL} />
      </main>
    </>
  );
}

export default App;