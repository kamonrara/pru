import React, { useEffect, useState } from 'react';
import { Container, Toolbar, Box, AppBar, IconButton, Drawer, Button, Divider } from '@material-ui/core'; 
import MenuIcon   from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

  siteTitle: {
    fontWeight: 'bold',
    letterSpacing: 1.5
  },
  toolbar: {
    backgroundColor: '#6db4e3',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  },
  menuBox: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },
  menuOption: {
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(10)
    },
    color: 'white'
  },
  menuIcon: {
    color: 'white',
    fontSize: '33px'
  },
  heading: {
      display: 'flex',
      fontFamily: 'Segoe UI',
      marginLeft: '33px',
  },
  profile: {
    display: 'flex',
  },
  mobileBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  mobileHeading: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Segoe UI',
  }
  
}));

export default function NavigationBar() {
    const classes = useStyles();
  
  const [state, setState] = useState({
    toggleMenu: false,
    toggleMenuOpen: false
  });
  
  const { toggleMenu, toggleMenuOpen } = state;
  
  useEffect(() => {
    
    const setResponsiveness = () => {
      
      return window.innerWidth < 960
        ? setState((prevState) => ({ ...prevState, toggleMenu: true }))
        : setState((prevState) => ({ ...prevState, toggleMenu: false}));
      
    };
    
    setResponsiveness();
    
    window.addEventListener("resize", () => setResponsiveness());
    
  }, []);

  //mobile
  const displayToggleMenu = () => {
    
    const handleToggleMenuOpen = ()  =>  setState((prevState) => ({ ...prevState,  toggleMenuOpen: true })); 
    const handleToggleMenuClose = () => setState((prevState) => ({ ...prevState, toggleMenuOpen: false }));
    
    return (
      <Toolbar style={{ backgroundColor: '#6db4e3'}}>
        <IconButton {...{ onClick: handleToggleMenuOpen }}>
          <MenuIcon className={classes.menuIcon}/>
        </IconButton>
      
        <Drawer {...{
            anchor: 'left',
            open: toggleMenuOpen,
            onClose: handleToggleMenuClose
          }}
        >

          <div>{ getToggleMenuOptions() }</div>
        </Drawer>
      
      </Toolbar>
    );
  }

   //mobile
  const getToggleMenuOptions = () => {
    return ( 
      <Box className={classes.mobileBox}>
        <Button component={Link} to="/" className={classes.mobileHeading}>HOME</Button> 
        <Button component={Link} to="/family" className={classes.mobileHeading}>ADD FAMILY</Button> 
        <Divider style={{ marginBottom: '11px'}}/>
      </Box>
    );
  }

  //desktop
  const displayLargeMenu = () => {
    return (
      <Toolbar className={classes.toolbar}>
           <Box className={classes.menuBox}>
            <AcUnitIcon style={{ fontSize: '33px'}}/>
            <Button component={Link} to="/" className={classes.heading}>HOME</Button> 
            <Button component={Link} to="/family" className={classes.heading}>ADD FAMILY</Button> 
           </Box>
      </Toolbar>
    );
  }
  
  return (
    <Container>
      <AppBar> 
        { toggleMenu ? displayToggleMenu() : displayLargeMenu() }
      </AppBar>
    </Container>
  );
}