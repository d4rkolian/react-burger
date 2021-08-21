import React from 'react';
import { Link } from 'react-router-dom';
import PagesStyles from '../../pages/page.module.css'

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const RegistrationForm = () => {
	return (
		<div className={PagesStyles.emptypagewrapper}>
			<div className={PagesStyles.formcontainer}>
				<form>
					<h1 className="text text_type_main-medium mb-6">Регистрация</h1>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input placeholder="Имя" /></div>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input type="email" placeholder="Email" /></div>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><PasswordInput /></div>
					<Button type="primary" size="large">Зарегистрироваться</Button>
				</form>
				<p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to="/login">Войти</Link></p>
			</div>
		</div>
	);
}

export default RegistrationForm