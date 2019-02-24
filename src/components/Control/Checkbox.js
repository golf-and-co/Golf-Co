import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux"
import {lookup} from "../Control/Lookup";
import styled from "styled-components"

const mapStateToProps = ({controls}) => {
    return {controls};
  }
  
const mapDispatchToProps = dispatch => {
  return { click: (event) => {
    dispatch({ type: `CHECKBOX_CONTROL`, value: event})
  }}
}

const CheckboxElement = ({ controls, click, name, value }) => {
  // if filter exists in state, check
  const checked = lookup(controls, [{"name": name, "value": value}]).length > 0;

  return (
    <div>
        <input type="checkbox" className="is-checkradio is-success" onChange={(event) => click(event)} checked={checked} name={name} value={value} />
        <label className="checkbox">{value}</label>
    </div>
  );
}

export const Checkbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxElement);
