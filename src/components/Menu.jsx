import React from 'react';
import './css/Menu.scss';
const Menu = ({ items, defaultSelectedKeys, onClick }) => {
  return (
    <ul className="menu">
      {items.map(item => (
        <li key={item.key} className={`menu-item ${defaultSelectedKeys === item.key ? 'active' : ''}`} onClick={() => onClick(item)}>
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export { Menu };