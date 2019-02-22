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

const initialState = { count: 0 }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore