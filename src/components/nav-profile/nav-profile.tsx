import React from 'react';
import { NavLink } from 'react-router-dom'; 
import PNavStyles from './nav-profile.module.css';



export const ProfileNavigation = (props: { isLoggingOut: boolean; logOutHandle: (e:any) => void; }) => {
	return (
		<nav className={PNavStyles.navigation}>
			<ul>
				<li className="text text_type_main-medium">
					<NavLink to="/profile" exact={true} activeClassName={PNavStyles.selected}>Профиль</NavLink>
				</li>
				<li className="text text_type_main-medium text_color_inactive">
					<NavLink to="/profile/orders" exact={true} activeClassName={PNavStyles.selected}>История заказов</NavLink>
				</li>
				<li className="text text_type_main-medium">
					{ !props.isLoggingOut
						? (<NavLink to="/" onClick={props.logOutHandle}>Выход</NavLink>)
						: (<span>Ждем ответ сервера</span>)
					}
				</li>
			</ul>
		</nav>
	);
}