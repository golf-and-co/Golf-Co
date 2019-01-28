import React from 'react'
import { Link } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'
import logo from '../img/logo.svg'

const Background = styled.div`
  padding-bottom:10px;
  text-align: center;
  background-color: #E4ECD9;
`;

const HeroWrap = styled.section`
  background-size: cover;
  background-repeat: no-repeat;
  max-width: none;
  border-radius: 0 0 30% 30%;
  width: 140%;
  margin-left: -20%;
  height: 35vh;
  @media (min-width: 768px) {
    border-radius: 0 0 45% 45%;
  }
`
const Heading = styled.h1`
  text-align: center;
  color: white !important;
  font-family: "Gotham Book";
  font-size: 15px !important;
  font-weight: 300;
  padding: 0.75em;
  margin-top: 8vh !important;
  @media (min-width: 768px) {
    font-size: 30px !important;
    margin-top: 100px;
  }
`

const HeadingStrong = styled.strong`
  font-size: 20px !important;
  @media (min-width: 768px) {
    font-size: 40px !important;
  }
`

const Container = styled.div`
  max-width: 100vw !important;
  margin-left: 20vw !important;
`;

const LogoWrapper = styled.div`
  padding:0;
`;

const Logo = styled(Link)`
  justify-content: center;
  background-color: rgba(0,0,0,0.01) !important;
  padding-top: 45px !important;
  :hover {
    background-color: rgba(0,0,0,0.01) !important;
    color: #FFF !important;
  }
`

const Hero = ({data}) => {
  console.log(data)
  return <Background>
    <HeroWrap style={{
      backgroundImage: `url(${
        !!data.image.childImageSharp
          ? data.image.childImageSharp.fluid.src
          : data.image
      })`,
    }}>


    <Container className="container content columns is-fluid">
      <LogoWrapper className="column is-2">
        <Logo to="/" className="navbar-item" title="Logo">
          <img src={logo} alt="GolfAndCo" />
        </Logo>
      </LogoWrapper>
      <div className="column is-8">
        <Heading className="title">
          <HeadingStrong>{data.title}</HeadingStrong>
        </Heading>
      </div>
    </Container>
  </HeroWrap>
  
</Background>
}

export default Hero;

Hero.propTypes = {
  data: PropTypes.object.isRequired,
}