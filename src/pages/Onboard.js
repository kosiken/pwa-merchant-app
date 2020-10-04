import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { OnboardProgress, Button, Typography, Toast } from '../components';
import { OnboardingSteps } from '../constants';
import CreateCard from './CreateCard';
import welcome from '../assets/welcome.png';
import Customers from './Customers';
import { useSelector } from 'react-redux';

const Onboard = () => {
  const user = useSelector((state) => state.auth.user);

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
    {
      index: 3,
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
    if (currentIndex === 0) {
      pages[0].status = 'done';
    }
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
    pages[3].status = 'active';
    setPages(pages);
    setCurrentIndex(3);
  };

  function renderPage() {
    if (currentIndex === 3) {
      return (
        <>
          <Toast color="info">
            <Typography title className="h4">
              {OnboardingSteps[3].title}
            </Typography>
            <Typography className="m-0">{OnboardingSteps[3].text}</Typography>
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
        <Toast color="info">
          <Typography title className="h4">
            {OnboardingSteps[0].title}
          </Typography>
          <Typography className="m-0">{OnboardingSteps[0].text}</Typography>
          <Button color="clear" onClick={NextClick}>
            Next
          </Button>
        </Toast>
      );
    } else if (currentIndex === 1) {
      return (
        <>
          <Toast color="info">
            {' '}
            <Typography title className="h4">
              {OnboardingSteps[1].title}
            </Typography>
            <Typography className="m-0">{OnboardingSteps[1].text}</Typography>
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
    } else if (currentIndex === 2) {
      return (
        <>
          <Toast color="info">
            <Typography title className="h4">
              {OnboardingSteps[2].title}
            </Typography>
            <Typography className="m-0">{OnboardingSteps[2].text}</Typography>
            <Button color="clear" onClick={NextClick}>
              Next
            </Button>
            <Button color="clear" onClick={skipClick}>
              Skip
            </Button>
          </Toast>

          {user.account_number && (
            <div className="mt-5" style={{ textAlign: 'center' }}>
              <Typography title>Your Personal account number</Typography>
              <p>Use this account number to fund your Wallet</p>
              <Typography style={{ color: '#f0324b', fontSize: '1.5em' }}>
                {user.account_number} - {user.bank_name}
              </Typography>
              <p>Or</p>
            </div>
          )}

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
    </Container>
  );
};

export default Onboard;
