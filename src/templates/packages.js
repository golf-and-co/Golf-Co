import React, {useState} from "react";
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
  const [filters, setFilters] = useState();
  const [visible, setVisible] = useState();

  const hide = () => {
    
    data.courses.edges.filter(course => {
      /*

        {city:"Dubai",
        country: "Country",
        "hotelType": "5",
        "Duration": "7 Days or More"}

      */
      Array.keys(filters).map(key => {
        // if city is set and is city
        // check if filter is in data, to avoid label
        if(course[key] == filters[key]) {
          
        }
      })
      
    })
  }

  const Filter = (<div>
    <Nested data={{
      primary: Array.from((group(data.courses.edges, d => d.node.frontmatter.country).keys())),
      secondary: Array.from((group(data.courses.edges, d => d.node.frontmatter.city).keys())),
      nested: rollup(data.courses.edges, v => v.length, d => d.node.frontmatter.country, d => d.node.frontmatter.city),
    }}  
    label={{main:"Location", primary:"Country", secondary:"City" }}
    field={{main:"location", primary:"country", secondary:"city"}}/>
    <br />
    <Flat label="Hotel Type" data={Array.from((group(data.courses.edges, d => d.node.frontmatter.hotelType).keys()))} field={"hotelType"}/>
    <br />
    <Flat label="Duration" data={Array.from((group(data.courses.edges, d => d.node.frontmatter.duration).keys()))} field={"duration"} /></div>)

  return <Layout>
    <HeroSmall data={data.packageListingPage.edges[0].node.frontmatter} />
    <Content data={data.packageListingPage.edges[0].node.frontmatter} />
    <Listing data={data.courses} side={Filter} filter={["city", "country", "hotelType", "duration"]} slugType="packages" footer={true}/>
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
