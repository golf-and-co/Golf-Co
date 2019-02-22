import React, {useState}  from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components"
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Content from "../components/Content";
import {Flat} from "../components/Filter";
import {hide} from "../utilities/Hide";
import Listing from "../components/Listing";
import Footer from "../components/Footer";

const Wrap = styled.section`
  .cardContentHover {
    height: 100px !important;
    top: 0px !important;
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

const gallery = ({ data }) => {
  const [filters, setFilters] = useState([]);
  const [visible, setVisible] = useState(data.gallery.edges);

  const handler = (filter) => {
    if(filter.action === 'REMOVE') {
      // state update is async, so this is ugly but required
      const result = filters.filter(item => {
         return (item.field !== filter.field && item.value !== filter.value)
      });
      const visible = hide(data.gallery.edges, result, "label");
      setFilters(result);
      setVisible(visible);
    } else if(filter.action === 'REPLACE') {
      // some fields require multiple filters of the same name, like course type
      // others must replace existing filter first, like city
      let result = filters.filter(item => {
         return (item.field !== filter.field && item.value !== filter.value)
      });
      result.push(filter);
      const visible = hide(data.gallery.edges, result, "label");
      setFilters(result);
      setVisible(visible);
    } else {
      filters.push(filter);
      const visible = hide(data.gallery.edges, filters, "label");
      setFilters(filters);
      setVisible(visible);
    }
  }

  let types = {};   
  data.gallery.edges.forEach(edge => edge.node.frontmatter.type.forEach(row => {
    types[row.label]= filters.some(filter => (row.label === filter.value && filter.field === "type")) ;
  }));

  const Filter = <Flat label="Event" data={types} field={"type"} handler={handler} />;

  return <Layout>
    <Wrap>
      <HeroSmall data={data.galleryQuery.edges[0].node.frontmatter} />
      <Content data={data.galleryQuery.edges[0].node.frontmatter} />
      <Listing visible={visible} side={Filter} slug="gallery" footer={false} hideStats={true}/>
      <Footer />
    </Wrap>
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
