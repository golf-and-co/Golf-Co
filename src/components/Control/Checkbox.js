import React from "react";
import {connect} from "react-redux"
import {lookup} from "../Control/Lookup";
import styled from "styled-components"

const Wrap = styled.div`
  input {
    margin: 8px 0 0 12px;
    z-index: 10;
    cursor: pointer;
  }
  & .is-checkradio[type="checkbox"] + label {
    color: #000;
    font-size: 0.8rem;
  }
  & .is-checkradio[type="checkbox"] + label::before, .is-checkradio[type="checkbox"] + label::before {
    width: 14px;
    height: 14px;
    top: 4px;
    left: 8px;
    border: 1px solid #cfddbb;
    background-color: #f6f9f2;
  }
  & .is-checkradio[type="checkbox"] + label::after, .is-checkradio[type="checkbox"] + label::after {
    top: 5px;
    left: 9px;
    width: 6px;
    height: 8px;
  }
  & .is-checkradio[type="checkbox"].is-success:checked + label::after, .is-checkradio[type="checkbox"].is-success:checked + label::after {
    border-color: #1d8649 !important;
  }

  br {
    line-height: 1;
  }`;

const mapStateToProps = ({controls}) => {
    return {controls};
  }
  
const mapDispatchToProps = dispatch => {
  return { click: (event) => {
    dispatch({ type: `CHECKBOX_CONTROL`, value: event})
  }}
}

const CheckboxElement = ({ controls, click, name, value }) => {
  // if control exists in state, check
  const checked = lookup(controls, [{"name": name, "value": value}]).length > 0;

  return (
    <Wrap>
        <input type="checkbox" className="is-checkradio is-success" onChange={(event) => click(event)} checked={checked} name={name} value={value} />
        <label className="checkbox">{value}</label>
    </Wrap>
  );
}

export const Checkbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxElement);
