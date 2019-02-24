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
  // is there a control for this select's name?
  let defaultValue = lookup(controls, [{"name": name}])[0];
  if(typeof defaultValue !== 'undefined') {
    // control found, set value
    defaultValue = defaultValue.value;
  }
  

/*  if(lookup(controls, [{"name": parent}])) {
    // only show options that belong to selected parent value
    children.filter(child => child.attribute[`data-${parent.name}`] === parent.value)
  } */
  
  return (
    <Wrap className="select is-rounded">
        <select type="checkbox" onChange={(event) => change(event)} name={name} defaultValue={defaultValue}>
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
