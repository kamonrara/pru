import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { createFamily } from '../../actions/family';
import useStyles from './styles';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

const Family = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [parentData, setParentData] = useState({ maleFirstname: '', maleLastname: '', femaleFirstname: '', femaleLastname: '', familyName: '', children: []});
    
    const [childrenFields, setChildrenFields] = useState([{
        id: uuidv4(), firstname: '', lastname: '',
    }])

      const handleChangeInput = (id, event) => {
            const newChildrenFields = childrenFields.map(i => {
                if(id === i.id) {
                    i[event.target.name] = event.target.value
                }
                return i;
            })

            setChildrenFields(newChildrenFields)
      };

  const handleAddFields = () => {
    setChildrenFields([...childrenFields, { id: uuidv4(), firstname: '', lastname: ''}])
  }

  const handleRemoveFields = (id) => {
    const values = [...childrenFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setChildrenFields(values)
}

const clear = () => {
  setParentData({ maleFirstname: '', maleLastname: '', femaleFirstname: '', femaleLastname: '', familyName: '', children: []})
  setChildrenFields([{ id: uuidv4(), firstname: '', lastname: ''}])
}

const handleSubmitForm = async event => {
     event.preventDefault();

     const combinedData = [{...parentData,  children: childrenFields }]

      console.log('FAMILY-submitForm-combinedData: ', combinedData);

     dispatch(createFamily(combinedData))
     clear();
     history.push('');


};
    return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={6} lg={6}>
          <form autoComplete="off"  onSubmit={handleSubmitForm}>
              <Box>
                <Typography className={classes.Header} variant="h5"> Add Parent </Typography>

                <Typography style={{  display: 'flex', margin: '0px 9px 9px'}} variant="h9">Father</Typography>
                <TextField required style={{ marginBottom: '6px'}} name="maleFirstname" variant="outlined" label="Firstname" fullWidth value={parentData.maleFirstname} onChange={(e) => setParentData({...parentData, maleFirstname: e.target.value})} />
                <TextField required style={{ marginBottom: '6px'}} name="maleLastname" variant="outlined" label="Lastname" fullWidth value={parentData.maleLastname} onChange={(e) => setParentData({...parentData, maleLastname: e.target.value})} />
                
                <Typography style={{  display: 'flex', margin: '0px 9px 9px'}}  variant="h9">Mother</Typography>
                <TextField required style={{ marginBottom: '6px'}} name="femaleFirstname" variant="outlined" label="Firstname" fullWidth value={parentData.femaleFirstname} onChange={(e) => setParentData({...parentData, femaleFirstname: e.target.value})} />
                <TextField required style={{ marginBottom: '6px'}} name="femaleLastname" variant="outlined" label="Lastname" fullWidth value={parentData.femaleLastname} onChange={(e) => setParentData({...parentData, femaleLastname: e.target.value})} />
              </Box>

                <Typography className={classes.Header} variant="h5">Add Children</Typography>
                    {childrenFields.map((inputField, index) => (
                        <div key={index} style={{ marginBottom: '22px'}}>
                            <TextField variant="filled" name="firstname" label="Firstname" value={childrenFields.firstname} onChange={ e => handleChangeInput(inputField.id, e)}/>
                            <TextField variant="filled" name="lastname" label="Lastname" value={childrenFields.lastname} onChange={ e => handleChangeInput(inputField.id, e)}/>         
                            <IconButton onClick={() => handleRemoveFields()}> <RemoveIcon /> </IconButton>
                            <IconButton onClick={() => handleAddFields()}> <AddIcon /> </IconButton>

                        </div>
                    ))}

                <Button variant="contained" color="primary" type="submit" fullWidth> Send </Button>
        </form>
      </Paper> 
      </Container>
    )
}

export default Family;