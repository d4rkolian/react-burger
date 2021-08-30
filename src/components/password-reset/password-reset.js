import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
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

  if ( stepTwoAllowed ){ history.push({ pathname: '/reset-password' }); } 
  if ( isPasswordReset ){ history.push({ pathname: '/login' }); }

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
			dispatch(passReset(state,props.step));
		}
	}

	return (
			<div className={PagesStyles.emptypagewrapper}>
				<div className={PagesStyles.formcontainer}>
					<form>
						<h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
						{ props.step && props.step === 'first' ? (
							<>
								<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input type="email" value={state.email} onChange={changeHandle} name="email" placeholder="Укажите email" /></div>
								<Link to="/reset-password"><Button type="primary" onClick={userClickHandle} >{ !isPasswordRequested.step1 ? (<span>Восстановить</span>) : (<span>Ждем ответ сервера</span>) }</Button></Link>
								{ state.noticeShown && (
									<p className="text text_type_main-small text_type_main-default text_color_inactive mt-2">Введите email</p>
								)} 
							</>
						) : props.step === 'second' && stepTwoAllowed ? (
							<>
								<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><PasswordInput type="password" name="password" onChange={changeHandle} value={state.password} placeholder="Введите новый пароль" /></div>
								<div className={[PagesStyles.inputcontainer, "mb-6"].join(" ")}><Input type="text" placeholder="Введите код из письма" name="token" onChange={changeHandle} value={state.token} /></div>
								<Link to="/"><Button type="primary" onClick={userClickHandle} >{ !isPasswordRequested.step2 ? (<span>Сохранить</span>) : (<span>Ждем ответ сервера</span>) }</Button></Link>
								{ state.noticeShown && (
									<p className="text text_type_main-small text_type_main-default text_color_inactive mt-2">Введите новый пароль</p>
								)} 
							</>
						) : (
							<p>Нет такого шага восстановления пароля</p>
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

