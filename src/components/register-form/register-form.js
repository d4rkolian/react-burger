import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { createUser } from '../../services/actions/user';

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PagesStyles from '../../pages/page.module.css';

const RegistrationForm = () => {

	const dispatch = useDispatch();
	const { isCreating } = useSelector( store => ({
		isCreating: store.user.isCreating,
	}));

	const [state, setState] = useState({
		notReady: true,
		noticeShown: false,
    user: {
    	name: '',
    	email: '',
    	password: '',
 		} 
  });

	const submitHandle = (event) => {
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
			dispatch(createUser(userData));
		}
	}

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

	return (
		<div className={PagesStyles.emptypagewrapper}>
			<div className={PagesStyles.formcontainer}>
				<form id="registrationform" onSubmit={submitHandle}>
					<h1 className="text text_type_main-medium mb-6">Регистрация</h1>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input placeholder="Имя" name="name" value={state.user.name} onChange={changeHandle} /></div>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input type="email" name="email" placeholder="Email" value={state.user.email} onChange={changeHandle} /></div>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><PasswordInput name="password" value={state.user.password} onChange={changeHandle} /></div>
					<Button type="primary" size="large" >{ !isCreating ? (<span>Зарегистрироваться</span>) : (<span>Подождите, выполняем запрос</span>) }</Button>
					{ state.noticeShown && (
						<p className="text text_type_main-small text_type_main-default text_color_inactive mt-2">Все поля формы обязательны для заполнения</p>
					)} 
				</form>
				<p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to="/login">Войти</Link></p>
			</div>
		</div>
	);
}

export default RegistrationForm