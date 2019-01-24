import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrap = styled.section`
  background-color: #E4ECD9;
  padding:30px;

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
