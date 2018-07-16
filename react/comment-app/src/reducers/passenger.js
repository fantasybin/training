
const INIT_PASSENGERHISLIST = 'INIT_PASSENGERHISLIST';
const UPDATE_PASSENGER = 'UPDATE_PASSENGER';
const INIT_PASSENGER = 'INIT_PASSENGER';


// reducer
export default function (state, action) {
  if(!state) {
    state = {
      passengerHisList: [],
      passenger: {}
    }
  }
  switch (action.type) {

    case INIT_PASSENGERHISLIST:
      return { passengerHisList: action.passengerHisList };
    case INIT_PASSENGER:
      return {passenger: action.passenger};
    case UPDATE_PASSENGER:
        return Object.assign({}, state.passenger, action.passenger);
    default:
      return state;
  }
}

// action creators
export const initPassengerHisList = (passengerHisList) => {
  return { type: INIT_PASSENGERHISLIST, passengerHisList }
}

export const initPassenger = (passenger) => {
  return { type: INIT_PASSENGER, passenger };
}

export const updatePassenger = (passenger) => {
    return {type: UPDATE_PASSENGER, passenger }
}