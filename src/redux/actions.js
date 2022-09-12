import { BASE_URL } from "../Helper/helper";

//actions
export const GET_MOVIES = 'GET_MOVIES';
export const GET_INTERVIEWER_USER_LIST = 'GET_INTERVIEWER_USER_LIST';
export const GET_TECHNOLOGY_LIST = 'GET_TECHNOLOGY_LIST';
export const GET_LOGIN_DETAILS = 'GET_LOGIN_DETAILS';

//base url for the sample method
const API_URL = 'https://api.themoviedb.org/3/movie/popular';
const API_KEY = '<your-api-key>';
const PARAMS = 'page=1';
const BASE_URL1 = `${API_URL}?api_key=${API_KEY}&${PARAMS}`;


//initializing axios
const axios = require("axios").default;


const loginConfig = {
  headers: {
  'Content-Type': 'application/json'
  }
};
//get the login authentication token & details
export const getLoginDetails = (username, password) => {
  const usersName = JSON.stringify({ 'Username': `${username}`, 'Password' : `${password}` });
  //const data = { "Username": username, "Password" : password };
  try {
    return async dispatch => {
      const res = await axios.post(
        BASE_URL+'auth/login',
        usersName,
        loginConfig,
      );
      if (res.data) {
        // console.log('====================================');
        // console.log(res.data);
        // console.log('====================================');
        dispatch({
          type: GET_LOGIN_DETAILS,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };

  } catch (error) {
    // Add custom logic to handle errors
  }
};

 

//get the interviewer userlist & dispatch 
export const getInterviewerUserList = (userid, bearertoken) => {
  //configuration for the bearer token to authenticate.
  const listconfig = {
    headers: {
      Authorization: `Bearer ${bearertoken}`,
    },
  };
  try {
    return async dispatch => {
      const res = await axios.get(
        BASE_URL+"management/GetInterviewerUserList?userid="+userid,
        listconfig
      );
      if (res.data) {
        // console.log('====================================');
        // console.log(res.data);
        // console.log('====================================');
        dispatch({
          type: GET_INTERVIEWER_USER_LIST,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
  }
};

//get the technology list
export const getSkills = (userid, bearertoken) => {
  //configuration for the bearer token to authenticate.
  const skillsconfig = {
    headers: {
      Authorization: `Bearer ${bearertoken}`,
    },
  };
  try {
    return async dispatch => {
      const res = await axios.get(
        BASE_URL+"common/GetTechnologylist?userid="+userid,
        skillsconfig
      );
      if (res.data) {
        // console.log('====================================');
        // console.log(res.data);
        // console.log('====================================');
        dispatch({
          type: GET_TECHNOLOGY_LIST,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
  }
};



//sample method to get the data and save it to redux using redux-thunk
export const getMovies = () => {
    
  try {
      return async dispatch => {
        const res = await axios.get(`${BASE_URL1}`);
        if (res.data) {
          dispatch({
            type: GET_MOVIES,
            payload: res.data,
          });
        } else {
          console.log('Unable to fetch');
        }
      };
    } catch (error) {
      // Add custom logic to handle errors
    }
  };