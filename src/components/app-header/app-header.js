import React from 'react';
import Nav from '../nav/nav';
import headerStyles from './app-header.module.css';

class AppHeader extends React.Component {
  render() {
    return (
      <header>
		  	<Nav />
      </header>
    );
  }
}

export default AppHeader;