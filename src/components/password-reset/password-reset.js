import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { passReset } from '../../services/actions/user-details';
import PagesStyles from '../../pages/page.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';


const PasswordReset = (props) => {

	const dispatch = useDispatch();
	const history = useHistory();
	const [state, setState] = useState({
		notReady: true,
		noticeShown: false,
		email: '',
		password: '',
		token: '',
  })
  
  const { isPasswordRequested, stepTwoAllowed, isPasswordReset } = useSelector( store => ({
  	isPasswordRequested: {
  		step1: store.userDetails.isPasswordRequested.step1,
  		step2: store.userDetails.isPasswordRequested.step2,
  	},
  	stepTwoAllowed: store.userDetails.stepTwoAllowed,
  	isPasswordReset: store.userDetails.isPasswordReset,
  }));

  if ( stepTwoAllowed && props.step !== 'second' ) {
  	return <Redirect to="/reset-password" />;
  }
  if ( isPasswordReset ){
  	return <Redirect to="/login" />;
  	//history.push({ pathname: '/login' }); return true;
  }

	// TODO объединить попробовать
  const changeHandle = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		setState({
    	...state,
      [name]: value,
    	notReady: props.step === 'first' && state.email !== '' 
    		? false : props.step  === 'first' && state.email === ''
    		? true : props.step === 'second' && state.password !== ''
    		? false : true,
     });
	} 

	// TODO тоже попробовать объединить
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
			dispatch(passReset(state,props.step));
		}
	}

	return (
			<div className={PagesStyles.emptypagewrapper}>
				<div className={PagesStyles.formcontainer}>
					<form onSubmit={submitHandle}>
						<h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
						{ props.step && props.step === 'first' ? (
							<>
								<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input type="email" value={state.email} onChange={changeHandle} name="email" placeholder="Укажите email" /></div>
								<Button type="primary" >{ !isPasswordRequested.step1 ? (<span>Восстановить</span>) : (<span>Ждем ответ сервера</span>) }</Button>
								{ state.noticeShown && (
									<p className="text text_type_main-small text_type_main-default text_color_inactive mt-2">Введите email</p>
								)} 
							</>
						) : props.step === 'second' && stepTwoAllowed ? (
							<>
								<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><PasswordInput type="password" name="password" onChange={changeHandle} value={state.password} placeholder="Введите новый пароль" /></div>
								<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input type="text" placeholder="Введите код из письма" name="token" onChange={changeHandle} value={state.token} /></div>
								<Button type="primary" >{ !isPasswordRequested.step2 ? (<span>Сохранить</span>) : (<span>Ждем ответ сервера</span>) }</Button>
								{ state.noticeShown && (
									<p className="text text_type_main-small text_type_main-default text_color_inactive mt-2">Введите новый пароль</p>
								)} 
							</>
						) : (
							<Redirect to="/" />
						) }
					</form>
					<p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to="/login">Войти</Link></p>
				</div>
			</div>
		);
}

PasswordReset.propTypes = {
	step: PropTypes.string.isRequired,
}
export default PasswordReset

