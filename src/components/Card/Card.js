import React from 'react';
import { Image } from 'react-bootstrap';

import Typography from '../Typography/Typography';
//import { useSnackbar } from 'notistack';
import mastercard from '../../assets/stp_card_mastercard.png';
import card_unknown from '../../assets/stp_card_unknown.png';
import visa from '../../assets/stp_card_visa.png';

const Icons = {
  mastercard,

  visa,
};

function getCardIcon(card) {
  let card_type;
  try {
    card_type = /^(\w+)\s/.exec(card)[1];
  } catch (err) {
    console.log(err);
    card_type = 'card_unknown';
  }
  return Icons[card_type] || card_unknown;
}

const Card = ({ card, loader }) => {
  if (loader) {
    return (
      <div
        className="flex mb-3"
        style={{
          alignItems: 'center',
        }}
      >
        <section
          className="placeload-background"
          style={{ width: '65px', height: '40px' }}
        />
        <section style={{ flexGrow: 1 }} className="pl-2">
          {' '}
          <section
            style={{ width: '200px' }}
            className="placeload-background"
          />
          <section
            style={{ width: '100px', height: '8px' }}
            className="mt-2 placeload-background"
          />
        </section>
      </div>
    );
  }
  return (
    <div
      className="hv flex mb-3 p-2"
      style={{
        alignItems: 'center',
      }}
    >
      <section>
        <Image
          src={getCardIcon(card.card_type)}
          style={{ width: '65px', height: '40px' }}
        />
      </section>
      <div style={{ flexGrow: 1 }} className="pl-2">
        <Typography
          bold
          className="m-0"
          style={{
            fontSize: 14,
          }}
        >
          {'**** **** **** ' + card.last4}
        </Typography>
        <Typography small variant="gray">
          {card.bank_code}
        </Typography>
      </div>
    </div>
  );
};

export default Card;
