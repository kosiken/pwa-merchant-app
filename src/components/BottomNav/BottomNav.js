import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './BottomNav.scss'
import IconButton from '../IconButton/IconButton'
import { FiHome as HomeIcon, FiUser as UserIcon, FiFileText as PaperIcon } from 'react-icons/fi'
const BottomNav = () => {
    const location = useLocation();
    return (
        <div className="bottom-nav">

            <Link to="/">
                <IconButton active={location.pathname === '/'}>
                    <HomeIcon />
                </IconButton>
            </Link>

            <Link to="/notifications">
                <IconButton active={location.pathname === '/notifications'}>
                    <PaperIcon />
                </IconButton>
            </Link>

            <Link to="/customers">
                <IconButton active={location.pathname === '/customers'}>
                    <UserIcon />
                </IconButton>
            </Link>

        </div>
    )
}

export default BottomNav
