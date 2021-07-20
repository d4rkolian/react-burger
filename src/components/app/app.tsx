import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

/*
это какой-то костыль, не сработало через import, выбрасывало 
Cannot find module or its corresponding type declarations
*/
const AppStyles = require('./app.module.css');

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