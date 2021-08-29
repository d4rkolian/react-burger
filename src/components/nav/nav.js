import React from 'react';
import { NavLink, matchPath } from 'react-router-dom';
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
					<NavLink to="/" className={[navStyles.text, "ml-2"].join(" ")} activeClassName={navStyles.active} exact={true} >Конструктор</NavLink>
				</li>
				<li className="mt-4 mb-4 pl-5 pr-5 pt-4">
					<span className={navStyles.icon}><ListIcon type="secondary" /></span>
					<a href="/feed" onClick={ (e) => {e.preventDefault();} } className={[navStyles.text, "ml-2", navStyles.inactive].join(" ")}  >Лента заказов</a>
				</li>
			</ul>     
			<Logo />
			<ul className={[navStyles.notlogged, navStyles.topnav].join(" ")}>
			  	<li className="mt-4 mb-4 pl-5 pt-4">
					<span className={navStyles.icon}><ProfileIcon type="primary" /></span>
					<NavLink to="/profile" className={[navStyles.text, "ml-2"].join(" ")}  activeClassName={navStyles.active} >Личный кабинет</NavLink>
				</li>
			</ul>
		</nav>
  );
}

export default Nav;