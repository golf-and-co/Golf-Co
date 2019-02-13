import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Select from '../utilities/Select'
import logo from '../img/logo.svg'

const Background = styled.div`
  background: #f6f9f2;
  padding-bottom: 10px;
  text-align: center;
`

const HeroWrap = styled.section`
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #f6f9f2;
  max-width: none;
  border-bottom-right-radius: 50% 10%;
  border-bottom-left-radius: 50% 10%;
`
const Heading = styled.h1`
  margin-top: 20vh !important;
  margin-bottom: 10vh !important;
  text-align: center;
  color: white !important;
  font-family: 'Gotham Book';
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
  font-family: 'Gotham Book';
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
  background-color: rgba(0, 0, 0, 0.01) !important;
  padding-top: 45px !important;
  :hover {
    background-color: rgba(0, 0, 0, 0.01) !important;
    color: #fff !important;
  }
`

const Hero = ({ data }) => (
  <Background>
    <HeroWrap
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.0) ), url(${
          !!data.image.childImageSharp
            ? data.image.childImageSharp.fluid.src
            : data.image
        })`,
      }}
    >
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
      <Select options={[{ value: 'UAE' }]} />
      <Select options={[{ value: 'Select City' }]} />
      <Button className="button is-link is-rounded">View Golf Course</Button>
    </Search>
  </Background>
)

export default props => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(filter: { frontmatter: { title: { eq: "Home" } } }) {
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
      }
    `}
    render={data => (
      <Hero
        data={data.allMarkdownRemark.edges[0].node.frontmatter}
        {...props}
      />
    )}
  />
)

Hero.propTypes = {
  data: PropTypes.object.isRequired,
}
