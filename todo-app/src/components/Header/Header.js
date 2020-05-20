import React from 'react';
import { Link } from "react-router-dom";
import './Header.css'

export default function Header() {
    return(
        <div className='header__container'>
            <h1>Welcome to this todo-app!</h1>
            <nav className='header__nav' >
                <Link to='/' className='header__link__home'>Home</Link>
                <Link to='/boards' className='header__link__boards'>Boards</Link>
            </nav>
        </div>
    )
}