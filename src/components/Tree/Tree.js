import React, { useEffect, useState } from 'react';
import { CircularProgress, Link, Divider, Grow, Container, Grid, Paper, Typography, Button, TextField } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { getFamilies, updateFamily, deleteFamily } from '../../actions/family';
import { getChildrens, updateChildren, deleteChildren } from '../../actions/children';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { socket } from '../../service/socket';

const Tree = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);

    const families = useSelector(state => state.families);
    const childrens = useSelector(state => state.childrens);

    const [staticChildren, setStaticChildren] = useState([]);
    const [dataCollection, setDataCollection] = useState({ selectedMember: '', currentId: '', firstname: '', lastname: '', typeCollection: ''});


    const [emitReceiever, setEmitReceiver] = useState(0);

    useEffect(() => {
            socket.on('updatedDetailsRespond', data => {
              console.log('TREE-useEffect-updatedDetailsRespond-socket.on: ', data);
              setEmitReceiver(data);
              dispatch(getFamilies());
              dispatch(getChildrens());
            })
    },[emitReceiever])


    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
      };
    
      const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
      };

      const popuplateChildrens = childrenId => {
        return Object.keys(childrens).map(keyName => 
          <TreeItem nodeId={keyName} label={childrens[keyName]._id === childrenId 
               ?  <Link component="button" variant="body2" onClick={() => {
                      setDataCollection({...dataCollection, 
                        currentId: childrens[keyName]._id,
                        firstname: childrens[keyName].firstname,
                        lastname: childrens[keyName].lastname,
                        typeCollection: 'childrens',
                        selectedMember: 'childrens'
                      })
                  }}>

                    {`${childrens[keyName].firstname } ${childrens[keyName].lastname } ` }
                  </Link>
            : null } /> );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(dataCollection.selectedMember === 'father') {
          dispatch(updateFamily(dataCollection.currentId, { type: 'father', firstname: dataCollection.firstname, lastname: dataCollection.lastname}));

        }  else if (dataCollection.selectedMember === 'mother') {
          dispatch(updateFamily(dataCollection.currentId, { type: 'mother', firstname: dataCollection.firstname, lastname: dataCollection.lastname}));

        } else if (dataCollection.selectedMember === 'childrens') {
          dispatch(updateChildren(dataCollection.currentId, { firstname: dataCollection.firstname, lastname: dataCollection.lastname}));

        } else {

        }

        socket.emit('updatedDetailsSent',() => console.log('client-emit-updatedDetailsSent'));
      }

    const handleDelete =  (id) => {

            // console.log('staticChildren:: ', staticChildren);
          if((dataCollection.selectedMember === 'father') || (dataCollection.selectedMember === 'mother') ) {
               dispatch(deleteFamily(id)) 

          }  else if (dataCollection.selectedMember === 'childrens') {
              dispatch(deleteChildren(id)) 

          } else {

          }
          socket.emit('updatedDetailsSent', {message: 'gung gong'});
    }

    return (
        <>
        <Grow in>  
            <Container>
              <Grid className={classes.container} container>
                <Grid className={classes.customMargin} item xs={12} sm={12} md={12} lg={6} elevation={12} >
                <Typography style={{ marginBottom: '33px'}} variant="h4">List of Families</Typography>
                      <TreeView
                          className={classes.root}
                          defaultCollapseIcon={<ExpandMoreIcon />}
                          defaultExpandIcon={<ChevronRightIcon />}
                          expanded={expanded}
                          selected={selected}
                          onNodeToggle={handleToggle}
                          onNodeSelect={handleSelect}
                        >
                          {!families?.length ? <CircularProgress /> : (
                                <>
                                    {families.map((fam) => (
                                    <TreeItem nodeId={fam._id} label={fam.familyName}>
                              
                                            <strong>Father:</strong> &nbsp;
                                            <Link component="button" variant="body2" 
                                              onClick={() => {
                                                 setDataCollection({...dataCollection, 
                                                  currentId: fam._id,
                                                  firstname: fam.maleFirstname,
                                                  lastname: fam.maleLastname,
                                                  typeCollection: 'families',
                                                  selectedMember: 'father'
                                                })

                                                setStaticChildren({...staticChildren, children: fam.children } )
                                              }}>

                                              {` ${fam.maleFirstname} ${fam.maleLastname}` }
                                            </Link>
                                            <Divider/>

                                            <strong>Mother:</strong> &nbsp;
                                            <Link component="button" variant="body2" 
                                              onClick={() => {
                                                
                                                setDataCollection({...dataCollection, 
                                                  currentId:fam._id,
                                                  firstname:fam.femaleFirstname,
                                                  lastname: fam.femaleLastname,
                                                  typeCollection: 'families',
                                                  selectedMember: 'mother'
                                                })

                                                setStaticChildren({...staticChildren, children: fam.children } )

                                              }}>

                                              {` ${fam.femaleFirstname} ${fam.femaleLastname}` }
                                            </Link>
                                            <Divider/>


                                            <strong>Children:</strong> 
                                            {fam.children.map(childrenId => (
                                              popuplateChildrens(childrenId)
                                            ))}
                                    </TreeItem>
                                    ))}         
                                </>
                          )}

                        </TreeView>
                </Grid> 

                <Grid className={classes.customMargin} item xs={12} sm={12} md={12} lg={6} elevation={12} >
                <Paper className={classes.paper} elevation={6}>
                  <form autoComplete="off" onSubmit={handleSubmit}>

                    {/* refactor this render: */}
                  {dataCollection.typeCollection === 'childrens' 
                     ? <Typography style={{ marginBottom: '33px'}} variant="h6">Children details</Typography>
                     : null}

                  {dataCollection.typeCollection === 'families' 
                     ? <Typography style={{ marginBottom: '33px'}} variant="h6">Parent details</Typography>
                     : null}                    

                    <TextField 
                          style={{ marginBottom: '33px'}}
                          required
                          name="firstname" 
                          variant="outlined" 
                          label="Firstname" 
                          value={dataCollection.firstname} 
                          onChange={(e) => setDataCollection({...dataCollection, firstname: e.target.value})}
                          fullWidth   />

                    <TextField 
                          required
                          style={{ marginBottom: '33px'}}
                          name="lastname" 
                          variant="outlined" 
                          label="Lastname" 
                          value={dataCollection.lastname} 
                          onChange={(e) => setDataCollection({...dataCollection, lastname: e.target.value})}              
                          fullWidth />

                    {dataCollection.typeCollection === 'childrens' 
                      ? 
                      <Typography style={{ marginBottom: '33px'}} variant="h6"> &nbsp; </Typography>
                      :
                      <div style={{ marginBottom: '33px'}}>
                        {dataCollection.typeCollection.length !== 0 && (
                             <Typography style={{ marginBottom: '33px'}} variant="h6">Children</Typography>
                        )}
                   
                          {staticChildren?.children?.map(childrenId => (
                            Object.keys(childrens).map(keyName => (                        
                              childrens[keyName]._id === childrenId 
                              ? 
                              <li key={keyName}>
                                {`  ${childrens[keyName].firstname }  ${childrens[keyName].lastname } `}
                              </li>
                        
                              : null
                        
                            ))

                          ))}
                       </div>
                    } 
            
                    <Button   style={{ marginBottom: '6px'}} variant="contained" color="secondary" size="large" onClick={() => handleDelete(dataCollection.currentId)} fullWidth>Delete</Button>
                    <Button   style={{ marginBottom: '6px'}} variant="contained" color="primary" size="large" type="submit" fullWidth>UPDATE</Button>
                  </form>
                </Paper>
                </Grid> 
              </Grid> 
            </Container>
        </Grow>
      </>
    )
}

export default Tree;