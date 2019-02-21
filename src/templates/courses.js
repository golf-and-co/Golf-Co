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
  const [filters, setFilters] = useState([]);
  const [visible, setVisible] = useState(data.courses.edges);
  const handler = (filter) => {
    if(filter.action === 'REMOVE') {
      // state update is async, so this is ugly but required
      const result = filters.filter(item => (item.name !== filter.name && item.value !== filter.value));
      const visible = hide(data.courses.edges, result);
      setFilters(result);
      setVisible(visible);
    } else {
      filters.push(filter);
      const visible = hide(data.courses.edges, filters);
      setFilters(filters);
      setVisible(visible);
    }
  }
  // @TODO: clean up. Start with replacing with react filterable table, and passing a Card component
  // if that doesn't work, structured filter
  // if that doesn't work, this:
  // then refactoring code out for helpers, avoid reuse, perhaps a better data model
  // nested data makes this much more complicated than it should be
  // fields can have multiple values, like courseType=Earth && courseType=Championship
  // fixed by using Redux style "filter" objects, emitted on click
  // and sending a prop to the filter component of {label:checked}
  // also slow renders. try passing value once, and showing/hiding with css
  let courseTypes = {};   
  data.courses.edges.forEach(edge => 
    edge.node.frontmatter.courseType.filter(type => type.name !== null).forEach(type => {
      // courseType label:checked
      courseTypes[type.name] = filters.some(filter => (type.name === filter.value && filter.field === "courseType"));
    })
  );

  let holes = {};
  Array.from(group(data.courses.edges, d => d.node.frontmatter.holes).keys()).forEach(holeCount => {
    
      holes[holeCount] = filters.some(filter => (holeCount === filter.value && filter.field === "holes"))  
    
  });

  let amenities = {};   
  data.courses.edges.forEach(edge => 
    edge.node.frontmatter.amenities.filter(amenity => amenity.name !== null).forEach(amenity => 
      // amenity label:checked
      amenities[amenity.name] = filters.some(filter => (amenity.name === filter.value && filter.field === "amenities"))
    )
  );

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
    <Flat label="Holes" data={holes} field={"holes"} handler={handler} checked={typeof filters['holes'] !== 'undefined'} />
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
