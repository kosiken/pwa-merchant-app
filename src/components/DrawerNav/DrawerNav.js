import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Container, Row, Col, Image } from 'react-bootstrap';
import {
  FiHome as HomeIcon,
  FiUsers as UserIcon,
  FiFileText as PaperIcon,
  FiShoppingBag as ShoppingBag,
  FiDatabase as Database,
} from 'react-icons/fi';

import avatar from '../../assets/avatar.png';
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
  {
    url: '/meals',
    name: 'Meals',
    icon: <Database />,
  },
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
  const {pathname} = useLocation();
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
      <Container
        className="p-2"
        style={{
          marginTop: '1em',
        }}
      >
        <Row>
          <Col xs={3} md={4}>
            <Image
              src={avatar}
              style={{
                width: '50px',
              }}
              roundedCircle
            />
          </Col>
          <Col xs={8} md={8}>
            <Row>
              <Typography
                title
                style={{
                  fontSize: '18px',
                }}
              >
                {name}
              </Typography>
            </Row>
            <Row>
              <Typography>{email}</Typography>
            </Row>
          </Col>
        </Row>
      </Container>
      <hr />
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
      <hr />
      <Button
        full
        style={{
          margin: '0 auto',
        }}
        onClick={logOut}
      >
        Log Out
      </Button>
    </aside>
  );
};

export default DrawerNav;