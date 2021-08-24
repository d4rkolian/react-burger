import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import navStyles from './nav.module.css';

function Nav() {
  return (
		<nav className={navStyles.navigation}>
			<ul className={navStyles.topnav}>
				<li className="mt-4 mb-4 pr-5 pt-4">
					<span className={navStyles.icon}><BurgerIcon type="primary" /></span>
					<Link to="/" className={[navStyles.text, "ml-2"].join(" ")}  >Конструктор</Link>
				</li>
				<li className="mt-4 mb-4 pl-5 pr-5 pt-4">
					<span className={navStyles.icon}><ListIcon type="primary" /></span>
					<a href="/feed" onClick={ (e) => {e.preventDefault();} } className={[navStyles.text, "ml-2"].join(" ")}  >Лента заказов</a>
				</li>
			</ul>     
			<Logo />
			<ul className={[navStyles.notlogged, navStyles.topnav].join(" ")}>
			  	<li className="mt-4 mb-4 pl-5 pt-4">
					<span className={navStyles.icon}><ProfileIcon type="primary" /></span>
					<Link to="/login" className={[navStyles.text, "ml-2"].join(" ")}  >Личный кабинет</Link>
				</li>
			</ul>
		</nav>
  );
}

export default Nav;