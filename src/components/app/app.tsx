import React from 'react';
import AppHeader from '../app-header/app-header';
import AppStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {
  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredients appStyles={AppStyles}/>
        <BurgerConstructor appStyles={AppStyles} />
      </main>
    </>
  );
}

export default App;