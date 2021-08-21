import React from 'react';
import { Link } from 'react-router-dom';
import PagesStyles from '../../pages/page.module.css'

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const LoginForm = () => {
	return (
		<div className={PagesStyles.emptypagewrapper}>
			<div className={PagesStyles.formcontainer}>
				<form>
					<h1 className="text text_type_main-medium mb-6">Вход</h1>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input type="email" placeholder="Email" /></div>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><PasswordInput /></div>
					<Button type="primary" size="large">Войти</Button>
				</form>
				<p className="text text_type_main-default text_color_inactive">Вы &mdash; новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
				<p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
			</div>
		</div>
	);
}

export default LoginForm