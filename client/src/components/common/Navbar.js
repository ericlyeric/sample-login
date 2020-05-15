import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from '../../context/AuthContext';
import { logout } from '../../api/authApi';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: 'white',
  },
}));

const Navbar = () => {
  const { user, setUser, isAuth, setIsAuth } = useAuthContext();
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = () => {
    logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuth(false);
        history.push('/');
      }
    });
  };

  const unauthenticatedNavbar = () => {
    return null;
  };

  const authenticatedNavbar = () => {
    return (
      <>
        <Link
          variant="button"
          href="/todo-list"
          className={classes.link}
        >
          Todo List
        </Link>
        {user.role === 'admin' ? (
          <Link
            variant="button"
            href="/admin"
            className={classes.link}
          >
            Admin
          </Link>
        ) : null}
        <Button
          href="#"
          color="primary"
          variant="outlined"
          className={classes.link}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </>
    );
  };

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <nav>
          <Link variant="button" href="/" className={classes.link}>
            Home
          </Link>
          {!isAuth ? unauthenticatedNavbar() : authenticatedNavbar()}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
