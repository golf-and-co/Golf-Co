import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrap = styled.section`
  background-color: #e4ecd9;
  padding: 30px;

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
<<<<<<< HEAD
const Content = ({ data }) => (
  <Wrap>
    <p>{data.description}</p>
  </Wrap>
)
=======

const Content = ({data}) => <Wrap>
    <p>{data.top.message}</p>
</Wrap>
>>>>>>> add basic corporate page

export default Content

Content.propTypes = {
  data: PropTypes.object.isRequired,
}
