import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";


export const PageTemplate = ({ title }) => (
  <section className="section section--gradient">
    <div className="container">Preview Offline</div>
  </section>
);

PageTemplate.propTypes = {
  title: PropTypes.string
};


const testimonials = ({ data }) => {


  return <Layout>
  </Layout>
};

testimonials.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default testimonials;

export const testimonialsQuery = graphql`
 {
  testimonialsPage:allMarkdownRemark(filter: {frontmatter: {title: {eq: "Golf Packages"}}}) {
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
    testimonials:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "package"} searchable:{eq:true} }}){
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
