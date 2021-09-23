import React from 'react';
import Nav from '../nav/nav';
import headerStyles from './app-header.module.css';

function AppHeader() {
	return (
	  <header className={headerStyles.stellarHeader}>
		  	<Nav />
	  </header>
	);
}

export default AppHeader;