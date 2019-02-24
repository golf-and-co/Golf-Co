import { createStore as reduxCreateStore } from "redux"
import {lookup} from "../components/Control/Lookup";

const reducer = (state, action) => {
  if (action.type === `CHECKBOX_CONTROL`) {
    if(action.value.target.checked) {
      // box is not checked, add
      const control = {name: action.value.target.name, value: action.value.target.value};
      // does control exist in state?    
      const existing = lookup(state.controls, [control]);
      if(existing.length !== 0) {
        // control already exists, don't add multiple copies, return state
        return state;
        // @TODO: throw error, something went wrong, and handle
      }
      return Object.assign({}, state, {
        // add control to state
        controls: [control].concat(state.controls)
      });
    } else {
      // box is checked, remove
      const control = {name: action.value.target.name, value: action.value.target.value};
      // does control exist in state?    
      const existing = lookup(state.controls, [control]);
      if(typeof existing === 'undefined') {
        // no matching existing control, nothing to remove, return state
        return state;
        // @TODO: throw error, something went wrong, and handle
      }
      return Object.assign({}, state, {
        controls: state.controls.filter(control => 
          // only return controls which do not match name and value of checkbox target
          !(control.name === action.value.target.name && control.value === action.value.target.value)
        )
      });
    }
  }
  return state;
}

const initialState = { 
  controls:[
    {name: "hotelType", value:"5"}
  ],
  visible: ["The Club at Dubai"]
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore