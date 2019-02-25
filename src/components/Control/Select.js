import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux"
import {lookup} from "./Lookup";
import styled from "styled-components"

const Wrap = styled.div`
.select {
  font-size: 0.8rem;
}

.select:not(.is-multiple):not(.is-loading)::after {
  border-color: #AAA;
}
select {
  width: 170px;
}
`;

const mapStateToProps = ({controls}) => {
    return {controls};
  }
  
const mapDispatchToProps = dispatch => {
  return { change: (event) => {
    dispatch({ type: `SELECT_CONTROL`, value: event})
  }}
}

const SelectElement = ({ controls, change, name, parent, children }) => {
  // is there a control for this select's name existing in state?
  // @TODO: refactor lookup code to return an empty value when name is given, to allow for calling lookup in select attribute
  let value = lookup(controls, [{"name": name}])[0];
  if(typeof value !== 'undefined') {
    // control found, set as value
    value = value.value;
  }
  
  // is parent property set, and does it exist in state
  const parentState = lookup(controls, [{"name": parent}])
  if(typeof parent !== 'undefined' && typeof parentState !== 'undefined') {
    // only show options that belong to selected parent value
    children.filter(child => child.props.data-attribute === parentState)
  }
  
  return (
    <Wrap className="select is-rounded">
        <select type="checkbox" onChange={(event) => change(event)} name={name} value={value}>
        <option value="">{name.charAt(0).toUpperCase() + name.slice(1)}</option>
        {children}
        </select>
    </Wrap>
  );
}

export const Select = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectElement);
