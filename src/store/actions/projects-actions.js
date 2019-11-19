import { CLEAR_PROJECT, GET_PROJECT, SET_ALERT, SET_MAIN_PAGE } from '../types';
import { config } from '../../firebase-config';
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(config);
const db = firebase.firestore();

export const setAlert = alert => {
  console.log('work in setAlert');
  return {
    type: SET_ALERT,
    payload: alert,
  };
};

export const getProject = project_name => async dispatch => {
  const docRef = db.collection('projects').doc(project_name);
  try {
    await docRef.get().then(doc => {
      if (doc.exists) {
        dispatch({
          type: GET_PROJECT,
          payload: doc.data(),
        });
      } else {
        // doc.data() will be undefined in this case
        dispatch({
          type: SET_ALERT,
          payload: 'No such document',
        });
      }
    });
  } catch (err) {
    console.log('Error getting document:', err);
  }
};

export const setMainPage = isMain => {
  return {
    type: SET_MAIN_PAGE,
    payload: isMain,
  };
};

export const clearProject = () => {
  return {
    type: CLEAR_PROJECT,
  };
};
