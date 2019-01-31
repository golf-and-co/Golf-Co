import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import {withCookies} from "react-cookie";
import Layout from '../components/Layout'
import HeroCourse from '../components/HeroCourse';
import CartStats from '../components/CartStats';
import CartDetails from '../components/CartDetails';

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

const PackageDetails = ({ data, cookies }) => {

// adapter to use existing Hero Course component
data.markdownRemark.frontmatter.image = data.markdownRemark.frontmatter.hero;
data.markdownRemark.frontmatter.packageTitle = data.markdownRemark.frontmatter.title;
data.markdownRemark.frontmatter.title = data.markdownRemark.frontmatter.pageHeader;

return <Layout>
    <HeroCourse data={data.markdownRemark.frontmatter} empty={true} oneLine={true}/>
    <CartStats data={data.markdownRemark.frontmatter} />
    <CartDetails data={data.markdownRemark.frontmatter} body={data.markdownRemark.html}/>
    <Footer />
</Layout>
};

PackageDetails.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default withCookies(PackageDetails)

export const packageDetailsQuery = graphql`
  query packageDetailsQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        pageHeader
        bodyHeader
        description
        city
        country
        statsDescription
        courses {
          image {
            childImageSharp{
              fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
              }
            }
          }
          name
          city
          region
          slug
        }
        image {
          childImageSharp{
            fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
            }
          }
        }
        hero {
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
      }
    }
  }
`
