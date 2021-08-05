import { CREATE_CHILDREN, FETCH_CHILDRENS, FETCH_CHILDREN, UPDATE_CHILDREN, DELETE_CHILDREN } from '../constants/actionTypes';
import * as api from '../api/index';

export const deleteChildren = id => async dispatch => {
    try {
        await api.deleteChildren(id);
  
      dispatch({ type: DELETE_CHILDREN, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

export const getChildren = id => async dispatch => {
    try {

      const { data } = await api.fetchChildren(id);
  
      console.log('redux-action-get-children-server-responded-to-client-request: ', data)
      dispatch({ type: FETCH_CHILDREN, payload: data});

    }
    catch (error) {
      console.log('client>src>action>children>getChildren ERROR: ', error);
    }
  };


  export const updateChildren = (id, children) => async dispatch => {
    try {

        const { data } = await api.updateChildren(id, children);

        dispatch({ type: UPDATE_CHILDREN, payload: data})

    } catch(error) {
        console.log(console.error)
    }
}

export const createChildren = (children, history) => async (dispatch) => {
    try {

        const { data } = await api.createChildren(children);
        dispatch({ type: CREATE_CHILDREN, payload: data});
      

    } catch (error) {
        console.log('redux-action-create-location-ERROR: ', error)
    }
}

export const getChildrens = () => async dispatch => {
    try {
        const { data } = await api.fetchChildrens();

        
        dispatch({ type: FETCH_CHILDRENS, payload: data})

    } catch (error) {
        console.log(error);
    }
}