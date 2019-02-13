import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ListPackages from "./ListPackages";

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

const BackgroundImage = styled.div`
    position: absolute;
    background-size: cover;
    height: 43em;
    width: 100vw;
    filter: blur(5px) brightness(70%);
    z-index: -1;
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
          <img src={benefit.image.publicURL} />
          <h6 style={{color:"#a8844e", textTransform:"uppercase", fontSize:"1.25em", fontWeight:"bold"}}>{benefit.description}</h6>
        </div>)}
      </div>  

      <div className="container" style={{margin: "65px auto", width:"960px"}}>
        {data.packages.map(item => <div style={{width:"450px", float:"left", margin:"15px", position: "relative"}}>
          <img src={item.image.publicURL} />
          <h6 style={{color:"#FFF", fontSize:"1.25em", fontSize:"30px", top: "120px", position: "absolute", width: "450px"}}>{item.heading}</h6>
        </div>)}
      </div> 


      <Container className="container">
        <Heading>{data.heading2}</Heading>
        <Paragraph>{data.paragraph2}</Paragraph>
      </Container>
      <a href="/" className="button is-link is-rounded" style={{background:"#A8844E", padding:"20px", fontSize: "16px", fontFamily: "Gotham Bold"}}>GET IN TOUCH WITH US</a>
    </Wrap>
  );
};

export default BespokePackages;

BespokePackages.propTypes = {
  data: PropTypes.object.isRequired
};