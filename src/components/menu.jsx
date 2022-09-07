import React from "react";
import './colors.css';
import './menu.css';
import MenuItem from './menuItem'

function Menu() {
  const link = '#/login';
  return (
    <div className='menuContainer'>
      <div className='menuItemsContainer'>
        <MenuItem link={link} title={'Fones'}> </MenuItem>

      </div>
    </div>
  );
}

export default Menu;