import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const Wrap = styled.section`
  background-color: #f6f9f2;
  padding: 20px 0 220px 0;
  justify-content: center;

  &.filled {
    padding: 90px 0;
    margin-bottom: 0;
  }

  &.filled.columns {
    margin-bottom:0;
  }
  
  &.filled > div {
    background: #EAF2E1;
    border-radius: 237px;
    width: 237px;
    max-width: 237px;
    height: 237px;
    text-align: center;
    padding: 20px 0;
  }

  &.filled img {
    margin-top: 15px;
  }

  &.filled .fillHeading {
    display: none;
  }

  &.filled .body {
    margin-top: 15px;
    width: 227px;
    padding: 0 30px;
  }
`

const Graphic = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    max-width: 200px;
    margin: 0 45px;
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
  font-weight: 900;
  width: 90%;
  margin: 5px auto;
  text-transform: uppercase;
  line-height: 1.125;
`

const Button = styled.a`
    display: block !important;
    background:none !important;
    color: #1d8649 !important;
    font-weight: 300;
    text-transform: uppercase;
    border-color: #1d8649 !important;
    text-align: center;
    margin: 0 auto;
    width: 95%;
`;

const Body = styled.p`
  color: #4a4a4a;
  font-size: 14px;
  font-weight: 300;
  line-height: 16px;
  height: 80px;
`

const InfographicsHeader = styled.p`
  font-weight: 300;
  color: #1d8649;
  font-size: 26px;
  margin: 50px auto 0px auto;
  text-align: center;
  max-width:780px;
  text-transform: uppercase;
`



const Element = ({data, filled}) => {
  const Buttons = () => {
    if(!filled) {
      return <Button href={data.url} className="button is-rounded">{data.urlText}</Button>   
    }
  }

  return <Graphic className="column is-one-quarter">
    <img src={data.image.publicURL} alt="Tailor Made" />
    <Heading className="fillHeading">{data.heading}</Heading>
    <Body className="body">{data.description}</Body>
    {Buttons()}
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

  if(data.hasOwnProperty("infographicsContainer")) {
    return <div style={{backgroundColor: "#f6f9f2"}}>
      <p style={{padding:"30px 0 0 0", maxWidth:"780px", color: "#4a4a4a", margin: "0 auto", textAlign: "center"}}>{data.headingParagraph}</p>
      <InfographicsHeader>{data.infographicsContainer.infographicsHeader}</InfographicsHeader>
      <Wrap className={classes()}>
        {data.infographicsContainer.infographics.map(row => <Element key={v4()} data={row} /> )}
      </Wrap>
    </div>;
  } else {
    return <div style={{backgroundColor: "#f6f9f2"}}>
        <p style={{padding:"30px 0 0 0", maxWidth:"780px", color: "#4a4a4a", margin: "0 auto", textAlign: "center"}}>{data.headingParagraph}</p>
        <Wrap className={classes()}>
          {data.infographics.map(row => <Element key={v4()} data={row} filled={data.filled}/> )}
        </Wrap>
    </div>
  }
}

export default Infographic;

Infographic.propTypes = {
  data: PropTypes.object.isRequired,
}
