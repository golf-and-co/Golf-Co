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

const courses = ({ data, location }) => {
  // @TODO: Use objects instead of an Array for checkboxes. {value:"5 Star", checked:true}
  const [filters, setFilters] = useState([]);
  const [visible, setVisible] = useState(data.courses.edges);
  const handler = (filter) => {
    console.log("filters");
    console.log(filters);
    console.log("filter");
    console.log(filter);
    debugger;
    if(!Object.values(filter)[0]) {
      // filter has been removed, pop and set.
      delete filters[Object.keys(filter)[0]];
      setFilters(filters);
    } else {
      setFilters(
        Object.assign(filters,filter)
      );
    }
    setVisible(
      hide(data.courses.edges, filters)
    );
  }

  // nested data, list in record for courses and amneties
  // @TODO: replace with d3, try using data()
  let courseTypes = {};   
  data.courses.edges.map(edge => edge.node.frontmatter.courseType.filter(type => type.name !== null).map(type => {
     console.log(type);
     courseTypes[type.name]= (type.name === filters.courseType);
  }));

  let amenities = {};   
  data.courses.edges.map(edge => edge.node.frontmatter.amenities.map(amenity => amenities[amenity.name]=true));
  amenities = Object.keys(amenities);

  const Filter = (<div>
    <Nested data={{
      primary: Array.from((group(data.courses.edges, d => d.node.frontmatter.country).keys())),
      secondary: Array.from((group(data.courses.edges, d => d.node.frontmatter.city).keys())),
      nested: rollup(data.courses.edges, v => v.length, d => d.node.frontmatter.country, d => d.node.frontmatter.city),
    }}  
    label={{main:"Location", primary:"Country", secondary:"City" }}
    field={{main:"location", primary:"country", secondary:"city"}}
    location={{location}}
    handler={handler}
    defaultValue={{
      primary:filters['country'],
      secondary:filters['city'],
    }}
    />
    <br />

    

    <Flat label="Course Type" data={courseTypes} field={"courseType"} handler={handler} checked={filters['courseType']} />
    <br />
    <Flat label="Holes" data={Array.from(group(data.courses.edges, d => d.node.frontmatter.holes).keys())} field={"holes"} handler={handler} checked={typeof filters['holes'] !== 'undefined'} />
    <br />
    <Flat label="Amenities" data={amenities} field={"amenities"} handler={handler} checked={filters['amenities']} />
    
    
    </div>)



  return <Layout>
    <HeroSmall data={data.coursesPage.edges[0].node.frontmatter} />
    <Content data={data.coursesPage.edges[0].node.frontmatter} />
    <Listing visible={visible} location={location} side={Filter} slug="courses" footer={true} />
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
