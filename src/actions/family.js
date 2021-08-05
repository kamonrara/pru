import { CREATE_FAMILY, FETCH_FAMILIES, UPDATE_FAMILY, DELETE_FAMILY } from '../constants/actionTypes';
import * as api from '../api/index';

export const deleteFamily = id => async dispatch => {
    try {
        await api.deleteFamily(id);
  
      dispatch({ type: DELETE_FAMILY, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

export const updateFamily = (id, family) => async dispatch => {
    try {

        const { data } = await api.updateFamily(id, family);

        dispatch({ type: UPDATE_FAMILY, payload: data})

    } catch(error) {
        console.log(console.error)
    }
}

export const createFamily = (combinedData) => async (dispatch) => {
    try {
        
         const { data } = await api.createFamily(combinedData);

         console.log('redux-action-create-family-server-responded-to-client-request: ', data)
   
         dispatch({ type: CREATE_FAMILY, payload: data});

    } catch (error) {
        console.log('redux-action-create-family-ERROR: ', error)
    }
}

export const getFamilies = () => async dispatch => {
    try {
        const { data } = await api.fetchFamilies();
        console.log('redux-action-get-families-server-responded-to-client-request: ', data)
        dispatch({ type: FETCH_FAMILIES, payload: data})

    } catch (error) {
        console.log(error);
    }
}