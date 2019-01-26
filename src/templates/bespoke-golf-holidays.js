import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Content from "../components/Content";

export const BespokeGolfHolidays = ({ data }) => (
  <Layout>
    <HeroSmall data={data.bespokeGolfHolidaysPage.edges[0].node.frontmatter} />
    <Content data={data.bespokeGolfHolidaysPage.edges[0].node.frontmatter} />
  </Layout>
);

export default BespokeGolfHolidays;

export const packageListingsQuery = graphql`
  {
    bespokeGolfHolidaysPage: allMarkdownRemark(
      filter: { frontmatter: { title: { eq: "Bespoke Golf Holidays" } } }
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
            body
            heading1
            description1
            heading2
            description2
          }
        }
      }
    }
    courses: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "bespoke-golf-holidays" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
