import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Infographic from '../components/Info'
import Featured from '../components/Featured'
import Blog from '../components/Blog'
import Banner from '../components/Banner'
import Juicer from '../components/Juicer'
import Footer from '../components/Footer'

export const IndexTemplate = ({data, location}) => {
  return <Layout>
    <Hero />
    <Infographic data={data.home.edges[0].node.frontmatter} />
    <Featured />
    <div style={{backgroundColor:"#f6f9f2", padding: "50px 0 50px 0"}}>
      <Banner home={data.home.edges[0].node.frontmatter} />
      <Blog data={{...data.events}} headline={{...data.home.edges[0].node.frontmatter.recentCalendar}} />
    </div>
    <Juicer count={8} columns={4} />
    <Footer />
  </Layout>
}

export default IndexTemplate

export const golfInsuranceQuery = graphql`{
  home: allMarkdownRemark(filter: { frontmatter: { title: { eq: "Home" } } }) {
    edges {
      node {
        frontmatter {
          headingParagraph
          infographicsContainer {
            infographicsHeader
            infographics {
              heading
              description
              image {
                publicURL
              }
              url
              urlText
            }
          }
          recentCalendar {
            heading1
            heading2
          }
          featuredBanner {
            heading1
            heading2
            image{
              childImageSharp{
                fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
            mobileImage{
              childImageSharp{
                fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  },
  events: allMarkdownRemark(
    filter: { frontmatter: { templateKey: { eq: "event" } } }
    limit: 3
    sort: { fields: frontmatter___date, order: DESC }
  ) {
    edges {
      node {
        frontmatter {
          title
          description
          from
          to
          date
          image: background {
            publicURL
          }
        }
      }
    }
  }
}`;