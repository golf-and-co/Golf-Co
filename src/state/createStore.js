import { createStore as reduxCreateStore } from "redux"
import {lookup} from "../components/Control/Lookup";


const reducer = (state, action) => {
  if (action.type === `CHECKBOX_CONTROL`) {
    // reducer for checkbox control click
    const control = {name: action.value.target.name, value: action.value.target.value, applied: false};
    const existing = lookup(state.controls, [control]);
    if(action.value.target.checked) {
      // box is not checked, add
      // does control exist in state?    
      if(existing.length !== 0) {
        // control already exists, don't add multiple copies, return state
        return state;
        // @TODO: throw error, something went wrong, and handle
      }
      return Object.assign({}, state, {
        // add control to state
        controls: [control].concat(state.controls),
      });
    } else {
      // box is checked, remove
      // does control exist in state?    
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
  else if (action.type === `SELECT_CONTROL`) {
    // reducer for select box onChange
    const control = {
      "name": action.value.target.name, 
      "value": action.value.target.value, 
      "applied": false
    };
    const existing = lookup(state.controls, [{name: control.name}]);
    // does control exist in state?    
    if(existing.length !== 0) {
      // control already exists, change
      return Object.assign({}, state, {
        controls: state.controls.filter(existing => 
          // only return controls which do not match name of select
          // for select, do not want multiple values
          !(existing.name === action.value.target.name)
        // add control
        ).concat([control])
      })
    }
    else if(!control.value) {
      // remove existing filter
      return Object.assign({}, state, {
        controls: state.controls.filter(control => 
          // only return controls which do not match name and value of checkbox target
          !(control.name === action.value.target.name)
        )
      });
    }
    else {
      // control does not exist, add
      return Object.assign({}, state, {
        // add control to state
        controls: [control].concat(state.controls)
      });
    }
  }
  else if (action.type === `APPLY_CONTROLS`) {
    // apply controls in state after user clicks button
    return Object.assign({}, state, {
      // add control to state
      controls: state.controls.map(control => {
        control.applied = true;
        return control;
      })
    });
  }
  else if (action.type === `QUERY_STRING_CONTROL`) {
    // allow control to be applied from queryString, for navigation links
    return Object.assign({}, state, {
      // add to controls, to update listings
      controls: [{name:action.value.name, value:action.value.defaultValue, applied: true}].concat(state.controls),
      // add to location, to prevent queryString overriding user interactions
      queryString: Object.assign({[action.value.name]: action.value.defaultValue}, state)
    });
  }
  return state;
}

const initialState = { 
  controls:[],
  queryString:{},
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore