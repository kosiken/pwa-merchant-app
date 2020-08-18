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
    backgroundColor: '#ffffff',
    border: '1px solid #dfe1e5',
    boxShadow: 'none',
    color: '#000',
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

  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

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
          <Avatar>OP</Avatar>
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
