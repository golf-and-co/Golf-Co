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
import queryString from 'query-string';

export const PageTemplate = ({ title }) => (
  <section className="section section--gradient">
    <div className="container">Preview Offline</div>
  </section>
);

PageTemplate.propTypes = {
  title: PropTypes.string
};



const courses = ({ data, location }) => {
  const locationFilters = [
    {"field":"city", "value":queryString.parse(location.search).city, "action":"ADD"},
    {"field":"country", "value":queryString.parse(location.search).country, "action":"ADD"}
  ];

  const [filters, setFilters] = useState(locationFilters);
  const [visible, setVisible] = useState(hide(data.courses.edges,locationFilters, "name"));

  const handler = (filter) => {
    if(filter.action === 'REMOVE') {
      // state update is async, so this is ugly but required
      const result = filters.filter(item => {
         return (item.field !== filter.field && item.value !== filter.value)
      });
      setFilters(result);
    } else if(filter.action === 'REPLACE') {
      // some fields require multiple filters of the same name, like course type
      // others must replace existing filter first, like city
      let result = filters.filter(item => {
         return (item.field !== filter.field && item.value !== filter.value)
      });
      result.push(filter);
      setFilters(result);
    } else {
      console.log("adding filter")
      filters.push(filter);
      let result = filters;
      setFilters(result);
    }
  }

  const apply =() => {
    const visible = hide(data.courses.edges, filters, "name");
    setVisible(visible);
  }

  let defaultValue = {
    // @TODO: default value looks for object, need to lookup city and country from filter
    primary:filters.filter(item => item.field ==='country')[0],
    secondary:filters.filter(item => item.field ==='city')[0],
  }

  
  if(typeof defaultValue.primary !== 'undefined') defaultValue.primary = defaultValue.primary["value"];
  if(typeof defaultValue.secondary !== 'undefined') defaultValue.secondary = defaultValue.secondary["value"];

  // @TODO: clean up. Possible alternatives:
  // Aggregate with Gatsby build middleware or algolia. Not so bad if there is no nested data
  // If aggregation in build not feasible, see if it can be done in graphql, which is suppose to be a protocol in front of data sources
  // Replace entire Listing component with a react data grid. Hide columns, and have one cell for a bulma Card.
  // Look into Structured Filter. Perhaps swap out just the filters
  // if no external libraries can be used:
  // refactor code out for helpers, the filter handler, and the filter list generation.
  // Make the switch to Redux, and export reducers
  //
  // nested data makes this much more complicated than it should be
  // fields can have multiple values, like courseType=Earth && courseType=Championship
  // fixed by using Redux style "filter" objects, emitted on click
  // existing problems:
  //  - building list of filter options label:prop
  //  - selecting default value for filter, need to look up
  //  - slow renders. try passing value once, and showing/hiding with css
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
  
  const Filter = ({filters}) => (<div>
    <Nested data={{
      primary: Array.from((group(data.courses.edges, d => d.node.frontmatter.country).keys())),
      secondary: Array.from((group(data.courses.edges, d => d.node.frontmatter.city).keys())),
      nested: rollup(data.courses.edges, v => v.length, d => d.node.frontmatter.country, d => d.node.frontmatter.city),
    }}  
    label={{main:"Location", primary:"Country", secondary:"City" }}
    field={{main:"location", primary:"country", secondary:"city"}}
    location={{location}}
    handler={handler}
    apply={apply}
    defaultValue={{
      // @TODO: default value looks for object, need to lookup city and country from filter
      primary:defaultValue.primary,
      secondary:defaultValue.secondary,
    }}
    />
    <br />

    

    <Flat label="Course Type" data={courseTypes} filters={filters} field={"courseType"} handler={handler} apply={apply} />
    <br />
    <Flat label="Holes" data={holes} filters={filters} field={"holes"} handler={handler} apply={apply} />
    <br />
    <Flat label="Amenities" data={amenities} filters={filters} field={"amenities"} handler={handler} apply={apply} />
    
    
    </div>)

  return <Layout>
    <HeroSmall data={data.coursesPage.edges[0].node.frontmatter} />
    <Content data={data.coursesPage.edges[0].node.frontmatter} />
    <Listing visible={visible} location={location} side={(filters) => <Filter filters={filters} />} slug="courses" footer={true} />
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
