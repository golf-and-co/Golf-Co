import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import BespokeContent from "../components/BespokeContent";
import BespokePackages from "../components/BespokePackages";
import Footer from "../components/Footer";

export const BespokeGolfHolidays = ({ data }) => (
  <Layout>
    <HeroSmall data={data.bespokeGolfHolidaysPage.edges[0].node.frontmatter} />
    <BespokeContent
      data={data.bespokeGolfHolidaysPage.edges[0].node.frontmatter}
    />
    <BespokePackages
      data={data.bespokeGolfHolidaysPage.edges[0].node.frontmatter}
    />
    <Footer />
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
            backgroundImage {
              publicURL
            }
            paragraph1
            paragraph2
            heading1
            description1
            packages {
              heading
              description
              image {
                publicURL
              }
            }
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
