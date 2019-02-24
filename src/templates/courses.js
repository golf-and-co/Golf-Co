import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components"
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Content from "../components/Content";
import {Checkbox} from "../components/Control/Checkbox";
import {Select} from "../components/Control/Select";
import {aggregate} from "../components/Control/Aggregate";
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
`;

const ControlWrap = styled.div`
    section {
        justify-content: right;
    }
    @media (max-width: 768px) {
        display: none !important;
    }
`;

const Control = styled.section`
    background-color: #FFF;
    width: 260px;
    height:215px;
    justify-content:right;

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


const Controls = ({countries, cities, courseType, holes, amenities}) => {
return <Background>
  <Wrap className="columns">
    <ControlWrap className="column is-one-fifth">
      <Control>
        <Select name="country">
          {countries.map(country => <option key={slugify(country)} value={country}>{country}</option>)}
        </Select>
      </Control>


      <Control>
        {courseType.map(type => <Checkbox key={slugify(type)} name="courseType" value={type} />)}
        <br />
      </Control>      
    </ControlWrap>
    <div className="column is-four-fifth">
      
    </div>
  </Wrap>
</Background>
}


const courses = ({ data, location }) => {
  // aggregate data for city, country, hotelTypes, and duration

  const countries = aggregate(data.courses.edges, "country");
  const cities = aggregate(data.courses.edges, "city");
  const courseType = aggregate(data.courses.edges, {column:"courseType", property:"name"});
  const holes = aggregate(data.courses.edges, "holes");
  const amenities = aggregate(data.courses.edges, {column:"amenities", property:"name"})

  return <Layout>
    <HeroSmall data={data.coursesPage.edges[0].node.frontmatter} />
    <Content data={data.coursesPage.edges[0].node.frontmatter} />
    <Controls countries={countries} cities={cities} courseType={courseType} holes={holes} amenities={amenities} />
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
       }
    }
    }
  }
`;
