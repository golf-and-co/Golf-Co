import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Infographic from '../components/Info'
import Featured from '../components/Featured'
import Blog from '../components/Blog'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

export const IndexTemplate = ({data, location}) => {
  console.log(data);
  return <Layout>
    <Hero />
    <Infographic data={data.home.edges[0].node.frontmatter} />
    <Featured />
    <div style={{backgroundColor:"#f6f9f2", padding: "50px 0 50px 0"}}>
      <Banner home={data.home.edges[0].node.frontmatter} />
      <Blog data={{...data.events}} headline={{...data.home.edges[0].node.frontmatter.recentCalendar}} />
    </div>
    <div>
      <ul class='juicer-feed' data-feed-id='golfandco'><h1 class='referral'><a href='www.juicer.io'>Powered by Juicer</a></h1></ul>
    </div>
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
          infographics {
            heading
            description
            image {
              publicURL
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