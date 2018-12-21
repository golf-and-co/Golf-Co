import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import Select from '../utilities/Select'

const HeroWrap = styled.section`
  height: 805px;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #F6F9F2;
`
const Heading = styled.h1`
  margin-top: 500px;
  text-align: center;
  color: white !important;
  font-family: "Gotham Book";
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 300;`

const HeadingTag = styled.strong`
  font-size: 60px;
  font-weight: 700;
`

const Search = styled.aside`
  width: 640px;
  height: 90px;
  margin: 0 auto;
  border-radius:46px;
  box-shadow: 0 4px 4px rgba(29, 134, 73, 0.14);
  background-color: #ffffff;
  margin-top: 60px;
  line-height: 90px;
  text-align: center;
`

const Button = styled.a`
  font-family: "Gotham Book";
  vertical-align: middle;
  margin: auto 10px;
  width: 200px;
  height: 50px;
  font-size: 16px;
  font-weight: 700;
`

const Hero = ({data}) => <HeroWrap style={{
  backgroundImage: `url(${
    !!data.image.childImageSharp
      ? data.image.childImageSharp.fluid.src
      : data.image
  })`,
}}>
  <div className="container content">
  <div className="column is-10 is-offset-1">
  <Heading className="title">
    {data.heading1}
    <br />
    <HeadingTag>{data.heading2}</HeadingTag>
  </Heading>
  </div>
  </div>
  <Search>
  <Select options={[{value:"UAE"}]} />
  <Select options={[{value:"Select City"}]} />
  <Button className="button is-link is-rounded">View Golf Course</Button>
  </Search>
</HeroWrap>

Hero.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Hero;