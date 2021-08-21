import React from 'react';
import { Link } from 'react-router-dom';
import PagesStyles from '../../pages/page.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const PasswordReset = (props) => {
	return (
			<div className={PagesStyles.emptypagewrapper}>
				<div className={PagesStyles.formcontainer}>
					<form>
						<h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
						{ props.step && props.step === 'first' ? (
							<>
								<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input type="email" placeholder="Укажите email" /></div>
								<Link to="/reset-password"><Button type="primary">Восстановить</Button></Link>
							</>
						) : props.step === 'second' ? (
							<>
								<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><PasswordInput type="email" placeholder="Введите новый пароль" /></div>
								<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input placeholder="Введите код из письма" /></div>
								<Link to="/"><Button type="primary">Сохранить</Button></Link>
							</>
						) : (
							<p>Неет такого шага восстановления пароля</p>
						) }
					</form>
					<p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to="/login">Войти</Link></p>
				</div>
			</div>
		);
}

export default PasswordReset