import React from 'react';
import Typography from '../Typography/Typography';

import moment from 'moment';

function getCalender(date, d, m, y) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

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
    start = d,
    calender = [];

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
    if ((i + 1) % 7 === 0) {
      calender.push([].concat(caldays.slice()));
      caldays = [];
    }
  }

  if (caldays.length) {
    calender.push([].concat(caldays.slice()));
  }
  return calender;
}

const CalenderRow = ({ row }) => {
  return (
    <tr>
      {row.map((col, i) => {
        return (
          <td key={'date' + i}>
            <Typography
              title
              style={{
                fontWeight: 'bold',
              }}
            >
              {col.date}
            </Typography>
            <Typography small>{col.day.slice(0, 3)}</Typography>
          </td>
        );
      })}
    </tr>
  );
};
const Calender = () => {
  let m = moment();
  let calender = getCalender(m.date(), m.day(), m.month(), m.year());
  return (
    <div>
      <table>
        {calender.map((row, i) => (
          <CalenderRow row={row} key={'CalRow' + i} />
        ))}
      </table>
    </div>
  );
};

export default Calender;
