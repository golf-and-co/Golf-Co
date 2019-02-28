import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrap = styled.div`
  padding: 50px 0px 220px 0px;
  text-align: center;
`;

const Heading = styled.h1`
  margin: 0px auto 50px auto;
  color: #a8844e;
  font-size: 2em;
  font-family: Gotham;
  text-transform: uppercase;
`;

const Paragraph = styled.p`
  margin: 10px auto;
  color: #000;
  font-size: 1rem;
  line-height: 1.75rem;
  padding: 0 10%;

  @media (max-width: 768px) {
    text-align: left;
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
        <Heading>{data.heading1}</Heading>
        <Paragraph>{data.paragraph1}</Paragraph>
      </Container>
      <div style={{"display":"flex", "justifyContent":"center"}}>
        {data.benefits.map(benefit => <div style={{width:"285px"}}>
          <img src={benefit.image.publicURL} alt="Glamorous Hotel Scenes: Gourmet appetizers / Light tone lobby with sea view / Dark colored luxury sedan on runway with private jet / Waterfront with docked boat with mass down sail and brightly colored buildings" />
          <h6 style={{color:"#a8844e", textTransform:"uppercase", fontSize:"1.25em", fontWeight:"bold"}}>{benefit.description}</h6>
        </div>)}
      </div>  

      <div className="container" style={{margin: "65px auto", width:"960px"}}>
        {data.packages.map(item => <div style={{width:"450px", float:"left", margin:"15px", position: "relative"}}>
          <img src={item.image.publicURL} alt="Stone bridge on course similiar to Saint Andrew's / Mist over rich golf green, water hazard on left of green, with golfer sizing putt and high-trimmed trees in background / Landscape view of distant reflective clubhouse with high rough and sand bunker at sunset / Golfer in full backswing across large water hazard with distant hills"/>
          <h6 style={{color:"#FFF", fontSize:"30px", top: "120px", position: "absolute", width: "450px"}}>{item.heading}</h6>
        </div>)}
      </div> 


      <Container className="container">
        <Heading>{data.heading2}</Heading>
        <Paragraph>{data.paragraph2}</Paragraph>
      </Container>
      <a href="/" className="button is-link is-rounded" style={{background:"#A8844E", padding:"20px", fontSize: "16px", fontFamily: "Gotham Bold"}}>START YOUR JOURNEY NOW</a>
    </Wrap>
  );
};

export default BespokePackages;

BespokePackages.propTypes = {
  data: PropTypes.object.isRequired
};