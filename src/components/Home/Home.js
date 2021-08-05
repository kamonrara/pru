import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Tree from '../Tree/Tree';
import { getFamilies } from '../../actions/family';
import { getChildrens } from '../../actions/children';
import { socket } from '../../service/socket';

const Home = () => {

    console.log('home')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFamilies());
        dispatch(getChildrens());

    }, [])


    const [emitReceiever, setEmitReceiver] = useState(0);

    useEffect(() => {
            socket.on('updatedDetailsRespond', data => {
              console.log('HOME-useEffect-updatedDetailsRespond-socket.on: ', data);
              setEmitReceiver(data);
              dispatch(getFamilies());
              dispatch(getChildrens());
            })
            
    },[emitReceiever])


      return <Tree />
}

export default Home;