import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '../IconButton/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  FiHome as HomeIcon,
  FiUser as UserIcon,
  FiFileText as PaperIcon,
  FiMenu as MenuIcon,
  FiShoppingBag as ShoppingBag,
  FiDatabase as Database,
} from 'react-icons/fi';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import './TopBar.scss';

import Typography from '../Typography/Typography';
import { FiMoreVertical as MoreIcon } from 'react-icons/fi';
import logo from '../../assets/logo-variant.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#f0324b',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const TopBar = ({ title, btn, window }) => {
  const location = useLocation();

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div
        style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar alt="500 logo" src={logo} />{' '}
        <Typography
          inline
          style={{
            marginLeft: '10px',
          }}
        >
          500 chow
        </Typography>
      </div>
      <Divider />
      <List>
        <Link
          to="/"
          className={location.pathname === '/' ? 'link active-link' : 'link'}
        >
          <ListItem button>
            <ListItemIcon
              className={location.pathname === '/' ? 'active-link' : ''}
              style={{ fontSize: '1.2em' }}
            >
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
        </Link>
        <Link
          to="/notifications"
          className={
            location.pathname === '/notifications' ? 'link active-link' : 'link'
          }
        >
          <ListItem button>
            <ListItemIcon
              className={
                location.pathname === '/notifications' ? 'active-link' : ''
              }
              style={{ fontSize: '1.2em' }}
            >
              <PaperIcon />
            </ListItemIcon>
            <ListItemText>Notifications</ListItemText>
          </ListItem>
        </Link>

        <Link
          to="/customers"
          className={location.pathname === '/customers' ? 'active-link' : ''}
        >
          <ListItem button>
            <ListItemIcon
              className={
                location.pathname === '/customers' ? 'active-link' : ''
              }
              style={{ fontSize: '1.2em' }}
            >
              <UserIcon />
            </ListItemIcon>
            <ListItemText>Customers</ListItemText>
          </ListItem>
        </Link>
      </List>
      {/* <Divider />
      <List></List> */} <Divider />
      <List>
        <Link
          to="/FoodItems"
          className={
            location.pathname === '/FoodItems' ? 'link active-link' : 'link'
          }
        >
          <ListItem button>
            <ListItemIcon
              className={
                location.pathname === '/FoodItems' ? 'active-link' : ''
              }
              style={{ fontSize: '1.2em' }}
            >
              <Database />
            </ListItemIcon>
            <ListItemText>Food Items</ListItemText>
          </ListItem>
        </Link>
      </List>
      {/* <Divider />
      <List></List> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ fontWeight: 'bold' }}>
            {title || 'Page One'}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};

export default TopBar;
