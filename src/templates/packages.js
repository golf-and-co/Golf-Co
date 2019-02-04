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

  // assigns css properties to each item
  const filter = {
    fields:["city", "country", "hotelType", "duration"],
  };

  // interface for src/components
  filter.boxes = {
    location: {
      // 'UAE':['Dubia', 'Abu Dhabi'], 'Qatar':["Doha"]
      data: {},
      label: {
        main: "Location",
        primary: "All Countries",
        secondary: "All Cities"
      }
    },
    country: {
      data: [],
    },
    city: {
      data: [],
    },
    hotelType: {
      data: [],
      label: "Hotel Type"
    },
    duration: {
      data: [],
      label: "Duration"
    }
  };

  // build data for filter from packages:
  data.courses.edges.forEach(edge =>{
    const row = edge.node.frontmatter;
    // When country select box changes, need to update city select box
    // Handled by passing an object to data instead of an array
    if(typeof filter.boxes.location[row.country] === 'undefined') {
      filter.boxes.location.data[row.country] = [];
    }
    filter.boxes.location.data[row.country].push(row.city);
    filter.boxes.country.data.push(row.country);
    filter.boxes.city.data.push(row.city);
    // normal filters, checkboxes
    filter.boxes.hotelType.data.push(row.hotelType);
    filter.boxes.duration.data.push(row.duration);
  });

  // deduplicate
  Object.keys(filter.boxes.location.data).forEach(country => {
    filter.boxes.location.data[country] = [...new Set(filter.boxes.location.data[country])];
  });
  filter.boxes.hotelType.data = Array.from(new Set(filter.boxes.hotelType.data));
  filter.boxes.duration.data = Array.from(new Set(filter.boxes.duration.data));

  const Filter = (<div><Nested label={filter.boxes.location.label} data={{primary:filter.boxes.country.data, secondary:filter.boxes.city.data}} />
    <br />
    <Flat data={filter.boxes.hotelType.data} label="Hotel Type" />
    <br />
    <Flat data={filter.boxes.duration.data} label="Duration" /></div>)

  return <Layout>
    <HeroSmall data={data.packageListingPage.edges[0].node.frontmatter} />
    <Content data={data.packageListingPage.edges[0].node.frontmatter} />
    <Listing data={data.courses} side={Filter} filter={filter.fields} />
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
