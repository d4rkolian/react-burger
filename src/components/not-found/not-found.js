import React from 'react';
import { Link } from 'react-router-dom'; 
import PagesStyles from '../../pages/page.module.css';
import Styles from './not-found.module.css';

const NotFound = () => {
	return (
		<div className={PagesStyles.emptypagewrapper}>
			<div className={Styles.stub}>
				<p>Страница не найдена</p>
				<Link to="/" className={Styles.backlink}>Назад на главную страницу Бургерной</Link>
			</div>
		</div>
	);
}

export default NotFound