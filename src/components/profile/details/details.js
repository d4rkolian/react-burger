import { React, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, setUserInfo, PROFILE_WAS_UPDATED } from '../../../services/actions/profile'; 
import { Input, PasswordInput, Button, EditIcon, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { dots } from '../../../utils';
import Styles from './details.module.css';

export const ProfileDetails = () => {

	const { isLoading, isLoaded, user, isUpdating, isUpdated } = useSelector(store => ({
		isLoading: store.profile.isLoading,
		isLoaded: store.profile.isLoaded,
		user: store.profile.user,
		isUpdating: store.profile.isUpdating,
		isUpdated: store.profile.isUpdated,
	}));
	const sectionClassName = isLoading ? [Styles.details, Styles.empty].join(" ") : Styles.details;
	const dispatch = useDispatch();
	const emailRef = useRef();
	const nameRef = useRef();

	const [state, setState] = useState({
		name: {
			editable: false,
			value: '',
		},
		email: {
			editable: false,
			value: '',
		}
	});

	useEffect(() => {
		// получаем данные с сервера после загрузки страницы
		if ( !isLoaded ) {
			dispatch(getUserInfo());	
		}	
	},[]);

	const fieldEnable = (event) => {

		const inputName = event.currentTarget.getAttribute("makeeditable");
		// получаем поле ввода
		const input = event.currentTarget.parentNode.querySelectorAll("[name='"+inputName+"']")[0];
		
		// если мы уже включали это поле
		if ( state[inputName].editable ) {
			input.setAttribute('disabled', true);
			input.classList.add('input__textfield-disabled');
			setState({
				...state,
				[event.currentTarget.getAttribute("makeeditable")]:{
					...state[event.currentTarget.getAttribute("makeeditable")],
					editable: false,
					value: '',
				}
			});
			return true;
		}

		// работаем с полем ввода
		input.removeAttribute('disabled');
		input.classList.remove('input__textfield-disabled');
		input.value = '';
		
		setState({
			...state,
			[event.currentTarget.getAttribute("makeeditable")]:{
				...state[event.currentTarget.getAttribute("makeeditable")],
				editable: true,
			}
		});

		event.preventDefault();
		event.stopPropagation();
	}

	const cancelChanges = () => {
		emailRef.current.setAttribute('disabled', true);
		emailRef.current.classList.add('input__textfield-disabled');
		nameRef.current.setAttribute('disabled', true);
		nameRef.current.classList.add('input__textfield-disabled');

		setState({
			email: {
				editable: false,
				value: '',
			},
			name: {
				editable: false,
				value: '',
			}
		})
	}

	// хук после успешного обновления данных
	if ( isUpdated ) {
		cancelChanges();
		dispatch({ type: PROFILE_WAS_UPDATED });
	}

	// TODO объединить попробовать
  const changeHandle = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		setState({
    	...state,
      [name]: {
      	...state[name],
      	value: value,
      }
     });
	} 

	const userUpdate = (event) => {
		const newUser = {
			name: state.name.value !== '' ? state.name.value : user.name,
			email: state.email.value !== '' ? state.email.value : user.email,
		}
		dispatch(setUserInfo(newUser));
		event.preventDefault();
	}

	return (
		<>
			<section className={sectionClassName}>
				{ isLoaded && (
						<form onSubmit={userUpdate}>
							<div className={[Styles.fieldcontainer, "mb-6"].join(" ")}>
								<Input type="text" placeholder="Имя" value={!state.name.editable ? user.name : state.name.value} name="name" ref={nameRef} onChange={changeHandle} disabled />
								<div className={Styles.iconwrap} onClick={fieldEnable} makeeditable="name">
									{ !state.name.editable ? (<EditIcon type="primary" />) : (<CloseIcon type="primary" />) }
								</div>
							</div>
							<div className={[Styles.fieldcontainer, "mb-6"].join(" ")}>
								<Input type="email" placeholder="Логин" value={!state.email.editable ? user.email : state.email.value} name="email" ref={emailRef} onChange={changeHandle} disabled  />
								<div className={Styles.iconwrap} onClick={fieldEnable} makeeditable="email">
									{ !state.email.editable ? (<EditIcon type="primary" />) : (<CloseIcon type="primary" />) }
								</div>
							</div>
							<div className={[Styles.fieldcontainer, "mb-6"].join(" ")}><PasswordInput value="" onChange={changeHandle} disabled  /></div>
							{ state.name.editable || state.email.editable ? (
								<div className={Styles.buttons}>
									<div className={[Styles.cancel, "mr-5"].join(" ")} onClick={cancelChanges}>
										Отмена
									</div>
									<Button type="primary">{ !isUpdating ? (<span>Сохранить</span>) : (<span>Обновляем данные</span>) }</Button>
								</div>
							) : null}
							
						</form>
					)}
				{ isLoading && ( <span>Ожидаем ответ сервера&nbsp;<span id="wait"></span></span> ) }
				
			</section>
			<p className={[Styles.notice, "text", "text_type_main-default text_color_inactive"].join(" ")}>В этом разделе вы можете<br/>
			изменить свои персональные данные</p>
		</>
	);
}