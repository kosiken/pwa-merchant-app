import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Typography from '../Typography/Typography';
import { Nav, Container, Row, Col, Image } from 'react-bootstrap';
import avatar from '../../assets/avatar.png'
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
    <aside className="side-nav hide" id="drawer">
    <Container className="p-2" style={{
    marginTop:'1em'
    }}>
  <Row>
  <Col xs={3} md={4}>
  <Image src={avatar} style={{
  width: '50px'
  }} roundedCircle />
</Col>
  <Col xs={8} md={8}>
    <Row>
    <Typography title style={{
    fontSize:'18px'
    }}>User name</Typography>
     </Row>
         <Row>
    <Typography>user@mail</Typography>
     </Row>
</Col>
  </Row>
  </Container>
  <hr/>
<Nav className="flex-column">
{links.map((link, i) => (
     
     <Link
       to={link.url}
       className={
         'nav-link ' +
         (location.pathname === link.url ? 'active' : '')
        
       }
        key={'link'+i}
     >
       <Typography>{link.name}</Typography>
     </Link>

 ))} 
 
 
</Nav>
  </aside>
  );
};

export default DrawerNav;
