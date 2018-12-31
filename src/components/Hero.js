import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby"
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
  border-radius: 0 0 45% 45%;
  width: 140%;
  margin-left: -20%;
  background-position-y: -50vh;

`
const Heading = styled.h1`
  margin-top: 20vh !important;
  margin-bottom: 10vh !important;
  text-align: center;
  color: white !important;
  font-family: "Gotham Book";
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 300;
`

const HeadingStrong = styled.strong`
  font-size: 60px;
  font-weight: 700;
`

const Search = styled.aside`
  width: 640px;
  height: 90px;
  margin: 0 auto;
  margin-top: -45px;
  border-radius: 45px;
  box-shadow: 0 4px 4px rgba(29, 134, 73, 0.14);
  background-color: #ffffff;
  line-height: 90px;
  text-align: center;
  vertical-align: middle !important;
`

const Button = styled.a`
  font-family: "Gotham Book";
  vertical-align: middle !important;
  margin: auto 10px;
  width: 200px;
  height: 50px;
  font-size: 16px;
  font-weight: 700;
`

const Logo = styled(Link)`
  justify-content: center;
  background-color: rgba(0,0,0,0.02) !important;

  :hover {
    background-color: rgba(0,0,0,0.02) !important;
    color: #FFF !important;
  }
`

const Hero = ({data}) => <Background>
  <HeroWrap style={{
    backgroundImage: `url(${
      !!data.image.childImageSharp
        ? data.image.childImageSharp.fluid.src
        : data.image
    })`,
  }}>
    <div className="container content is-fluid">
    <div className="column is-10 is-offset-1">
    <Logo to="/" className="navbar-item" title="Logo">
      <img src={logo} alt="GolfAndCo" />
    </Logo>
    <Heading className="title">
      {data.heading1}
      <br />
      <HeadingStrong>{data.heading2}</HeadingStrong>
    </Heading>
    </div>
    </div>
    </HeroWrap>
    <Search>
      <Select options={[{value:"UAE"}]} />
      <Select options={[{value:"Select City"}]} />
      <Button className="button is-link is-rounded">View Golf Course</Button>
    </Search>
</Background>;

export default props => (
  <StaticQuery
    query={graphql`{
      allMarkdownRemark(filter: {frontmatter: {title: {eq: "Home"}}}) {
        edges {
          node {
            frontmatter {
              heading1
              heading2
              image {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }`} render={data => <Hero data={data.allMarkdownRemark.edges[0].node.frontmatter} {...props} />} />
)

Hero.propTypes = {
  data: PropTypes.object.isRequired,
}