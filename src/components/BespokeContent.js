import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrap = styled.section`
  padding: 40px 10px 0px 10px;
  p {
    max-width: 920px;
    margin: 20px auto;
    color: #000;
    text-align: center;
  }
`
const BespokeContent = ({ data }) => (
  <Wrap>
    <p>{data.paragraph1}</p>
    <p>{data.paragraph2}</p>
  </Wrap>
)

export default BespokeContent

BespokeContent.propTypes = {
  data: PropTypes.object.isRequired,
}
