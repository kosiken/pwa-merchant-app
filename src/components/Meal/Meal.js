import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Typography from '../Typography/Typography';

import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';
import Table from '@material-ui/core/Table';
import { FiEdit as EditIcon } from 'react-icons/fi';
import Dialog from '@material-ui/core/Dialog';
import { RiDeleteBin6Line as DeleteIcon } from 'react-icons/ri';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { MdExpandMore as ExpandIcon } from 'react-icons/md';
import styles from './Meal.module.scss';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const Meal = ({ meal, onEdit, onDelete, index }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = classNames({
    [styles.available]: meal.is_available,
    [styles.unavailable]: !meal.is_available,
  });
  return (
    <div className={styles['meal'] + ' shadowf'}>
      <section
        className="flex-row mb-3"
        style={{
          marginBottom: '5px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography inline>{meal.name}</Typography>
        <Typography inline variant="gray">
          {meal.price}
        </Typography>
      </section>
      <section
        className="flex-row mb-3"
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span className={classes}>
          {meal.is_available ? 'Available' : 'Unavailable'}{' '}
        </span>

        <IconButton
          style={{
            position: 'absolute',
            right: '40px',
          }}
        >
          <Link to={'/edit-meal/' + meal.id}>
            <EditIcon />
          </Link>
        </IconButton>

        <IconButton
          style={{
            position: 'absolute',
            right: '10px',
            color: '#f0324b',
          }}
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
      </section>{' '}
      <Accordion
        TransitionProps={{ unmountOnExit: true }}
        style={{ boxShadow: 'none' }}
      >
        <AccordionSummary
          expandIcon={<ExpandIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Food Items</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Table striped responsive>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography inline bold>
                    Food
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography inline bold>
                    Price
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meal.FoodItems.map((food_item) => {
                if (!food_item) return false;
                return (
                  <TableRow key={'food_item' + food_item.id}>
                    <TableCell align="left">
                      <Typography inline>{food_item.name}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography inline>{food_item.price}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
      <Dialog
        open={open}
        onClose={handleClose}
        onClick={() => {
          // onDelete({ ...meal, to_be_deleted: true });
          handleClose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div>
          <Typography
            style={{
              fontWeight: '600',
              margin: '0 0 8px',
              padding: '16px 24px',
            }}
            title
          >
            {`Delete ${meal.name}?`}
          </Typography>

          <Typography
            style={{
              padding: '8px 24px',
            }}
          >
            {' '}
            Are you sure you want to delete this food item
          </Typography>

          <Button
            color="clear"
            full
            style={{
              textAlign: 'right',
              padding: '10px',
            }}
          >
            Confirm{' '}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Meal;
