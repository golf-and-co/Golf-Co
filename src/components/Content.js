import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrap = styled.section`
  background-color: #e4ecd9;
  padding: 90px 10px 220px 10px;

  p {
    max-width: 920px;
    margin: 20px auto;
    color: #000;
    text-align: center;

    @media (max-width: 768px) {
      margin: 5px auto;
    }
  }
`
const Content = ({ data }) => (
  <Wrap>
    <p>{data.description}</p>
  </Wrap>
)

export default Content

Content.propTypes = {
  data: PropTypes.object.isRequired,
}
