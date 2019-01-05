import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import HeroCourse from '../components/HeroCourse';
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

  <Stats />
  <Details />
  <Gallery />
  <Map />
*/

const Post = ({ data }) => {
  return (
    <Layout>
        <HeroCourse data={data.markdownRemark.frontmatter} />

        
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
        
        isFeatured
        title
        city
        country
        description
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
