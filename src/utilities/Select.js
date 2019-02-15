import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const SelectWrap = styled.div`
  vertical-align: middle !important;
  width: 150px;
  height: 50px !important;
  margin: auto 5px;
  font-size: 1rem;

  @media (min-width: 768px) {
    width: 180px;
    margin: auto 10px;
  }
`

const SelectBox = styled.select`
  height: auto !important;
  line-height: 50px;
  height: 48px !important;
  width: 180px;
`

const Select = ({ options, id, onChange }) => (
  <SelectWrap className="select is-rounded">
    <SelectBox id={id} onChange={onChange}>
      {options.map(item => (
        <option key={v4()}>{item.value}</option>
      ))}
    </SelectBox>
  </SelectWrap>
)

Select.propTypes = {
  options: PropTypes.array.isRequired,
}

export default Select
