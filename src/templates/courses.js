import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components"
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Content from "../components/Content";
import {aggregate} from "../components/Control/Aggregate";
import {Checkbox} from "../components/Control/Checkbox";
import {Select} from "../components/Control/Select";
import queryString from "query-string";
import {Button} from "../components/Control/Button";
import {Grid} from '../components/Grid'
import slugify from "slugify";
import Footer from "../components/Footer";


const Background = styled.section`
    padding-bottom: 200px;
    background-color: #E4ECD9;
`;

const Wrap = styled.section`
    @media (min-width: 768px) {
        width: 1110px;
        max-width: 100%;
    }
    margin: 0 auto !important;

    h1.search {
      color: #1d8649;
      font-size: 1.1rem;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }

`;

const ControlWrap = styled.div`
  section {
    justify-content: right;
  }
  @media (max-width: 768px) {
    display: none !important;
  }
`;

const ControlBox = styled.div`
    display: flex;
    @media (max-width: 768px) {
      display: none;
      background-size: inherit;
    }

    h6 {
        color: #000;
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: bold;
        margin: 15px 15px 25px 5px;
    }
    .select {
        font-size: 0.8rem;
    }

    .select:not(.is-multiple):not(.is-loading)::after {
        border-color: #AAA;
    }
    select {
        width: 170px;
    }
    button.button.is-success {
        background-color: #1d8649;
        font-size: 14px;
        margin: 15px auto;
        display: block;
        width: 97px;
    }
    a.clear {
        color: #333;
        font-size: 0.6rem;
        text-transform: none;
        text-align: right;
        margin-left: 40px;
    }
    .is-checkradio[type="checkbox"] + label {
        color: #000;
        font-size: 0.8rem;
    }
    .is-checkradio[type="checkbox"] + label::before, .is-checkradio[type="checkbox"] + label::before {
        width: 14px;
        height: 14px;
        top: 4px;
        border: 1px solid #cfddbb;
        background-color: #f6f9f2;
    }
    .is-checkradio[type="checkbox"] + label::after, .is-checkradio[type="checkbox"] + label::after {
        top: 5px;
        left: 12px;
        width: 6px;
        height: 8px;
    }
    .is-checkradio[type="checkbox"].is-success:checked + label::after, .is-checkradio[type="checkbox"].is-success:checked + label::after {
        border-color: #1d8649 !important;
    }

    br {
        line-height: 1;
    }
`;

const Control = styled.section`
    background-color: #FFF;
    width: 260px;
    min-height:225px;
    justify-content:right;
    border-radius: 3px;
    box-shadow: 3px 3px 3px rgba(0,0,0,0.1);

    & > .select {
        margin: 10px 15px;
    }
`

export const PageTemplate = ({ title }) => (
  <section className="section section--gradient">
    <div className="container">Preview Offline</div>
  </section>
);

PageTemplate.propTypes = {
  title: PropTypes.string
};


const Controls = ({countries, cities, courseType, holes, amenities, location}) => 
<ControlWrap className="column is-one-fifth">
  <ControlBox>
    <Control>
      <h6 style={{display: "flex", padding: "5px 10px"}}>Location <a style={{marginLeft:"auto"}} href="/" className="clear">Clear</a></h6>
      <Select name="country" defaultValue={queryString.parse(location.search).country}>
        {countries.map(country => <option key={slugify(country)} value={country}>{country}</option>)}
      </Select>
      <br />
      <Select name="city" parent="country" defaultValue={queryString.parse(location.search).city}>
        {cities.map(city => <option key={slugify(city.value)} value={city.value} data-country={city.parent}>{city.value}</option>)}
      </Select>
      <Button value={"Select"} />
    </Control>
  </ControlBox>
  <br />
  <ControlBox>
    <Control>
      <h6 style={{display: "flex", padding: "5px 10px"}}>Course Type <a style={{marginLeft:"auto"}} href="/" className="clear">Clear</a></h6>
      {courseType.map(type => <Checkbox key={slugify(type)} name="courseType" value={type} />)}
      
      <Button value={"Select"} />
    </Control>    
  </ControlBox>  
  <br />
  <ControlBox>
    <Control>
      <h6 style={{display: "flex", padding: "5px 10px"}}>Holes <a style={{marginLeft:"auto"}} href="/" className="clear">Clear</a></h6>
      {holes.map(amount => <Checkbox key={slugify(amount)} name="holes" value={amount} />)}
      <br />
      <Button value={"Select"} />
    </Control>    
  </ControlBox> 
  <br /> 
  <ControlBox>
    <Control>
      <h6 style={{display: "flex", padding: "5px 10px"}}>Amenities <a style={{marginLeft:"auto"}} href="/" className="clear">Clear</a></h6>
      {amenities.map(amenity => <Checkbox key={slugify(amenity)} name="amenity" value={amenity} />)}
      
      <Button value={"Select"} />
    </Control>    
  </ControlBox>
</ControlWrap>

const title = (location) => {
  const country = queryString.parse(location.search).country;
  const city = queryString.parse(location.search).city;
  if(country || city) {
    return <h1 className="search">Play {(country || city)}'s finest course(s)</h1>
  }
}

const courses = ({ data, location }) => {
  // aggregate data for controls
  const countries = aggregate(data.courses.edges, "country");
  const cities = aggregate(data.courses.edges, {parent:"country", child:"city"});
  const courseType = aggregate(data.courses.edges, {column:"courseType", property:"name"});
  const holes = aggregate(data.courses.edges, "holes");
  const amenities = aggregate(data.courses.edges, {column:"amenities", property:"name"})

  return <Layout>
    <HeroSmall data={data.coursesPage.edges[0].node.frontmatter} />
    <Content data={data.coursesPage.edges[0].node.frontmatter} />
    <Background>
      <Wrap className="columns">
        <Controls countries={countries} cities={cities} courseType={courseType} holes={holes} amenities={amenities} location={location} />
        <div className="column is-four-fifth">
          {title(location)}
          <Grid data={data.courses.edges} slug={"courses"} footer={true} hideStats={false} location={location} />
        </div>
      </Wrap>
    </Background>  
    <Footer />
  </Layout>
};

courses.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default courses;

export const coursesQuery = graphql`
 {
  coursesPage:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "courses"}}}) {
    edges {
      node {
        frontmatter {
          title
          image{
            childImageSharp{
              fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            description
          }
        }
      }
    }
    courses:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "course"} }}){
    edges{
       node{
        frontmatter{
          title
          image{
            childImageSharp{
              fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
              }
            }
          }
          stats{
            icon {
              publicURL
            }
            label
            value
          }
          city
          country
          courseType{
            name
          }
          holes
          amenities{
            name
          }
        }
        fields {
          slug
        }
       }
    }
    }
  }
`;
