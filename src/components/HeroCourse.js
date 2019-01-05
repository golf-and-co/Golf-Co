import React from 'react'
import { Link } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'
import Select from '../utilities/Select'
import logo from '../img/logo.svg'

const Background = styled.div`
  background: #f6f9f2;
  padding-bottom:10px;
  text-align: center;
`;

const HeroWrap = styled.section`
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #F6F9F2;
  max-width: none;
  border-radius: 0 0 30% 30%;
  width: 140%;
  margin-left: -20%;

  @media (min-width: 768px) {
    background-position-y: -50vh;
    border-radius: 0 0 45% 45%;
  }

`
const Heading = styled.h1`
  margin-top: 20vh !important;
  margin-bottom: 10vh !important;
  text-align: center;
  color: white !important;
  font-family: "Gotham Book";
  text-transform: uppercase;
  font-size: 15px !important;
  font-weight: 300;

  @media (min-width: 768px) {
    font-size: 30px !important;
  }
`

const HeadingStrong = styled.strong`
  font-size: 30px !important;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 60px !important;
    font-weight: 700;
  }
`

const Search = styled.aside`
  margin: 0 auto;
  margin-top: -45px;
  border-radius: 45px;
  box-shadow: 0 4px 4px rgba(29, 134, 73, 0.14);
  background-color: #ffffff;
  line-height: 90px;
  text-align: center;
  vertical-align: middle !important;
  position: relative;

  @media (min-width: 768px) {
    width: 640px;
    height: 90px;
  }

  @media (max-width: 768px) {
    max-width: 340px;
  }
`

const Button = styled.a`
  font-family: "Gotham Book";
  vertical-align: middle !important;
  margin: auto 10px;
  width: 200px;
  height: 50px;
  font-size: 16px;
  font-weight: 700;

  @media (max-width: 768px) {
    position: absolute !important;
    top: 75px;
    left: calc(50% - 100px);
  }
`

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

console.log(data);

return <Background>
  <HeroWrap style={{
    backgroundImage: `url(${
      !!data.image.childImageSharp
        ? data.image.childImageSharp.fluid.src
        : data.image
    })`,
  }}>
    <div className="container content columns is-fluid">
    <div className="column is-1 is-offset-2">
      <Logo to="/" className="navbar-item" title="Logo">
        <img src={logo} alt="GolfAndCo" />
      </Logo>
    </div>
    <div className="column is-6">
      <Heading className="title">
        <HeadingStrong>{data.title}</HeadingStrong>
        <br />
        {data.city}, {data.country}
      </Heading>
    </div>
    </div>
    </HeroWrap>
    <Search>
      <Select options={[{value:"UAE"}]} />
      <Select options={[{value:"Select City"}]} />
      <Button className="button is-link is-rounded">View Golf Course</Button>
    </Search>
</Background>
};

export default Hero;

Hero.propTypes = {
  data: PropTypes.object.isRequired,
}