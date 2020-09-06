import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Container, Row } from 'react-bootstrap';
import {
  FiHome as HomeIcon,
  FiUsers as UserIcon,
  FiFileText as PaperIcon,
  FiShoppingBag as ShoppingBag,
  // FiDatabase as Database,
} from 'react-icons/fi';

let links = [
  {
    url: '/',
    name: 'Home',
    icon: <HomeIcon />,
  },
  {
    url: '/FoodItems',
    name: 'Food Items',
    icon: <PaperIcon />,
  },
  // {
  //   url: '/meals',
  //   name: 'Meals',
  //   icon: <Database />,
  // },
  {
    url: '/orders',
    name: 'Orders',
    icon: <ShoppingBag />,
  },
  {
    url: '/customers',
    name: 'Customers',
    icon: <UserIcon />,
  },
];

const DrawerNav = ({ children }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { email, name } = useSelector((state) => {
    return {
      name: state.auth.user.name,
      email: state.auth.user.email_address,
    };
  });
  const logOut = () => {
    dispatch({
      type: 'LOGOUT_USER',
    });
  };

  return (
    <aside className="side-nav hide" id="drawer">
      <section
        className="p-4"
        style={{
          backgroundColor: '#011627',
          color: '#fff',
        }}
      >
        <Container className="p-2">
          <Typography
            title
            className="mb-2"
            style={{
              color: '#ffdc4a',
              lineHeight: '1.2em',
              fontWeight: '600',
            }}
          >
            500 Dash
          </Typography>
          <Row className="m-0 pl-2">
            <Typography
              title
              style={{
                fontSize: '18px',
              }}
            >
              {name}
            </Typography>
          </Row>
          <Row className="m-0 pl-2">
            <Typography small>{email}</Typography>
          </Row>
        </Container>
        <Button full onClick={logOut}>
          Log Out
        </Button>
      </section>

      <br />
      <Nav className="flex-column h-80">
        {links.map((link, i) => (
          <Link
            to={link.url}
            className={
              'nav-link ml flex-row center ' +
              (pathname === link.url ? 'active' : '')
            }
            key={'link' + i}
          >
            <span
              style={{
                marginRight: '15px',
              }}
            >
              {link.icon}
            </span>
            <Typography inline>{link.name}</Typography>
          </Link>
        ))}
      </Nav>
    </aside>
  );
};

export default DrawerNav;
