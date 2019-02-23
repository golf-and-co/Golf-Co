import { createStore as reduxCreateStore } from "redux"
import {lookup} from "../components/Control/Lookup";

const reducer = (state, action) => {
  if (action.type === `CHECKBOX_FILTER`) {
    console.log("Checkbox filter");
    
    if(lookup(state.controls, [{name: "courseType"}, {value: "Earth Course"}]).length === 0) {
      state.controls.push({name: "courseType", value: "Earth Course"});
      // return new object to replace state
      return Object.assign({}, state);
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