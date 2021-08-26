import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../../services/actions/profile'; 
import { Input, PasswordInput, Button, EditIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { dots } from '../../../utils';
import Styles from './details.module.css';

export const ProfileDetails = () => {

	const { isLoading, isLoaded, user } = useSelector(store => ({
		isLoading: store.profile.isLoading,
		isLoaded: store.profile.isLoaded,
		user: store.profile.user
	}));
	const sectionClassName = isLoading ? [Styles.details, Styles.empty].join(" ") : Styles.details;
	const dispatch = useDispatch();

	useEffect(() => {
		// получаем данные с сервера после загрузки страницы
		if ( !isLoaded ) {
			dispatch(getUserInfo());	
		}	
	},[]);

	const fieldEnable = (e) => {
		e.stopPropagation();
		
	}

	return (
		<>
			<section className={sectionClassName}>
				{ isLoaded && (
						<>
							<div className={[Styles.fieldcontainer, "mb-6"].join(" ")}><Input type="text" placeholder="Имя" value={user.name} disabled  /><EditIcon type="primary" /></div>
							<div className={[Styles.fieldcontainer, "mb-6"].join(" ")}><Input type="email" placeholder="Логин" value={user.email} disabled /><EditIcon type="primary" /></div>
							<div className={[Styles.fieldcontainer, "mb-6"].join(" ")}><PasswordInput value="" disabled  /></div>
							<div className={Styles.buttons}>
								Отмена
								<Button type="primary">Сохранить</Button>
							</div>
						</>
					)}
				{ isLoading && ( <span>Ожидаем ответ сервера&nbsp;<span id="wait"></span></span> ) }
				
			</section>
			<p className={[Styles.notice, "text", "text_type_main-default text_color_inactive"].join(" ")}>В этом разделе вы можете<br/>
			изменить свои персональные данные</p>
		</>
	);
}