import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const getStyle = (message) => {
  if (message.msgError) {
    return 'error';
  } else {
    return 'success';
  }
};

const Message = ({ message }) => {
  const classes = useStyles();

  return (
    <Alert className={classes.root} severity={getStyle(message)}>
      {message.msgBody}
    </Alert>
  );
};

export default Message;
