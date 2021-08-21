import React from 'react';
import PagesStyles from '../../pages/page.module.css';
import ProfileStyles from './profile.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const Profile = () => {
	return (
		<div className={PagesStyles.emptypagewrapper}>
			<div className={ProfileStyles.profilecontainer}>
				<nav className={ProfileStyles.navigation}>
					<ul>
						<li className="text text_type_main-medium">Профиль</li>
						<li className="text text_type_main-medium text_color_inactive">История заказов</li>
						<li className="text text_type_main-medium text_color_inactive">Выход</li>
					</ul>
				</nav>
				<section className={ProfileStyles.details}>
					<div className="mb-6"><Input type="text" placeholder="Имя" icon="EditIcon" /></div>
					<div className="mb-6"><Input type="email" placeholder="Логин" icon="EditIcon" /></div>
					<div className="mb-6"><PasswordInput /></div>
					<div className={ProfileStyles.buttons}>
						Отмена
						<Button type="primary">Сохранить</Button>
					</div>
				</section>
				<p className={[ProfileStyles.notice, "text", "text_type_main-default text_color_inactive"].join(" ")}>В этом разделе вы можете<br/>
				изменить свои персональные данные</p>
			</div>
		</div>
	);
}

export default Profile