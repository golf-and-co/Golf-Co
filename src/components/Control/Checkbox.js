import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import styled from "styled-components"

const mapStateToProps = ({ controls }) => {
    return { controls }
  }
  
const mapDispatchToProps = dispatch => {
  return { click: (event) => dispatch({ type: `CHECKBOX_FILTER`, value: event}) }
}



const CheckboxElement = ({ controls, name, value }) => {
  // lookup control by name and value, some controls have the same name, but multiple values

  /*
    controls: [
      {
        component: select,
        parent: none,
        name: country,
        defaultValue: <STATE>
        options: ["UAE", "Oman"]
      },
      {
        component: select,
        parent: country,
        name: city,
        defaultValue: <STATE>
        options: ["Dubai", "Khalifa"]
      },
      {
        component: checkbox,
        name: hotelType,
        checked: <STATE>
        value: 5
      },
      {
        component: checkbox,
        name: hotelType,
        checked: <STATE>
        value: 7
      },
    ]
    state: {
      controls: [
        {name:"hotelType", value: "5"},
        {name:"hotelType", value: "7"}
        {name:"city", value: "Dubai"}
      ]
    }    
   */
  const state = lookup(controls, {"name": name}, {"value": value});

  return (
    <div>
        <input type="checkbox" className="is-checkradio is-success" onChange={(event) => click(event)} checked={state.length>0} name={name} value={value} />
        <label className="checkbox">{value}</label>
    </div>
  );
}

export const Checkbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxElement);
