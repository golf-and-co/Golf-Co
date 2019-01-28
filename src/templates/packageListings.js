import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import HeroSmall from '../components/HeroSmall';
import Content from '../components/Content';
import Listing from '../components/Listing';
import Footer from '../components/Footer';

export const PageTemplate = ({
  title,
}) => (
  <section className="section section--gradient">
    <div className="container">
      Preview Offline
    </div>
  </section>
)

PageTemplate.propTypes = {
  title: PropTypes.string,
}

const packageListings = ({ data }) => {
console.log(data);
return <Layout>
    <HeroSmall data={data.packageListingPage.edges[0].node.frontmatter} />
    <Content data={data.packageListingPage.edges[0].node.frontmatter} />
    <Listing data={data.courses} />
    <Footer />
</Layout>
};

packageListings.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default packageListings

export const packageListingsQuery = graphql`
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
  courses:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "packageDetails"} searchable:{eq:true} }}){
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
        }
      }
    }
  }
}
`
