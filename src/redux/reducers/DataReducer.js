import { USERDATA,ERROR,DATA_DETAILES_TYPE,SET_DRIVERS_NEW,GET_DRIVERS_NEW} from "../actiontypes/DataTypes";
const initialState = {
  userdata: {},
  error: null,
  listingData: [],
  drivers: null,
  cachedData: []
};
export default function DataReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR:
      return {
      ...state,
        error: action.payload,
      };
    case 'FLUSH_CACHE':
      return{
        ...state,
        cachedData: []
      };
    case 'ADD_LISTING_CACHE':
      return{
        ...state,
        cachedData: action.payload
      };
    case USERDATA:
      return {
        ...state,
        userdata: action.payload,
      };
      case DATA_DETAILES_TYPE:
        return {
        ...state,
          listingData: action.payload,
        };
      case SET_DRIVERS_NEW:
         return {
          ...state,
            drivers: action.payload,
          };
      case GET_DRIVERS_NEW:
            return {
             ...state,
               drivers: action.payload,
             };
    default: {
      return state;
    }
  }
}