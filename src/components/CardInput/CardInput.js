import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';

import validator from 'card-validator';
import Input from '../Input/Input';
//import { useSnackbar } from 'notistack';
import mastercard from '../../assets/stp_card_mastercard.png';
import card_unknown from '../../assets/stp_card_unknown.png';
import visa from '../../assets/stp_card_visa.png';

import useDebounce from '../../hooks/useDebounce';
const Icons = {
  mastercard,
  card_unknown,
  visa,
};

const useValidate = (cardNumber) => {
  const [isValid, setValid] = useState(true);
  const [isPotentiallyValid, setPotentiallyValid] = useState(true);
  const [cardType, setCardType] = useState('card_unknown');
  useEffect(() => {
    let validation = validator.number(cardNumber);
    setValid(validation.isValid);
    setPotentiallyValid(validation.isPotentiallyValid);
    if (validation.card) {
      if (Icons[validation.card.type]) {
        setCardType(validation.card.type);
      } else setCardType('card_unknown');
      return;
    }
    setCardType('card_unknown');
  }, [cardNumber]);

  return {
    isValid,
    isPotentiallyValid,
    cardType,
  };
};

const CardInput = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  function formatInput(value) {
    let ret = '',
      index = 0;
    for (let letter of value) {
      if (index % 4 === 0 && index !== 0) ret += ' ';
      ret += letter;
      index++;
    }

    return ret;
  }

  function changeCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '');
    e.target.value = formatInput(value);

    setCardNumber(value);
  }
  const debouncedCardNumber = useDebounce(cardNumber, 100);
  let { isValid, isPotentiallyValid, cardType } = useValidate(
    debouncedCardNumber
  );
  useEffect(() => {
    console.log(validator.number(cardNumber));
  }, [cardNumber]);

  useEffect(() => {
    setErrorMessage(
      !isValid && !isPotentiallyValid
        ? { message: 'Invalid Card Number' }
        : null
    );
  }, [isPotentiallyValid, isValid]);
  return (
    <div>
      <section style={{ width: '80%', display: 'inline-block' }}>
        <Input
          error={errorMessage}
          type="text"
          name="card_number"
          label="Card number"
          onChange={changeCardNumber}
        />
      </section>{' '}
      <section
        style={{
          width: '10%',

          display: 'inline-block',
        }}
      >
        <Image
          src={Icons[cardType]}
          style={{
            width: '40px',
          }}
        />
      </section>
    </div>
  );
};

export default CardInput;
