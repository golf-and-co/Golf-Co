import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import HeroSmall from '../components/HeroSmall'
// import HeroCourse from '../components/HeroCourse'
// import Infographic from '../components/Info'
// import Featured from '../components/Featured'
// import Recent from '../components/Recent'
// import Footer from '../components/Footer'

export const BespokeGolfHolidays = ({ data }) => (
  <Layout>
    <h1>faiopjwgfaiophjgaopwgjapowgfj</h1>
    {/* <HeroSmall data={data.bespokeGolfHolidaysPage.edges[0].node.frontmatter} /> */}
    {/* <HeroCourse /> */}
    {/* <Infographic /> */}
  </Layout>
)

export default BespokeGolfHolidays

// image {
            //   childImageSharp {
            //     fluid(maxWidth: 2048, quality: 100) {
            //       ...GatsbyImageSharpFluid
            //     }
            //   }
            // }

export const packageListingsQuery = graphql`
  {
    bespokeGolfHolidaysPage: allMarkdownRemark(
      filter: { frontmatter: { title: { eq: "Bespoke Golf Holidays" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            
            description
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
`