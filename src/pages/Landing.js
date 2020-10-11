import React from 'react';
import { Container, Nav, Row, Col, Image } from 'react-bootstrap';
import { Button, Typography } from '../components';
import { Link } from 'react-router-dom';
import landing1 from '../assets/landing1.svg';
import landing2 from '../assets/landing2.svg';

import landing3 from '../assets/landing3.svg';
import landing4 from '../assets/landing4.svg';
import { IconButton } from '@material-ui/core';
import { FiInstagram as InstagramIcon } from 'react-icons/fi';
import {
  FaFacebookF as FacebookIcon,
  FaTwitter as TwitterIcon,
} from 'react-icons/fa';
//
//

const links = [
  {
    url: '/',
    name: 'Home',
  },
  {
    url: '/about',
    name: 'About',
  },
  {
    url: '/contact',
    name: 'Contact',
  },
  {
    url: '/signup',
    name: 'Sign Up',
    button: true,
  },
];

const Socials = [
  {
    url: 'https://facebook.com/',
    name: 'Facebook',
    icon: <FacebookIcon />,
  },
  {
    url: 'https://twitter.com/',
    name: 'Twitter',

    icon: <TwitterIcon />,
  },
  {
    url: 'https://instagram.com/',
    name: 'Instagram',
    icon: <InstagramIcon />,
  },
];

const LandingPage = () => {
  return (
    <div>
      <Container className="margino pt-5 pb-3">
        <Row
          className="m-0"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Col xs={12} md={6} lg={6}>
            <Typography
              title
              className="mb-4"
              style={{
                fontSize: '63px',
                fontWeight: '700',
                lineHeight: '67px',
              }}
            >
              {' '}
              Change How You Deliver Food. For Good.
            </Typography>
            <Typography>
              Do you need to deliver your meals to customers? 500dash gets your
              meals delivered with speed and care.
            </Typography>{' '}
            <Link to={'/login'}>
              <Button color="outlined">Place an Order</Button>
            </Link>
          </Col>

          <Col
            xs={12}
            md={6}
            lg={6}
            className="mt-3"
            style={{ textAlign: 'center' }}
          >
            <Image className="landingImg" src={landing1} />
          </Col>
        </Row>{' '}
      </Container>

      <Container className="margino pt-5">
        <Row
          className="m-0"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Col xs={12} md={6} lg={6}>
            <Typography
              title
              className="mb-4"
              style={{
                fontSize: '45px',
                fontWeight: '700',
                lineHeight: '57px',
              }}
            >
              {' '}
              Your Favourite Delivery Partner
            </Typography>
            <Typography>
              We know how hard it it to run delivery and logistics for your food
              business all by yourself.
            </Typography>
            <Typography>
              That’s why we started 500dash, in a few clicks you can dispatch as
              many riders as you need to serve your orders.
            </Typography>{' '}
          </Col>

          <Col xs={12} md={6} lg={6} style={{ textAlign: 'center' }}>
            <Image className="landingImg" src={landing2} />
          </Col>
        </Row>{' '}
      </Container>

      <div className="margino blue">
        {' '}
        <Container className="pt-5 pb-5">
          <Row
            className="m-0"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {' '}
            <Col xs={12} md={6} lg={6} style={{ textAlign: 'center' }}>
              <Image className="landingImg" src={landing3} />
            </Col>
            <Col xs={12} md={6} lg={6}>
              <Typography
                title
                className="mb-4"
                style={{
                  fontSize: '45px',
                  fontWeight: '700',
                  lineHeight: '57px',
                }}
              >
                {' '}
                We Never Say Never
              </Typography>
              <Typography>
                We are always ready to fulfil your orders even if they come at
                the very last minute.
              </Typography>
              <Typography>You can count on us to be ever ready.</Typography>
              <Link to={'/login'}>
                <Button color="outlined">Place an Order</Button>
              </Link>
            </Col>
          </Row>{' '}
        </Container>
      </div>

      <Container className="pt-5">
        <Row
          className="m-0"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Col xs={12} md={6} lg={6}>
            <Typography
              title
              className="mb-4"
              style={{
                fontSize: '45px',
                fontWeight: '700',
                lineHeight: '57px',
              }}
            >
              Need a Plus One ASAP?
            </Typography>
            <Typography>
              Running your own delivery fleet? No problem.
            </Typography>
            <Typography>
              If you ever happen to need a couple extra wheels to get to some
              distant customer in time, just tell us where.
            </Typography>{' '}
          </Col>{' '}
          <Col xs={12} md={6} lg={6} style={{ textAlign: 'center' }}>
            <Image className="landingImg" src={landing4} />
          </Col>
        </Row>{' '}
      </Container>

      <div className="margino pt-5  blue">
        {' '}
        <Container
          className="pb-5 mt-3"
          style={{ textAlign: 'center', maxWidth: '700px' }}
        >
          <Typography
            title
            className="mb-4"
            style={{
              fontSize: '45px',
              fontWeight: '700',
              lineHeight: '57px',
            }}
          >
            We’ve Solved the Delivery Equation for you
          </Typography>

          <Typography>
            Running food deliver is rocket science.
            <br />
            But we’ve figured it all out for you.{' '}
          </Typography>

          <Link to={'/login'}>
            <Button color="outlined">Get Started</Button>
          </Link>
        </Container>
      </div>

      <div style={{ background: '#40BCD8', color: '#ffffff' }}>
        <Container>
          <div
            className="flex"
            style={{
              padding: '.5rem 1rem',

              alignItems: 'center',
            }}
          >
            <Typography className="m-0"> &copy; 2020 500Chow Ltd. </Typography>
            <Typography
              className="mb-0"
              style={{
                fontSize: '1.5em',
                fontWeight: '700',
                lineHeight: '57px',
                marginLeft: '20%',
              }}
            >
              500dash
            </Typography>
          </div>
          <div
            className="flex-md pt-2"
            style={{
              borderTop: '1px solid #ffffff',
              alignItems: 'center',
            }}
          >
            <Nav
              style={{
                flex: '1',
              }}
            >
              {links.slice(0, 3).map((link, index) => {
                return (
                  <Nav.Item key={'footer-link' + index}>
                    <Link to={link.url} className={'nav-link nav-white'}>
                      <Typography inline>{link.name}</Typography>
                    </Link>
                  </Nav.Item>
                );
              })}
            </Nav>
            <Nav
              style={{
                flex: '1',
              }}
              className="justify-content-end"
            >
              {Socials.map((link, index) => {
                return (
                  <Nav.Item key={'footer-link' + index}>
                    <Link href={link.url} className={'nav-link nav-white'}>
                      <IconButton
                        aria-label={link.name}
                        style={{
                          color: '#ffffff',
                        }}
                      >
                        {link.icon}
                      </IconButton>
                    </Link>{' '}
                  </Nav.Item>
                );
              })}
            </Nav>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
