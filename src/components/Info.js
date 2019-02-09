import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrap = styled.section`
  background-color: #f6f9f2;
  padding: 90px 0 220px 0;
  justify-content: center;
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

  @media (min-width: 768px) {
    width: 200px;
    height: 80px;
  }
`

const Element = ({data}) => <Graphic className="column is-one-quarter">
  <img src={data.image.publicURL} alt="Tailor Made" />
  <Heading>{data.heading}</Heading>
  <Body>{data.description}</Body>
</Graphic>;

export const Infographic = ({ data }) => (
  <Wrap className="columns is-desktop">
    {data.info.map(row => <Element data={data} /> )}
  </Wrap>
);

Infographic.propTypes = {
  data: PropTypes.object.isRequired,
}
