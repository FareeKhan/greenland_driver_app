import {
  DATA_DETAILES_TYPE,
  ERROR,
  USERDATA,
  GET_DRIVERS_NEW
} from '../actiontypes/DataTypes';
import axios from 'axios';

const isDevelopment = false;

const testUrl = "https://a086-2a00-f29-238-250b-79d3-17e7-7bf3-6e7c.ngrok-free.app/api";

// export const BASE_URL = isDevelopment ? testUrl :  'https://backend.alkwaityalawl.com/api';

export const BASE_URL = () => {
  return 'https://api.gibutchery.ae/api';
}

export const get_data_action = data => dispatch => {
  dispatch({ type: DATA_DETAILES_TYPE, userdata: data });
};

export const loginUser = (data, token, selectedAppName) => dispatch => {
  // axios.get(BASE_URL + '/login/other_user?phone=' + data + "&app=" + selectedAppName+ "&token=" + token)
    console.log('hundfressTrinlion',BASE_URL() + '/login/other_user?phone=' + data + "&token=" + token)
  axios.get(BASE_URL() + '/login/other_user?phone=' + data + "&token=" + token)
    .then(res => {
      console.log('--->>>', res)
      if (res.data.error) {
        dispatch({ type: ERROR, payload: 'User Not Found' });
        dispatch({ type: ERROR, payload: null });
      } else {
        //console.log(res.data.data,"DataLoginGetRobin");
        dispatch({ type: USERDATA, payload: { ...res.data.data, selectedAppName } });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const logoutUser = () => dispatch => {
  return dispatch({ type: USERDATA, payload: {} });
};

export const updateStatus = (newStatus, orderId) => (dispatch, getState) => {
  var state = getState();
  var user_data = state.DataReducer;
  axios
    .post(
    BASE_URL()+
      '/other_user/updateOrderStatus?order_id=' +
      orderId +
      '&status=' +
      newStatus,
    )
    .then(res => {
      console.log("res.data",res.data);
      console.log('newStatus',newStatus);
      console.log('Robin Response received Seven:', res.data);
      // dispatch({type: SUCCESS, payload: "Added"});
    })
    .catch(err => {
      console.log('----------',err.response);
    });
};

export const flushCache = () => (dispatch) => {

  return dispatch({ type: 'FLUSH_CACHE' });
}


// export const fetchData = (status = 'confirmed') => (dispatch, getState) => {
export const fetchData = (status,selectedAppName) => (dispatch, getState) => {

  try {


    var state = getState();
    var user_data = state.DataReducer;
    var role = user_data?.userdata?.role;
    let listingCache = user_data.cachedData;

    var get_url;

    if (user_data?.userdata?.role == 'driver') {
      get_url =
        BASE_URL() +
        '/other_user/getUserOrders?user_id=' +
        user_data?.userdata?.id +
        '&status=' +
        status;
    }
    if (user_data?.userdata?.role == 'stocker') {
      get_url =
        BASE_URL() +
        '/other_user/getUserOrders?user_id=' +
        user_data?.userdata?.id +
        '&get_all=true&status=' +
        status;
    }

    if (user_data?.userdata?.role == 'assigner') {
      get_url =
        BASE_URL() +
        '/other_user/getUserOrders?user_id=' +
        user_data?.userdata?.id +
        '&assigned=true&status=' +
        status;
    }

    get_url = get_url + '&role=' + role;


    if (status === 'confirmed' && user_data?.userdata?.role !== 'driver') {
      // console.log('using cached version',listingCache);
      dispatch({ type: DATA_DETAILES_TYPE, payload: listingCache });
    }
    else {
      axios
        .get(get_url)
        .then(res => {
          dispatch({ type: DATA_DETAILES_TYPE, payload: res.data.original });
          // console.log('Robin Response received Five:', res.data.original);

          if (status === 'confirmed' && user_data?.userdata?.role !== 'driver') {
            console.log('creating cached version');
            dispatch({ type: 'ADD_LISTING_CACHE', payload: res.data.original });
          }

        })
        .catch(err => {
          console.log(err.response);
        });
    }
  } catch (error) {
    console.log('showErre', error)
  }

};

export const setCurrentItem = (item) => (dispatch) => {
  console.log('Robin Response received Four:', item);
  return dispatch({ type: 'SET_CURRENT_ITEM', payload: item });

}

export const getDriversNNN = () => async (dispatch) => {
  try {
    const response = await axios.get(BASE_URL() + '/other_user/getDrivers');

    dispatch({ type: GET_DRIVERS_NEW, payload: response.data.data });
    console.log('Robin Response received Three:', response.data.data);
  } catch (err) {
    console.log('Error occurred:', err);
    if (err.response) {
      console.log('Error response:', err.response);
    } else {
      console.log('Error information not available');
    }
  }
};

export const getThings = () => dispatch => {
  var timenow = new Date().getTime();
  dispatch({ type: ERROR, payload: 'User Not Found' + timenow });
  console.log('Robin Response received Two:', timenow);
};

export const assignOrderToDriver = (orderId, driverId,) => async dispatch => {

  try {
    const getUrl = BASE_URL() + '/other_user/assignOrderToDriver?order_id=' + orderId + "&driver_id=" + driverId
    // const response = await axios.get(BASE_URL(selectedAppName) + '/other_user/assignOrderToDriver?order_id=' + orderId + "&driver_id=" + driverId);
    const response = await axios.get(getUrl);
    console.log('checkignDriverData', response.data);
    console.log('checkignDriverUrl', getUrl);
    //     dispatch({type: SET_DRIVERS_NEW, payload: response.data.data});
  } catch (err) {
    console.log('Error occurred:', err);
    if (err.response) {
      console.log('Error response:', err.response);
    } else {
      console.log('Error information not available');
    }
  }
};
