import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Wrap = styled.div`
  padding: 50px 0px 220px 0px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0px;
    padding-bottom: 50px;
  }

  .benefits {
    display: flex;
    justifyContent: center;

    @media (max-width: 768px) {
      display:block;
    }
  }
  
  .packages {
    @media (min-width: 960px) {
      margin: 65px auto;
      width: 960px;
    }
  }

  .package {
    @media (min-width: 960px) {
      width:450px;
      float:left; 
      margin:15px;
      position:relative;
    }
    @media (max-width: 768px) {
      margin: 20px;
    }
  }

  .package a {
    position: relative;
  }

  .package h6 {
      color: rgb(255, 255, 255);
      font-size: 30px;
      top: -143px;
      position: absolute;
      width: 100%;
  }
`;

const Heading = styled.h1`
  margin: 0px auto 10px auto;
  color: #a8844e;
  font-size: 2em;
  font-family: Gotham;
  text-transform: uppercase;

  &.bottomMargin {
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    margin: 0 auto;
    margin-bottom: 0px;
  }
`;

const Paragraph = styled.p`
  margin: 10px auto;
  color: #000;
  font-size: 1rem;
  line-height: 1.75rem;
  padding: 0 10%;

  @media (max-width: 768px) {
    text-align: center;
    padding: 5px 10px;
  }
`;

const Container = styled.div`
  padding: 1.5em 0em 2em 0em;
  display: block;
  clear: both;
`;

const BespokePackages = ({ data }) => {
  return (
    <Wrap style={{backgroundColor:"#F6F9F2"}}>
      <Container className="container">
        <Heading className="bottomMargin">{data.heading1}</Heading>
        <Paragraph>{data.paragraph1}</Paragraph>
      </Container>
      <div className="benefits container" style={{}}>
        {data.benefits.map(benefit => <div className="column is-one-quarter">
          <img src={benefit.image.publicURL} alt="Glamorous Hotel Scenes: Gourmet appetizers / Light tone lobby with sea view / Dark colored luxury sedan on runway with private jet / Waterfront with docked boat with mass down sail and brightly colored buildings" />
          <h6 style={{color:"#a8844e", textTransform:"uppercase", fontSize:"1.25em", fontWeight:"bold"}}>{benefit.description}</h6>
        </div>)}
      </div>  

      <div className="container packages">
        {data.packages.map(item => <div className="package">
          <a href={item.pdf.publicURL}>
            <img src={item.image.publicURL} alt="Stone bridge on course similiar to Saint Andrew's / Mist over rich golf green, water hazard on left of green, with golfer sizing putt and high-trimmed trees in background / Landscape view of distant reflective clubhouse with high rough and sand bunker at sunset / Golfer in full backswing across large water hazard with distant hills"/>
            <h6>{item.heading}</h6>
          </a>
        </div>)}
      </div> 


      <Container className="container sendRequest">
        <Heading>{data.heading2}</Heading>
        <Paragraph>{data.paragraph2}</Paragraph>
        <a href="/send-request" className="button is-link is-rounded" style={{marginTop:"10px", background:"#A8844E", padding:"20px", fontSize: "16px", fontFamily: "Gotham Bold"}}>START YOUR JOURNEY NOW</a>
      </Container>
    </Wrap>
  );
};

export default BespokePackages;

BespokePackages.propTypes = {
  data: PropTypes.object.isRequired
};