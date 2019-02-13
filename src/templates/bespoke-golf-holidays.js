import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import BespokePackages from "../components/BespokePackages";
import Footer from "../components/Footer";

export const BespokeGolfHolidays = ({ data }) => { 
  
  return (
  <Layout style={{backgroundColor:"#F6F9F2"}}>
    <HeroSmall data={{...data.bespokeGolfHolidaysPage.edges[0].node.frontmatter, backgroundColor:"#F6F9F2"}} />
    <BespokePackages
      data={data.bespokeGolfHolidaysPage.edges[0].node.frontmatter}
    />    
    <Footer />
  </Layout>
)};

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
            heading1
            paragraph1
            benefits{
              image {
              publicURL
            }
              description
            }
            headingPackage
            packages{
              image {
                publicURL
              }
              heading
            }
            heading2
            paragraph2
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
