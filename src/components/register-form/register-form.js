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
     name: '',
     email: '',
     password: '',
  })

	const userClickHandle = (event) => {
		event.preventDefault();
		console.log('надо получить данные');
		console.log(state);
		dispatch(createUser());
	}

	const changeHandle = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		setState({
    	...state,
       [name]: value
     });
	} 

	return (
		<div className={PagesStyles.emptypagewrapper}>
			<div className={PagesStyles.formcontainer}>
				<form id="registrationform">
					<h1 className="text text_type_main-medium mb-6">Регистрация</h1>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input placeholder="Имя" name="name" value={state.name} onChange={changeHandle} /></div>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input type="email" name="email" placeholder="Email" value={state.email} onChange={changeHandle} /></div>
					<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><PasswordInput name="password" value={state.password} onChange={changeHandle} /></div>
					<Button type="primary" size="large" onClick={userClickHandle}>{ !isCreating ? (<span>Зарегистрироваться</span>) : (<span>Подождите, выполняем запрос</span>) }</Button>
				</form>
				<p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to="/login">Войти</Link></p>
			</div>
		</div>
	);
}

export default RegistrationForm