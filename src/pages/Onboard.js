import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { OnboardProgress, Button, Typography, Toast } from '../components';

import CreateCard from './CreateCard';

import welcome from '../assets/welcome.png';
import Customers from './Customers';
const Onboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //  const { foodItems } = useSelector((state) => {
  //return {
  //foodItems: state.food.foods || [],
  //};
  //});
  const [pages, setPages] = useState([
    {
      index: 0,
      status: 'active',
    },
    {
      index: 1,
      status: 'pending',
    },
    {
      index: 2,
      status: 'pending',
    },
  ]);
  function changePage(index) {
    if (index === currentIndex) return;
    if (pages[index].status !== 'done') pages[index].status = 'active';
    if (pages[currentIndex].status !== 'done')
      pages[currentIndex].status = 'pending';
    setPages(pages);
    setCurrentIndex(index);
  }
  const NextClick = () => {
    if (pages[currentIndex + 1].status !== 'done')
      pages[currentIndex + 1].status = 'active';
    if (pages[currentIndex].status !== 'done')
      pages[currentIndex].status = 'pending';
    setPages(pages);
    setCurrentIndex(currentIndex + 1);
  };

  const skipClick = () => {
    if (pages[currentIndex].status !== 'done')
      pages[currentIndex].status = 'pending';
    pages[2].status = 'active';
    setPages(pages);
    setCurrentIndex(2);
  };

  function renderPage() {
    if (currentIndex === 2) {
      return (
        <>
          <Toast color="info">
            <Typography title className="h4">
              Welcome
            </Typography>
            <Typography className="m-0">
              Welcome aboard to 500dash, now you've signed up there are a few
              things we want you to do
            </Typography>
          </Toast>
          <div style={{ textAlign: 'center' }}>
            <Image src={welcome} />
            <br /> <br />
            <Link
              to="/home"
              style={{
                display: 'inline-block',
                width: '60%',
                maxWidth: '400px',
              }}
            >
              <Button full> Continue</Button>
            </Link>
          </div>

          <br />
        </>
      );
    } else if (currentIndex === 0) {
      return (
        <>
          <Toast color="info">
            {' '}
            <Typography title className="h4">
              Step Two
            </Typography>
            <Typography className="m-0">
              Welcome aboard to 500dash, now you've signed up there are a few
              things we want you to do
            </Typography>
            <Button color="clear" onClick={NextClick}>
              Next
            </Button>
            <Button color="clear" onClick={skipClick}>
              Skip
            </Button>
          </Toast>
          <Customers
            component
            handleDone={(index) => {
              pages[index].status = 'done';
              pages[index + 1].status = 'active';
              setPages(pages);
              setCurrentIndex(index + 1);
            }}
          />
        </>
      );
    } else if (currentIndex === 1) {
      return (
        <>
          <Toast color="info">
            <Typography title className="h4">
              Step Three
            </Typography>
            <Typography className="m-0">
              Welcome aboard to 500dash, now you've signed up there are a few
              things we want you to do
            </Typography>
            <Button color="clear" onClick={NextClick}>
              Next
            </Button>
            <Button color="clear" onClick={skipClick}>
              Skip
            </Button>
          </Toast>
          <CreateCard
            component
            handleDone={(index) => {
              pages[index].status = 'done';
              pages[index + 1].status = 'active';
              setPages(pages);
              setCurrentIndex(index + 1);
            }}
          />
        </>
      );
    }
  }
  return (
    <Container className="mt-4">
      <OnboardProgress pages={pages} onChange={changePage} />

      {renderPage()}
      <br />
      <Typography
        style={{
          textAlign: 'center',

          display: 'block',
          bottom: '0',
          left: '0',
          width: '100%',
        }}
      >
        {'Made with '}
        <span role="img" aria-label="love">
          ❤️
        </span>
        <span
          style={{
            color: '#f0324b',
          }}
        >
          {' 500Chow'}
        </span>
      </Typography>
    </Container>
  );
};

export default Onboard;
