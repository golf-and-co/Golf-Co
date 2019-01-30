import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ListPackages from "./ListPackages";

const Wrap = styled.div`
  padding: 70px 0px 220px 0px;
  text-align: center;
`;

const Heading = styled.h1`
  // margin: 20px auto;
  color: #1d8649;
  font-size: 1.5em;
  font-family: "Gotham Black";
  font-weight: 100;
`;

const Paragraph = styled.p`
  margin: 10px auto;
  max-width: 920px;
  color: #000;
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
`;

const BespokePackages = ({ data }) => {
  return (
    <Wrap>
      <Container>
        <Heading>{data.heading1}</Heading>
        <Paragraph>{data.description1}</Paragraph>
      </Container>
      <BackgroundImage
        style={{ backgroundImage: `url(${data.backgroundImage.publicURL})` }}
      />
      <ListPackages data={data} />
      <Container>
        <Heading>{data.heading2}</Heading>
        <Paragraph>{data.description2}</Paragraph>
      </Container>
      <a href="/" className="button is-link is-rounded">GET IN TOUCH WITH US</a>
    </Wrap>
  );
};

export default BespokePackages;

BespokePackages.propTypes = {
  data: PropTypes.object.isRequired
};