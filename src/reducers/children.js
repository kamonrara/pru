import { CREATE_CHILDREN, FETCH_CHILDRENS, FETCH_CHILDREN } from '../constants/actionTypes';

export default (childrens = [], action) => {
    switch (action.type) {
        case CREATE_CHILDREN:
            return { ...childrens, temp: [...childrens, action.payload]};
        case FETCH_CHILDRENS: 
            return action.payload;

        default: return childrens;
    }
}