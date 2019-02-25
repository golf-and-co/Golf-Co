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

const mapStateToProps = ({}) => {
    return {};
  }
  
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
  mapStateToProps,
  mapDispatchToProps
)(ButtonElement);
