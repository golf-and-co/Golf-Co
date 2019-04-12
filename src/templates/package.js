import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { withCookies } from "react-cookie";
import Layout from "../components/Layout";
import HeroCourse from "../components/HeroCourse";
import CartStats from "../components/CartStats";
import CartDetails from "../components/CartDetails";

import Footer from "../components/Footer";

export const PageTemplate = ({ title }) => (
  <section className="section section--gradient">
    <div className="container">Preview Offline</div>
  </section>
);

PageTemplate.propTypes = {
  title: PropTypes.string
};

const PackageDetails = ({ data, cookies }) => {
  // lookup course from package course relation
  data.markdownRemark.frontmatter.courses = data.markdownRemark.frontmatter.courses.map(
    course => {
      const row = data.courses.edges.filter(
        edge => edge.node.frontmatter.title === course.course
      )[0]["node"];

      return {
        name: course.course,
        rounds: course.rounds,
        title: row.frontmatter.title,
        image: row.frontmatter.image,
        city: row.frontmatter.city,
        region: row.frontmatter.region,
        country: row.frontmatter.country,
        slug: row.fields.slug
      };
    }
  );

  // adapter to use existing Hero Course component
  data.markdownRemark.frontmatter.image = data.markdownRemark.frontmatter.hero;
  data.markdownRemark.frontmatter.packageTitle =
    data.markdownRemark.frontmatter.title;
  data.markdownRemark.frontmatter.title =
    data.markdownRemark.frontmatter.pageHeader;

  return (
    <Layout>
      <HeroCourse
        data={data.markdownRemark.frontmatter}
        empty={true}
        oneLine={true}
      />
      <CartStats data={data.markdownRemark.frontmatter} />
      <CartDetails
        data={data.markdownRemark.frontmatter}
        addOns={data.addOnsQuery.edges}
      />
      <Footer />
    </Layout>
  );
};

PackageDetails.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default withCookies(PackageDetails);

export const packageDetailsQuery = graphql`
  query packageDetailsQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        code
        pageHeader
        bodyHeader
        description
        city
        country
        duration
        rounds
        nights
        hotelName
        hotelType
        statsDescription
        courses {
          course
          rounds
        }
        addOns
        basePrice
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        hero {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        stats {
          icon {
            publicURL
          }
          label
          value
        }
      }
    }
    addOnsQuery: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "addon" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            price
            description
            shaded
            checkedByDefault
          }
        }
      }
    }
    courses: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "course" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            city
            region
            country
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
