import React from 'react';
import Styles from './ingredient-thumb.module.css';

interface IThumb {
	count?: number;
	details: {
		calories: number;
		carbohydrates: number;
		fat: number;
		image: string;
		image_large: string;
		image_mobile: string;
		name: string;
		price: number;
		proteins: number;
		type: string;
		__v: number
	};
	mode?: string;
}

export const IngredientThumb = (props:IThumb) => {

	const className = props.mode === 'rest' ? [Styles.thumbwrap, Styles.rest].join(" ") : Styles.thumbwrap;
	return (
		<div className={Styles.overwrap}>
			<div className={className}>
				<div className={Styles.thumb} style={{'backgroundImage':'url('+props.details.image+')'}}></div>
			</div>
			{ props.mode === 'rest' && <span className={Styles.restcount}>+{props.count}</span>}
		</div>
	);
}