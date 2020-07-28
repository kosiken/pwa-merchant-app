import React from 'react'
import { Link } from 'react-router-dom'
import './TopBar.scss'
import IconButton from '../IconButton/IconButton'

import { FiMoreVertical as MoreIcon } from 'react-icons/fi'
import logo from "../assets/logo-variant.png";

const TopBar = () => {
    return (
        <div className="top-bar flex">
            <Link to="/">
                <img
                    alt=""
                    src={logo}
                    width="60"
                    height="60"

                />
            </Link>
            <IconButton>
                <MoreIcon />
            </IconButton>
        </div>
    )
}

export default TopBar
