import React, { useState } from 'react';
import { History } from 'history';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector, useDispatch } from '../../utils/hooks';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { authUser } from '../../services/actions/user';
import { PASS_RESET_STEP2_SUCCESS_AFTER } from '../../services/actions/user-details';

import PagesStyles from '../../pages/page.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import type { TRootState } from '../../index';

interface IHistory extends History {
	location: {
		pathname: string;
		search: string;
		hash: string;
		state: any;
	};
}

const LoginForm = () => {

	const dispatch = useDispatch();
	const history:IHistory = useHistory();
	const { isAuthorizing, isAuthorized, isPasswordReset } = useSelector( store => ({
		isAuthorizing: store.user.isAuthorizing,
		isAuthorized: store.user.isAuthorized,
		isPasswordReset: store.userDetails.isPasswordReset,
	}));

	if ( isPasswordReset ){
		// если стоит флаг, что сброшен пароль - значит, юзер пришел с формы /reset-password (второй шаг)
		// надо его сбросить, чтобы юзер смог второй раз пройти на восстановление пароля
		// можно сделать это через location.state, но надежней через флаг в Redux
		dispatch({ type: PASS_RESET_STEP2_SUCCESS_AFTER })
	}

	const [state, setState] = useState({
		notReady: true,
		noticeShown: false,
	    user: {
	    	email: '',
	    	password: '',
	    	name: '',
	 		}, 
	 		goTo: history.location && history.location.state && history.location.state.goto ? history.location.state.goto : '/profile',
	  });
  
	// TODO объединить попробовать
  const changeHandle = (event:React.ChangeEvent<HTMLInputElement>) => {
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
	const submitHandle = (event:React.SyntheticEvent) => {
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
				<form onSubmit={submitHandle}>
					<h1 className="text text_type_main-medium mb-6">Вход</h1>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input type="email" placeholder="Email" name="email" onChange={changeHandle} value={state.user.email} /></div>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><PasswordInput name="password" onChange={changeHandle} value={state.user.password} /></div>
					<Button type="primary" size="large" >{ !isAuthorizing ? (<span>Войти</span>) : (<span>Ожидаем ответ сервера</span>) }</Button>
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