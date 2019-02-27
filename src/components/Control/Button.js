import React from "react";
import {connect} from "react-redux"

const mapDispatchToProps = dispatch => {
  return { click: (event) => {
    dispatch({ type: `APPLY_CONTROLS`, value: event})
  }}
}

const ButtonElement = ({ click, value }) => {  
  return (
    <button className="button is-success is-rounded" onClick={(event) => click(event)}>{value}</button>
  );
}

export const Button = connect(
  null,
  mapDispatchToProps
)(ButtonElement);
