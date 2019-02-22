import React, {useState} from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Content from "../components/Content";
import Listing from "../components/Listing";
import {Nested, Flat} from "../components/Filter";
import {group, rollup} from "d3-array";
import {hide} from "../utilities/Hide";
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
  const [filters, setFilters] = useState([]);
  const [visible, setVisible] = useState(data.courses.edges);
  const handler = (filter) => {
    if(filter.action === 'REMOVE') {
      // state update is async, so this is ugly but required
      const result = filters.filter(item => {
         return (item.field !== filter.field && item.value !== filter.value)
      });
      const visible = hide(data.courses.edges, result, "name");
      setFilters(result);
      setVisible(visible);
    } else if(filter.action === 'REPLACE') {
      // some fields require multiple filters of the same name, like course type
      // others must replace existing filter first, like city
      let result = filters.filter(item => {
         return (item.field !== filter.field && item.value !== filter.value)
      });
      result.push(filter);
      const visible = hide(data.courses.edges, result, "name");
      setFilters(result);
      setVisible(visible);
    } else {
      filters.push(filter);
      const visible = hide(data.courses.edges, filters, "name");
      setFilters(filters);
      setVisible(visible);
    }
  }
  let hotelType = {};   
  data.courses.edges.forEach(edge => {
    hotelType[edge.node.frontmatter.hotelType] = filters.some(filter => {
      return (edge.node.frontmatter.hotelType === filter.value && filter.field === "hotelType")
    })
  });

  let duration = {};   
  data.courses.edges.forEach(edge => {
    duration[edge.node.frontmatter.duration] = filters.some(filter => {
      return (edge.node.frontmatter.duration === filter.value && filter.field === "duration")
    })
  });

  let defaultValue = {
    // @TODO: default value looks for object, need to lookup city and country from filter
    primary:filters.filter(item => item.field ==='country')[0],
    secondary:filters.filter(item => item.field ==='city')[0],
  }

  
  if(typeof defaultValue.primary !== 'undefined') defaultValue.primary = defaultValue.primary["value"];
  if(typeof defaultValue.secondary !== 'undefined') defaultValue.secondary = defaultValue.secondary["value"];
  
  const Filter = (<div>
    <Nested data={{
      primary: Array.from((group(data.courses.edges, d => d.node.frontmatter.country).keys())),
      secondary: Array.from((group(data.courses.edges, d => d.node.frontmatter.city).keys())),
      nested: rollup(data.courses.edges, v => v.length, d => d.node.frontmatter.country, d => d.node.frontmatter.city),
    }}  
    label={{main:"Location", primary:"Country", secondary:"City" }}
    field={{main:"location", primary:"country", secondary:"city"}}
    handler={handler}
    defaultValue={defaultValue} />
    <br />
    <Flat label="Hotel Type" data={hotelType} field={"hotelType"} handler={handler} checked={typeof filters['hotelType'] !== 'undefined'}/>
    <br />
    <Flat label="Duration" data={duration} field={"duration"} handler={handler} checked={typeof filters['duration'] !== 'undefined'} /></div>)

  return <Layout>
    <HeroSmall data={data.packageListingPage.edges[0].node.frontmatter} />
    <Content data={data.packageListingPage.edges[0].node.frontmatter} />
    <Listing visible={visible} side={Filter} slug="packages" footer={true} />
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
