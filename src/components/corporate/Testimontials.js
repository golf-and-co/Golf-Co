import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'

const Wrap = styled.section`
  background-color: #f5f8f1;
  padding: 30px;
  height: 600px;

  p {
    max-width: 920px;
    margin: 20px auto;
    color: #1d8649;
    text-align: center;
    font-weight: 900;
    font-size: 30px;

    @media (max-width: 768px) {
      margin: 5px auto;
    }
  }
`

const Content = ({data}) =>   <Wrap>
  <p>Testimontials</p>
</Wrap>


export default Content;
            
Content.propTypes = {
    data: PropTypes.object.isRequired,
}