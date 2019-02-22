import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { connect } from "react-redux"
import styled from "styled-components"
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Content from "../components/Content";
import {Checkbox} from "../components/Filter/Checkbox";
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

const FilterWrap = styled.div`
    section {
        justify-content: right;
    }
    @media (max-width: 768px) {
        display: none !important;
    }
`;

export const PageTemplate = ({ title }) => (
  <section className="section section--gradient">
    <div className="container">Preview Offline</div>
  </section>
);

PageTemplate.propTypes = {
  title: PropTypes.string
};




const courses = ({ data, location }) => {

  return <Layout>
    <HeroSmall data={data.coursesPage.edges[0].node.frontmatter} />
    <Content data={data.coursesPage.edges[0].node.frontmatter} />
    <Background>
      <Wrap className="columns">
        <FilterWrap className="column is-one-fifth">
          <div>
           <Checkbox label={"test"} />
            <br />
          </div>
        </FilterWrap>
        <div className="column is-four-fifth">
          
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
       }
    }
    }
  }
`;
