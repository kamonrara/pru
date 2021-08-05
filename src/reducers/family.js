import { CREATE_FAMILY, FETCH_FAMILIES } from '../constants/actionTypes';

export default (families = [], action) => {
    switch (action.type) {
        case CREATE_FAMILY:
            return { ...families, temp: [...families, action.payload]};
        case FETCH_FAMILIES: 
            return action.payload;

        default: return families;
    }
}