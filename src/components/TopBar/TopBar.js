import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import {
  FiHome as HomeIcon,
  FiUser as UserIcon,
  FiFileText as PaperIcon,
  FiMenu as MenuIcon,
  FiShoppingBag as ShoppingBag,
} from 'react-icons/fi';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles } from '@material-ui/core/styles';
import './TopBar.scss';

import Typography from '../Typography/Typography';
import avatar from '../../assets/avatar.png';
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

    boxShadow: 'none',
    color: '#ffffff',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const logOut = () => {
    dispatch({ type: 'LOGOUT_USER' });
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  let links = [
    {
      url: '/',
      name: 'Home',
      Icon: HomeIcon,
    },
    {
      url: '/notifications',
      name: 'Notifications',
      Icon: PaperIcon,
    },

    {
      url: '/customers',
      name: 'Customers',
      Icon: UserIcon,
    },
  ];

  const links2 = [
    {
      url: '/FoodItems',
      name: 'Food Items',
      Icon: ShoppingBag,
    },
  ];

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
        {links.map(({ url, name, Icon }, i) => (
          <Link
            to={url}
            key={'link' + i}
            className={location.pathname === url ? 'active-link' : 'link'}
          >
            <ListItem button>
              <ListItemIcon
                className={location.pathname === url ? 'active-link' : ''}
                style={{ fontSize: '1.2em' }}
              >
                <Icon />
              </ListItemIcon>
              <Typography>{name}</Typography>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {links2.map(({ url, name, Icon }, i) => (
          <Link
            to={url}
            key={'link' + i}
            className={location.pathname === url ? 'active-link' : 'link'}
          >
            <ListItem button>
              <ListItemIcon
                className={location.pathname === url ? 'active-link' : ''}
                style={{ fontSize: '1.2em' }}
              >
                <Icon />
              </ListItemIcon>
              <Typography>{name}</Typography>
            </ListItem>
          </Link>
        ))}
      </List>
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
          <Typography
            style={{
              flexGrow: '1',
            }}
          >
            {title || 'Page One'}
          </Typography>

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <Avatar src={avatar} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={logOut}>Log Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
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
