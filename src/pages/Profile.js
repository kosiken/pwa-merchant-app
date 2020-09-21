import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Typography, Button,
HtmlTooltip, Toast } from '../components';
import { HelpInfo } from '../constants';
import {
  FiInfo as InfoIcon,
  // FiUser as UserIcon,
  // FiDatabase as Database,
} from 'react-icons/fi';



const Profile = () => {
  const user = useSelector((state) => state.auth.user); const dispatch = useDispatch();
  const logOut = () => {
    dispatch({
      type: 'LOGOUT_USER',
    });
  };

  return (
    <div>
    
                <Toast color="secondary">
       <Container >   
       
       <div className="mb-3 flex" style={{alignItems:'center'}}>
             <Typography bold inline>
            <InfoIcon />
          </Typography>
        <Typography className="m-0 pl-2">
          We would not use your information without consent
        </Typography>
        </div>
          </Container>
          
        </Toast>
      <Container className="mt-4" style={{
      maxWidth:'500px'
      }}>

        <Typography title className="mb-2">
          Identification Details
        </Typography>

        <Typography inline bold>
          Name
        </Typography>
        <Typography> {user.name}</Typography>
        <Typography inline bold>
          Email address
        </Typography>
        <Typography> {user.email_address}</Typography>
        <Typography inline bold>
          Phone number
        </Typography>
        <Typography>
          {' '}
          {user.phone_number || 'No registered phone number'}
        </Typography>
        <hr />

        <Typography title className="mb-2">
          Location Details{' '}
        </Typography>
        
                  <HtmlTooltip
            title={<Typography inline>{HelpInfo.Location}</Typography>}
            placement="right"
          >
            <div style={{ display: 'inline-block' }}>
              <Typography inline bold>Pickup Address</Typography>
            </div>
          </HtmlTooltip>
          
               <Typography>
         
          {user.addresss || 'No registered addresss'}
        </Typography>       
         <hr />

        <Typography title className="mb-2">
         Payment Details{' '}
        </Typography>
            <Typography inline bold>
          Wallet Balance
        </Typography>
        
                <Typography>
         
          {user.wallet_balance || 'NGN0.00'}
        </Typography> 
        
        <Button full  onClick={logOut}>Logout</Button>
      </Container>
    </div>
  );
};

export default Profile;
