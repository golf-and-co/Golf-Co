import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Content from "../components/Content";
import Listing from "../components/Listing";
import Footer from "../components/Footer";

export const PageTemplate = ({ title }) => (
  <section className="section section--gradient">
    <div className="container">Preview Offline</div>
  </section>
);

PageTemplate.propTypes = {
  title: PropTypes.string
};

const gallery = ({ data }) => {

  let types = {};   
  data.gallery.edges.map(edge => edge.node.frontmatter.type.map(row => types[row.label]=true));
  types = Object.keys(types);


  return <Layout>
    <HeroSmall data={data.galleryQuery.edges[0].node.frontmatter} />
    <Content data={data.galleryQuery.edges[0].node.frontmatter} />
    <Listing data={data.galleryQuery} filter={[{"type":"label"}]}/>
    <Footer />
  </Layout>
};

gallery.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default gallery;

export const galleryQuery = graphql`
 {
  galleryQuery:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "gallery"}}}) {
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
    gallery:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "galleryDetails"}}}){
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
          location
          date
          type {
            label
          }
          images {
            image {
              publicURL
            }
          }
        }
       }
    }
    }
  }
`;
