import { createStore as reduxCreateStore } from "redux"
import {lookup} from "../components/Control/Lookup";

const reducer = (state, action) => {
  if (action.type === `CHECKBOX_CONTROL`) {
    // if state already has control, do not add
    const existing = lookup(state.controls, [{name: action.value.target.name, value: action.value.target.value}]);
    if(existing.length === 0) {     
      return Object.assign({}, state, {
        controls: [{name: action.value.target.name, value: action.value.target.value}].concat(state.controls)
      });
    }
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