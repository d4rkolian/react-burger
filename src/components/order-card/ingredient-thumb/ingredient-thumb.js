import React from 'react';
import { useSelector } from 'react-redux';
import Styles from './ingredient-thumb.module.css';

export const IngredientThumb = (props) => {

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