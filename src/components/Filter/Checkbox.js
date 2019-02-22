import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import styled from "styled-components"

const mapStateToProps = ({ checked }) => {
    return { checked }
  }
  
const mapDispatchToProps = dispatch => {
return { click: (event) => dispatch({ type: `CHECKBOX_FILTER`, value: event}) }
}

const CheckboxElement = ({ click, checked, label }) => (
  <div>
      <input type="checkbox" className="is-checkradio is-success" onChange={(event) => click(event)} checked={checked} value={label} />
      <label className="checkbox">{label}</label>
  </div>
)

export const Checkbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxElement);
