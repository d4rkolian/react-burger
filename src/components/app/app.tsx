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
	});

	const [modalVisible, setVisible] = React.useState(false);
	const [modalType, setModalType] = React.useState(null);
	const [productObj, setProduct] = React.useState({ product: '' });

	function clickHandle(event) {

		if ( event.currentTarget.getAttribute('modaltype') )
		{
			setModalType(event.currentTarget.getAttribute('modaltype'));
			if ( event.currentTarget.getAttribute('product') )
			{
				const newProduct = {
					product: JSON.parse(event.currentTarget.getAttribute('product'))
				}
				setProduct(newProduct);
			}
		} else {
			setModalType(null);
		}
		setVisible(!modalVisible);
		event.preventDefault();
	}

	function handleUserKeyPress(event) { 
	  if (event.keyCode === 27) {
	  	setVisible(false);
	  }
	}

	React.useEffect(
		() => {
			window.addEventListener('keydown', handleUserKeyPress);
	    return () => {
	      window.removeEventListener('keydown', handleUserKeyPress);
	    };
		}
	,[]
	);

	React.useEffect(() => {
		const getIngredients = async () => {
	    fetch(API_URL)
	    .then(res => res.json())
	    .then(data => setState({ingredients: data.data, isLoading: false}) )
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
        <BurgerIngredients appStyles={AppStyles} ingredients={state.ingredients} isLoading={state.isLoading} clickHandle={clickHandle} />
        <BurgerConstructor appStyles={AppStyles} ingredients={state.ingredients} isLoading={state.isLoading} clickHandle={clickHandle} />
        { modalVisible && (
					<>
					<Modal clickHandle={clickHandle} product={modalType === 'ingredients' ? productObj : null} modaltype={modalType}  />
					<ModalOverlay clickHandle={clickHandle} />
					</>
				)}
      </main>
    </>
  );
}

export default App;