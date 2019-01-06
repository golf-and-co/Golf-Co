import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import HeroCourse from '../components/HeroCourse';
import Stats from '../components/Stats';
import Details from '../components/Details';
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

/*

  
  
  <Gallery />
  <Map />
*/

const Post = ({ data }) => {
  return (
    <Layout>
        <HeroCourse data={data.markdownRemark.frontmatter} />
        <Stats data={data.markdownRemark.frontmatter} />
        <Details />
    </Layout>
  )
}

Post.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default Post

export const postQuery = graphql`
  query Course($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        image {
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
        title
        city
        country
        featuredDetails{
          image{
            childImageSharp{
              fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
              }
            }
          }
          name
          description   
        }
      }
    }
  }
`
