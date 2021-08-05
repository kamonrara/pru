import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Family from './components/Family/Family';
import NavigationBar from './components/Navbar/NavigationBar';

const App = () => {

    return (

        <BrowserRouter>
        <NavigationBar />
            <Container style={{ display: 'flex', marginTop: '99px'}}> 
                <Switch>
                    <Route path="/" exact component={Home} /> 
                    <Route path="/family" exact component={Family} /> 
                </Switch>
            </Container>
        </BrowserRouter>
        
        );
}

export default App;