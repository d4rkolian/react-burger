import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { authUser } from '../../services/actions/user';

import PagesStyles from '../../pages/page.module.css'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const LoginForm = () => {

	const dispatch = useDispatch();
	const { isAuthorizing, isAuthorized } = useSelector( store => ({
		isAuthorizing: store.user.isAuthorizing,
		isAuthorized: store.user.isAuthorized,
	}));

	console.log(isAuthorized);

	const history = useHistory();
	if (isAuthorized) {
		console.log('авторизован');
	}

	const [state, setState] = useState({
		notReady: true,
		noticeShown: false,
    user: {
    	email: '',
    	password: '',
 		} 
  })

	// TODO объединить попробовать
  const changeHandle = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		setState({
    	...state,
    	user: {
    		...state.user,
       [name]: value
    	},
    	notReady: state.user.name !== '' && state.user.email !== '' && state.user.password !== '' ? false : true,
     });
	} 

	// TODO тоже попробовать объединить
	const userClickHandle = (event) => {
		event.preventDefault();
		if ( state.notReady ) {
			setState({
				...state,
				noticeShown: true,
			});
		} else {
			setState({
				...state,
				noticeShown: false,
			});
			const userData = state.user;
			dispatch(authUser(userData));
		}
	}

	return (
		<div className={PagesStyles.emptypagewrapper}>
			<div className={PagesStyles.formcontainer}>
				<form>
					<h1 className="text text_type_main-medium mb-6">Вход</h1>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input type="email" placeholder="Email" name="email" onChange={changeHandle} value={state.user.email} /></div>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><PasswordInput name="password" onChange={changeHandle} value={state.user.password} /></div>
					<Button type="primary" size="large" onClick={userClickHandle} >{ !isAuthorizing ? (<span>Войти</span>) : (<span>Ожидаем ответ сервера</span>) }</Button>
					{ state.noticeShown && (
						<p className="text text_type_main-small text_type_main-default text_color_inactive mt-2">Введите email и пароль</p>
					)}
				</form>
				<p className="text text_type_main-default text_color_inactive">Вы &mdash; новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
				<p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
			</div>
		</div>
	);
}

export default LoginForm