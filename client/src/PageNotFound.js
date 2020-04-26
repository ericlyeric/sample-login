import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import image from './images/pepe-png-6.png';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

export default function PageNotFound() {
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Grid container spacing={2} justify="center">
          <Grid item>
            <img
              src={image}
              alt="404"
              style={{ maxWidth: '200px' }}
            />
          </Grid>
          <Grid item>
            <Typography
              component="h3"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              404 Page Not Found
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              The page you are looking for doesn't exist or an other
              error has occured.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="contained" color="primary">
              <Link
                to="/"
                style={{ textDecoration: 'none', color: '#ffffff' }}
              >
                Go to homepage
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
