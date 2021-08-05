import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
paper: {
    display: 'flex',
    padding: theme.spacing(3),
    },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  Header: {
    display: 'flex',
    marginBottom: '22px'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonSubmit: {
    marginBottom: 10,
  },

}));
