const INIT_Passengers = 'INIT_Passengers'
const ADD_Passenger = 'ADD_Passenger'
const DELETE_Passenger = 'DELETE_Passenger'

//reducer
export default function (state, action) {
    if (!state) {
        state = { passengers: [] };
    }
    switch (action.type) {
        case INIT_Passengers:
            return {passengers: action.passengers }
        case ADD_Passenger:
            return {
                passengers: [...state.passengers, action.passenger]
            }
        case DELETE_Passenger:
            return {

            }
        case :
            return state
    }
}

//action creators
export const initPassengers = (passengers) => {
    return { type: INIT_Passengers, passengers }
}
export const addPassenger = (passenger) => {
    return { type: ADD_Passenger, passenger }
}