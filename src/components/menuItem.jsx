import React from 'react';

function MenuItem({link, title}){
    return (
        <div className='menuItemContainer'>
          <a className='menuItem' href={link}>
            {title}
          </a>
        </div>
    );
}

export default MenuItem;