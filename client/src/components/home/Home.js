import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Sample Login
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          paragraph
        >
          Sample login application with MongoDb, Express.js, React.js,
          Node.js, Passport.js. Leverages traditonal username,
          password login, as well as social identity provider logins
          (Google, Facebook, Twitter)
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary">
                <Link
                  to="/login"
                  style={{ textDecoration: 'none', color: '#ffffff' }}
                >
                  Login
                </Link>
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">
                <Link
                  to="/register"
                  style={{ textDecoration: 'none', color: '#3f51b5' }}
                >
                  Register
                </Link>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
