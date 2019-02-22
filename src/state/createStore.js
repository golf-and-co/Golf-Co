import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  console.log(action);
  if (action.type === `CHECKBOX_FILTER`) {
    return Object.assign({}, state, {
      count: state.count + 1,
    })
  }
  return state
}

const initialState = { 
  controls:[
    {name: "hotelType", value:"5"}
  ],
  visible: ["The Club at Dubai"]
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore