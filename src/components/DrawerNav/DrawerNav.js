import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Typography from '../Typography/Typography';

let links = [
  {
    url: '/',
    name: 'Home',
  },
  {
    url: '/FoodItems',
    name: 'Food Items',
  },
  {
    url: '/meals',
    name: 'Meals',
  },

  {
    url: '/customers',
    name: 'Customers',
  },
];

const DrawerNav = ({ children }) => {
  const location = useLocation();
  return (
    <div className="h-100">
      <div className="row h-100" style={{
        maxWidth:'100vw'
      }}>
        <div
          className="col-5 col-md-3 collapse-sm m-0 p-0 "
          style={{
            maxWidth: '240px',
            borderRight: '1px solid rgb(238, 238, 238)',
          }}
          id="drawer"
        >
          <ul
            className="nav flex-column   sticky-top"
            style={{
              paddingInlineStart: '1em',
            }}
          >
            {links.map((link, i) => (
              <li className="nav-item" key={'link' + i}>
                <Link
                  to={link.url}
                  className={
                    'nav-link ' +
                    (location.pathname === link.url ? 'active' : '')
                  }
                >
                  <Typography>{link.name}</Typography>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col ">
          <div className="row">
            <div class="col-12 p-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerNav;
