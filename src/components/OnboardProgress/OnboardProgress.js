import React from 'react';
import IconButton from '../IconButton/IconButton';
import classNames from 'classnames';
import Typography from '../Typography/Typography';
import Avatar from '@material-ui/core/Avatar';
import styles from './OnboardProgress.module.scss';
import {
  FiCheck as CheckIcon,

  // FiDatabase as Database,
} from 'react-icons/fi';

const OnboardProgress = ({ pages, onChange }) => {
  return (
    <div className="mb-3">
      <section className={styles['onboard-section']}>
        {pages.map((page, i) => {
          const classes = classNames(styles[page.status]);
          if (page.status === 'done') {
            return (
              <IconButton
                variant="no-hover"
                key={'onboarding' + i}
                onClick={() => onChange(i)}
              >
                <Avatar className={classes}>
                  <CheckIcon />
                </Avatar>
              </IconButton>
            );
          }
          return (
            <IconButton
              variant="no-hover"
              key={'onboarding' + i}
              onClick={() => onChange(i)}
            >
              <Avatar className={classes} e>
                <Typography inline> {'' + (i + 1)} </Typography>
              </Avatar>
            </IconButton>
          );
        })}
      </section>
    </div>
  );
};

export default OnboardProgress;
