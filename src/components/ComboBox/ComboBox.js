import React from 'react';
import { v4 as uuid } from 'uuid';
import Typography from '../Typography/Typography';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
//import TextField from "@material-ui/core/TextField";
import { MdSearch as SearchIcon } from 'react-icons/md';
//import Autocomplete from "@material-ui/lab/Autocomplete";
import styles from './ComboBox.module.scss';
import useFocus from '../../hooks/useFocus';

function useFoods(ref, foodsArray) {
  //console.log(foodsArray);
  const [foods, setFoods] = React.useState([]);
  React.useEffect(() => {
    //  console.log(foodsArray.length);
    setFoods(foodsArray);
    const node = ref.current;
    if (node) {
      node.addEventListener('input', changeFoods);
      // node.addEventListener('blur', handleBlur);

      return () => {
        node.removeEventListener('input', changeFoods);
        //node.removeEventListener('blur', handleBlur);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, foodsArray]);
  const changeFoods = React.useCallback(
    (e) => {
      setFoods(
        foodsArray.filter((l) => {
          console.log(l);
          return new RegExp(e.target.value.toLowerCase()).test(
            l.name.toLowerCase()
          );
        })
      );
      console.log(foodsArray.length);
    },
    [foodsArray]
  );

  return foods;
}

function Foodselect({ Foods, theRef, onChange }) {
  if (Foods.length) {
    return (
      <div className={styles['location-list']}>
        {Foods.map((l) => (
          <div
            focusable
            className={styles['location-list-item']}
            key={uuid()}
            onClick={() => {
              theRef.current.value = l.name;
              onChange({
                target: {
                  value: l.name,
                },
              });
            }}
          >
            {' '}
            <Typography inline> {l.name} </Typography>{' '}
            <span className={styles['location-list-item-span']}>
              {' '}
              N{l.price}{' '}
            </span>
          </div>
        ))}
      </div>
    );
  } else
    return (
      <div className={styles['location-list']}>
        <div focusable>
          {' '}
          <Typography inline>{theRef.current.value} not found </Typography>{' '}
          <Link to="/create_food">
            {' '}
            <Button>Create </Button>
          </Link>
        </div>
      </div>
    );
}

function ComboBox({ items, onChange }) {
  const ref = React.useRef(null);
  //const ref = React.useRef(null)

  let show = useFocus(ref);

  let Foods = useFoods(ref, items);

  return (
    <div className="add-div">
      <Input
        type="text"
        name="food"
        label="Food"
        style={{ margin: '0 auto' }}
        ref={ref}
      />
      {show && <Foodselect Foods={Foods} onChange={onChange} theRef={ref} />}{' '}
    </div>
  );
}

export default ComboBox;
