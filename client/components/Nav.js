import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <div id='navflex'>
            <Link to='/zodiac'>
            <div id='zodiac'>
            <img src='/zodiacnav.png'/>
            </div>
            </Link>

            <div id='crushdetector'></div>

            <Link to='/'>
            <div id='basic'> 
            <img src='/basicnav.png'/>
            </div>
            </Link>
        </div>
    )
}
