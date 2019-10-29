import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
    return (
        <header className='header'>
            <div className='home-icon-box'>
                <Link to='/'><img className='home-icon' src='/styles/images/robot.svg'/></Link>
            </div>
            <h1 className='header__title'> <Link to = '/'> movieview</Link></h1>
            <div className='header__buttons'>
                <button className='btn-border header__btn btn-login'>Login</button>
                <button className='btn-border header__btn btn-singup'>sing up</button>
            </div>
        </header>
    )
}

export default Header