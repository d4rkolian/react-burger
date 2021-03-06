import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

type TProps = {
	appStyles: {
		[x: string]:string;
	};
	isLoading: boolean;
	clickHandle: (event:any) => void;
};

export const HomePage = (props:TProps) => {

	return (
		<DndProvider backend={HTML5Backend}>
	    <BurgerIngredients appStyles={props.appStyles} isLoading={props.isLoading} clickHandle={props.clickHandle} />
	    <BurgerConstructor appStyles={props.appStyles} clickHandle={props.clickHandle}  />
	  </DndProvider>
	);
}