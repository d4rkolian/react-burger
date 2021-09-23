import { React, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../services/actions/user';
import { ProfileNavigation } from '../nav-profile/nav-profile'; 
import { ProfileDetails } from './details/details';
import { OrdersList } from './orders-list/orders-list';
import PagesStyles from '../../pages/page.module.css';
import ProfileStyles from './profile.module.css';
import type { TRootState } from '../../index';

const Profile:FC = (props:{ child:string }) => {

	const dispatch = useDispatch();
	const { isLoggingOut } = useSelector( (store:TRootState) => ({
		isLoggingOut: store.user.isLoggingOut,
	})); 

	const logOutHandle = (e) => {
		e.preventDefault();
		dispatch(logOut());
	}

	const component = props.child === 'orders' ? <OrdersList /> : <ProfileDetails />

	return (
		<div className={PagesStyles.emptypagewrapper}>
			<div className={ProfileStyles.profilecontainer}>
				<ProfileNavigation isLoggingOut={isLoggingOut} logOutHandle={logOutHandle} />
				{ component }
			</div>
		</div>
	);
}

export default Profile