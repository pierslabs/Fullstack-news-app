/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/allfunds.png';

const Header = () => {
  return (
    <nav id='navbar' className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className="container-fluid">
        <NavLink to='/' className='navbar-brand'>
          <img className='App-logo' src={logo} width={40} />
        </NavLink>
        <ul className='navbar-nav'>
          <li className='nav-item mx-2'>
            <NavLink to='/' className='nav-link'>News</NavLink>
          </li>
          <li>
            <NavLink to='/news-archived' className='nav-link mx-2'>Archived</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/create' className='nav-link mx-2'>Create new</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header