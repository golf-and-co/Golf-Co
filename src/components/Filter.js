import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Select from '../utilities/Select'

const Wrap = styled.section`
  display: flex;
`

const Box = styled.section`
  background-color: #fff;
`

const Filter = ({ data }) => (
  <Wrap>
    <Box />
  </Wrap>
)

Filter.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Filter
