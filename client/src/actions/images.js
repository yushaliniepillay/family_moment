import { FETCH_ALL, CREATE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const fetchImages = () => async (dispatch) => {
    try {
      const { data } = await api.fetchImages();
  
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const createImage = (post) => async (dispatch) => {
    try {
      const { data } = await api.createImage(post);
  
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };