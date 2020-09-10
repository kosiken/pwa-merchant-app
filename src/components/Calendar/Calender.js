import React, { useState, useEffect, useRef } from 'react';
import IconButton from '../IconButton/IconButton';

import Typography from '../Typography/Typography';
import {
  FiChevronLeft as LeftIcon,
  FiChevronRight as RightIcon,
  FiMoreHorizontal as MoreIcon,
  // FiUser as UserIcon,
  // FiDatabase as Database,
} from 'react-icons/fi';
import {
  Dropdown,

  // FiUser as UserIcon,
  // FiDatabase as Database,
} from 'react-bootstrap';
import moment from 'moment';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const Months = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function getCalender(date, d, m, y) {
  let mon = m + 1;
  let dom = 0;
  if (mon === 2) {
    dom = y % 4 ? 28 : 29;
  } else if ([4, 6, 9, 11].includes(mon)) {
    dom = 30;
  } else {
    dom = 31;
  }

  let caldays = [],
    cd = date - 1,
    start = d;

  let da = Math.floor((date - 1) / 7);

  while (cd > 7) {
    cd = cd - 7;
  }
  console.log(cd, da);
  if (cd === 0) {
    start = d;
  } else {
    //console.log(`lol`);
    while (cd > 0) {
      cd = cd - 1;
      start = start - 1;
    }

    if (start < 0) {
      start = start + 7;
    }
  }
  for (let i = 0; i < dom; i++) {
    caldays.push({ day: days[(i + start) % 7], date: i + 1 });
  }

  return caldays;
}

const CustomToggle2 = React.forwardRef(({ children, onClick }, ref) => (
    <span
    ref={ref}
    style={{cursor:'pointer'}}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </span>
));

const Calender = ({ onChange }) => {
  let [calender, setCalender] = useState([]);
  let ref = useRef(null);
  let [_month, _setMonth] = useState(0);
  let [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    let m = moment();
    let date = m.date();
    let month = m.month();

    setCalender(getCalender(date, m.day(), month, m.year()));
    _setMonth(month);
    setCurrentDay(date);
  }, []);

  useEffect(() => {
    if (currentDay === 0) return;
    let node = ref.current;
    if (node) {
      let scrollDistance =
        Math.round(node.scrollWidth / calender.length) * currentDay -
        node.clientWidth;

      node.scroll({
        top: 0,
        left: scrollDistance + 10,
        behavior: 'smooth',
        //- node.clientWidth
      });
    }
    if (onChange) {
      onChange({ month: _month, date: currentDay });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay, _month]);

  function changeMonth(m) {
    if (_month === m) {
      return;
    }
    let nm = moment(new Date(2020, m, 1));
    let date = nm.date();
    setCalender(getCalender(date, nm.day(), m, nm.year()));
    _setMonth(m);
    setCurrentDay(date);
  }

  return (
    <div className="mb-4">         
    
      <Dropdown className="mb-4">
        <Dropdown.Toggle as={CustomToggle2} id="dropdown-custom-components2">
          <Typography title>
            {Months[_month]} <MoreIcon />
          </Typography>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {Months.map((m, i) => {
            return (
              <Dropdown.Item key={'month' + i} eventKey={(i + 1).toString()}>
                <Typography
                  onClick={() => {
                    changeMonth(i);
                  }}
                >
                  {m}
                </Typography>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>

      <div className="flex">
        <IconButton
          style={{ display: 'inline-flex', alignItems: 'center' }}
          onClick={() => {
            if (currentDay > 1) setCurrentDay(currentDay - 1);
          }}
        >
          <LeftIcon />
        </IconButton>

        <div className="calender" ref={ref}>
          <div
            style={{
              display: 'inline-flex',
              transition: 'all .5s ease-in',
              position: 'absolute',
            }}
          >
            {calender.map((col, i) => {
              return (
                <div
                  key={'date' + i}
                  className={currentDay === col.date ? 'date current' : 'date'}
                  onClick={() => {
                    setCurrentDay(col.date);
                  }}
                >
                  <Typography small>{col.day.slice(0, 3)}</Typography>
                  <Typography
                    style={{
                      marginBottom: '5px',
                    }}
                  >
                    {col.date}
                  </Typography>
                </div>
              );
            })}
          </div>{' '}
        </div>
        <IconButton
          style={{ display: 'inline-flex', alignItems: 'center' }}
          onClick={() => {
            if (currentDay < calender.length) setCurrentDay(currentDay + 1);
          }}
        >
          <RightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Calender;
