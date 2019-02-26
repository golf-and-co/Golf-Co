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

const mapStateToProps = ({controls, queryString}) => {
    return {controls, queryString};
  }
  
const mapDispatchToProps = dispatch => {
  return { 
    change: (event) => {
      dispatch({ type: `SELECT_CONTROL`, value: event})
    },
    startup: (defaultControl) => {
      dispatch({type: 'QUERY_STRING_CONTROL', value: defaultControl})
    }
  }
}

const SelectElement = ({ controls, queryString, change, startup, name, parent, children, defaultValue }) => {
  // is there a control for this select's name existing in state?
  // @TODO: refactor lookup code to return an empty value when name is given, to allow for calling lookup in select attribute
  let value = lookup(controls, [{"name": name}])[0];
  if(typeof value !== 'undefined') {
    // control found, set as value
    value = value.value;
  }

  // defaultValue is usually from query string, to allow navigation to specifc control settings from the url
  // @TODO: need state for what has been set, so it's not overwritten by location
  // let's do a state.location, overrule

  // has defaultValue property, and no state exists for defaultValue
  if(typeof defaultValue !== "undefined" && typeof queryString[name] === "undefined") {
    // set value
    value = defaultValue;
    // dispatch queryString
    startup({name: `${name}`, defaultValue: `${defaultValue}`});
  }
  
  // is parent property set, and does it exist in state
  const parentState = lookup(controls, [{"name": parent}])
  if(typeof parent !== 'undefined' && typeof parentState !== 'undefined') {
    // only show options that belong to selected parent value
    children.filter(child => child.props["data-country"] === parentState)
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
