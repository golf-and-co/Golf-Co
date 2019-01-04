import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero';
import Infographic from '../components/Info';
import Featured from '../components/Featured';
import Recent from '../components/Recent';
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

const Post = ({ data }) => {
  return (
    <Layout>
        <Hero />
        <Infographic />
        <Featured />
        <Recent />
        <Footer />
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
        image
        isFeatured
        title
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
