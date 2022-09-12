import {GET_MOVIES, GET_TECHNOLOGY_LIST, GET_INTERVIEWER_USER_LIST, GET_LOGIN_DETAILS} from './actions';

//reducer 
//initial state for the sample redux
//technologies & interviewer state is used to store the response data in state
const initialState = {
  movies: [],
  technologies: [],
  interviewer: [],
  logindetails: {},
};



//reducer sample to store the value from example
export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {...state, movies: action.payload};
    case GET_TECHNOLOGY_LIST:
      return {...state, technologies: action.payload};
    case GET_INTERVIEWER_USER_LIST:
      return {...state, interviewer: action.payload};
    case GET_LOGIN_DETAILS:
      return {...state, logindetails: action.payload};
    default:
      return state;
  }
};

