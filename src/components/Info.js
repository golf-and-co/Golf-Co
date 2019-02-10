import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrap = styled.section`
  background-color: #f6f9f2;
  padding: 90px 0 220px 0;
  justify-content: center;

  &.filled > div {
    background: #EAF2E1;
    border-radius: 237px;
    width: 237px;
    max-width: 237px;
    height: 237px;
    text-align: center;
    padding: 20px 0;
  }

  &.filled .heading {
    display: none;
  }

  &.filled .body {
    margin-top: 30px;
  }
`

const Graphic = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    max-width: 200px;
    margin: auto 45px;
  }

  @media (max-width: 768px) {
    max-width: 200px;
    margin: auto;
  }
`

const Heading = styled.p`
  height: 41px;
  color: #1d8649;
  font-size: 18px;
  font-weight: 300;
  text-transform: uppercase;
  line-height: 1;
`

const Body = styled.p`
  color: #4a4a4a;
  font-size: 14px;
  font-weight: 300;
  line-height: 16px;
  width: 227px;
  padding: 0 30px;
`

const Element = ({data}) => {
  return <Graphic className="column is-one-quarter">
    <img src={data.image.publicURL} alt="Tailor Made" />
    <Heading className="heading">{data.heading}</Heading>
    <Body className="body">{data.description}</Body>
  </Graphic>;
}

const Infographic = ({ data }) => {
  const classes = () => {
    if(data.filled) {
      return "filled columns is-desktop"
    } else {
      return "columns is-desktop"
    }
  }

  return <Wrap className={classes()}>
    {data.infographics.map(row => <Element data={row} /> )}
  </Wrap>;
}

export default Infographic;

Infographic.propTypes = {
  data: PropTypes.object.isRequired,
}
