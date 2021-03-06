import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import PropTypes from "prop-types";
import logo from "../img/logo.svg";

const Background = styled.div`
  padding-bottom: 10px;
  text-align: center;
  background-color: #e4ecd9;
`;

const HeroWrap = styled.section`
  background-size: cover;
  background-repeat: no-repeat;
  max-width: none;
  border-bottom-right-radius: 50% 10%;
  border-bottom-left-radius: 50% 10%;
  height: 35vh;

  @media (max-width: 768px) {
    background-size: inherit;
  }
`;
const Heading = styled.h1`
  text-align: center;
  color: white !important;
  font-family: "Gotham Book";
  font-size: 15px !important;
  font-weight: 300;
  padding: 0.75em;

  @media (min-width: 768px) {
    font-size: 30px !important;
    margin-top: 8vh;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeadingStrong = styled.strong`
  font-size: 20px !important;
  @media (min-width: 768px) {
    font-size: 40px !important;
  }
`;

const Container = styled.div`
  max-width: 100vw !important;
`;

const LogoWrapper = styled.div`
  padding: 0;
`;

const Logo = styled(Link)`
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.01) !important;
  :hover {
    background-color: rgba(0, 0, 0, 0.01) !important;
    color: #fff !important;
  }

  &.navbar-item {
    padding-top: 45px;
  }
`;

const Hero = ({ data }) => {
  return (
    <Background
      style={{
        backgroundColor: data.backgroundColor
      }}
    >
      <HeroWrap
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url(${
            !!data.image.childImageSharp
              ? data.image.childImageSharp.fluid.src
              : data.image
          })`,
          height: `${data.height}`
        }}
      >
        <Container className="container content columns is-fluid">
          <LogoWrapper className="column is-2">
            <Logo
              to="/"
              className="navbar-item"
              title="Logo"
              style={{ paddingTop: data.logoMargin }}
            >
              <img src={logo} alt="GolfAndCo" />
            </Logo>
          </LogoWrapper>
          <div className="column is-8">
            <Heading className="title" style={{ marginTop: data.logoMargin }}>
              <HeadingStrong>{data.title}</HeadingStrong>
            </Heading>
          </div>
        </Container>
      </HeroWrap>
    </Background>
  );
};

export default Hero;

Hero.propTypes = {
  data: PropTypes.object.isRequired
};
