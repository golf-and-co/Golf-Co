import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Content from "../components/Content";
import Listing from "../components/Listing";
import {Nested, Flat} from "../components/Filter";
import {group, rollup} from "d3-array";
import Footer from "../components/Footer";

export const PageTemplate = ({ title }) => (
  <section className="section section--gradient">
    <div className="container">Preview Offline</div>
  </section>
);

PageTemplate.propTypes = {
  title: PropTypes.string
};


const packageDetails = ({ data }) => {

  /* on click dispatch actions:

  checkbox: visible: false if does not match
  select: visible: false if does not match, update select box

  state: {
    packages: [
      {
        visible: bool
        package: package
      }
    ],
    location: {
      country: [city,]
    },
    hotelType,
    duration
  }

  */

  // @TODO: Clean this up big time. Probably will be taken out when using redux

  console.log("d3");
  group(data.courses.edges, d => d.node.frontmatter.city).forEach(row =>
    console.log(row)
  );
  console.log(group(data.courses.edges, d => d.node.frontmatter.country));
  console.log(group(data.courses.edges, d => d.node.frontmatter.hotelType));
  console.log(rollup(data.courses.edges, v => v.length, d => d.node.frontmatter.country, d => d.node.frontmatter.city));

  
  return <Layout>
    <HeroSmall data={data.packageListingPage.edges[0].node.frontmatter} />
    <Content data={data.packageListingPage.edges[0].node.frontmatter} />
    
    <Footer />
  </Layout>
};

packageDetails.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default packageDetails;

export const packageDetailsQuery = graphql`
 {
  packageListingPage:allMarkdownRemark(filter: {frontmatter: {title: {eq: "Golf Packages"}}}) {
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
    courses:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "package"} searchable:{eq:true} }}){
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
          hotelType
          duration
        }
       }
    }
    }
  }
`;
