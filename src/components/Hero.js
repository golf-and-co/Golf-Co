import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {group, rollup} from "d3-array";
import { v4 } from 'uuid'
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

const Hero = ({ data }) => {
  const homepage = data.homepage.edges[0].node.frontmatter;
  const courses = data.courses.edges;

  console.log(
    
    
  );
  let countries = Array.from(group(
    courses, 
    course => course.node.frontmatter.country
  ).keys()).map(country => { 
    return {value:country}
  });
  countries.unshift({value:"--- All ---"});

  let cities = Array.from(group(
    courses, 
    course => course.node.frontmatter.city
  ).keys()).map(city => { 
    return {value:city}
  });
  cities.unshift({value:"--- All ---"});

  const nested = rollup(data.courses.edges, v => v.length, d => d.node.frontmatter.country, d => d.node.frontmatter.city);

  const updateCities = () => {
    const country = document.querySelector('#heroCountry').value;
    let update = [];
    if(country === '--- All ---') {
      update = Array.from(nested.get(country).keys());
    } else {
      update = cities;
    }

    document.querySelector('#heroCities').innerHTML = update.map(city => `<option>${city.value}</option>`).join(" ");
  }

  const redirect = () => {
    window.location.href = `/courses/?city=${document.querySelector('#heroCities').value}`;
  }

  return <Background>
    <HeroWrap
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.0) ), url(${
          !!homepage
            ? homepage.image.childImageSharp.fluid.src
            : homepage.image
        })`,
      }}
    >
      <div className="container content is-fluid">
        <div className="column is-10 is-offset-1">
          <Logo to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="GolfAndCo" />
          </Logo>
          <Heading className="title">
            {homepage.heading1}
            <br />
            <HeadingStrong>{homepage.heading2}</HeadingStrong>
          </Heading>
        </div>
      </div>
    </HeroWrap>
    <Search>
      <Select id="heroCountry" options={countries} onChange = {() => updateCities()}/>
      <Select id="heroCities" options={cities} />
      <Button className="button is-link is-rounded" onClick={() => redirect()}>View Golf Course</Button>
    </Search>
  </Background>
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        homepage:allMarkdownRemark(filter: { frontmatter: { title: { eq: "Home" } } }) {
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
        },
        courses:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "course"}, isFeatured:{eq: true}}}, limit:4 sort:{fields:frontmatter___date, order:DESC}){
          edges{
            node{
              fields{
                slug
              }
              frontmatter{
                isFeatured
                title
                city
                region
                country
                description
                featuredDetails{
                  image{
                    childImageSharp{
                      fluid(maxWidth: 2048, quality: 100) {
                          ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  name
                  description            
                }
                stats{
                  icon {
                      publicURL
                  }
                  label
                  value
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Hero
        data={data}
        {...props}
      />
    )}
  />
)

Hero.propTypes = {
  data: PropTypes.object.isRequired,
}
