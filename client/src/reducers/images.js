import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH } from '../constants/actionTypes';

export default (images = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case FETCH:
      return images.map((image) => (image._id === action.payload._id ? action.payload : image));
    case CREATE:
      return [...images, action.payload];
    case UPDATE:
      return images.map((image) => (image._id === action.payload._id ? action.payload : image));
    case DELETE:
      return images.filter((image) => image._id !== action.payload);
    default:
      return images;
  }
};