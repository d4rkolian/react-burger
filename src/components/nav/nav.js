import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import navStyles from './nav.module.css';

class Nav extends React.Component {
  render() {
    return (
			<nav>
				<ul className={navStyles.topnav}>
					<li className="mt-4 mb-4 pr-5 pt-4">
						<span className={navStyles.icon}><BurgerIcon type="primary" /></span>
						<a href="#" className={[navStyles.text, "ml-2"].join(" ")}  >Конструктор</a>
					</li>
					<li className="mt-4 mb-4 pl-5 pr-5 pt-4">
						<span className={navStyles.icon}><ListIcon type="primary" /></span>
						<a href="#" className={[navStyles.text, "ml-2"].join(" ")}  >Лента заказов</a>
					</li>
				</ul>     
				<Logo />
				<ul className={[navStyles.notlogged, navStyles.topnav].join(" ")}>
				  	<li className="mt-4 mb-4 pl-5 pt-4">
						<span className={navStyles.icon}><ProfileIcon type="primary" /></span>
						<a href="#" className={[navStyles.text, "ml-2"].join(" ")}  >Личный кабинет</a>
					</li>
				</ul>
			</nav>
    );
  }
}

export default Nav;