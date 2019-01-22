import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import HeroCourse from '../components/HeroCourse';
import Stats from '../components/Stats';
import CourseDetails from '../components/CourseDetails';
import Gallery from '../components/Gallery';
import CourseMap from '../components/CourseMap';
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

const packageListings = ({ data }) => <Layout>
    <HeroCourse data={data.markdownRemark.frontmatter} />
    <Stats data={data.markdownRemark.frontmatter} />
    <CourseDetails data={data.markdownRemark.frontmatter} body={data.markdownRemark.rawMarkdownBody} />
    <Gallery data={data.markdownRemark.frontmatter} />
    <CourseMap data={data.markdownRemark.frontmatter} />
    <Footer />
</Layout>;

packageListings.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default packageListings

export const packageListingsQuery = graphql`
  query packageListings($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        city
        country
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
        dialogs{
          icon {
            publicURL
          }
          heading
          message
        }
        tags{
          icon {
            publicURL
          }
          label
        }
        gallery {
          category
          image {
            childImageSharp{
              fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
              }
            }
          }
        }
        map
      }
    }
  }
`
