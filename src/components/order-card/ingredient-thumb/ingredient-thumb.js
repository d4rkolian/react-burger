import React from 'react';
import Styles from './ingredient-thumb.module.css';
import BunImgPath from '../../../images/bun-01.png';

export const IngredientThumb = (props) => {
	const className = props.mode === 'rest' ? [Styles.thumbwrap, Styles.rest].join(" ") : Styles.thumbwrap;
	return (
		<div className={Styles.overwrap}>
			<div className={className}>
				<div className={Styles.thumb} style={{'background-image':'url('+BunImgPath+')'}}></div>
			</div>
			{ props.mode === 'rest' && <span className={Styles.restcount}>+3</span>}
		</div>
	);
}