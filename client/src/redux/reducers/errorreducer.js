import { SET_ERRORS } from "../actiontype";

const initialState ={};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
     const temp = Object.assign(state ,action.payload);
      return temp;
    default:
      return state;
  }
};

export default errorReducer;