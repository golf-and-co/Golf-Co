import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Infographic from '../components/Info'
import Featured from '../components/Featured'
import Recent from '../components/Recent'
import Footer from '../components/Footer'

export const IndexTemplate = ({data}) => (
  <Layout>
    <Hero />
    <Infographic data={data.allMarkdownRemark.edges[0].node.frontmatter} />
    <Featured />
    <Recent />
    <Footer />
  </Layout>
)

export default IndexTemplate

export const golfInsuranceQuery = graphql`
{
  allMarkdownRemark(filter: { frontmatter: { title: { eq: "Home" } } }) {
    edges {
      node {
        frontmatter {
          info1 {
            heading
            description
            image {
              publicURL
            }
          }
          info2 {
            heading
            description
            image {
              publicURL
            }
          }
          info3 {
            heading
            description
            image {
              publicURL
            }
          }
          info4 {
            heading
            description
            image {
              publicURL
            }
          }
        }
      }
    }
  }
}`;