import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import image from '../../images/pink-guy-png-3.png';
import { register } from '../../api/authApi';
import Message from '../common/Message';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    width: theme.spacing(15),
    height: theme.spacing(15),
    border: '1px solid #e0e0e0',
    borderRadius: '50%',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: '100%',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  let history = useHistory();

  let timerId = useRef(null);
  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({ username: '', password: '', role: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    register(formData).then((data) => {
      setSubmitting(true);
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerId = setTimeout(() => {
          history.push('/login');
        }, 2000);
      } else {
        setSubmitting(false);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar src={image} className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                defaultValue={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                defaultValue={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="role">Role</InputLabel>
                <Select
                  labelId="Role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  label="role"
                  name="role"
                >
                  <MenuItem value={'user'}>user</MenuItem>
                  <MenuItem value={'admin'}>admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {submitting && (
              <CircularProgress
                size={24}
                className={classes.buttonProgress}
              />
            )}
            {submitting ? 'Registering...' : 'Register'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {message ? <Message message={message} /> : null}
    </Container>
  );
};

export default SignUp;
