import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import HeroSmall from "../components/HeroSmall";
import Content from '../components/Content'
import Infographic from '../components/Info';
import Footer from '../components/Footer';

const backgroundColor = "#f5f8f1";

const Corporate = ({ data }) => <Layout>
  <HeroSmall data={data.markdownRemark.frontmatter}/>
  <Content data={data.markdownRemark.frontmatter}/>
  <Infographic data={data.markdownRemark.frontmatter} />
  <Footer />
</Layout>;

Corporate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired
    }),
  }),
}

export default Corporate

export const golfInsuranceQuery = graphql`
  query golfInsurance($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        paragraph1
        paragraph2
        infographics {
          image {
            publicURL
          }
          description
        }
        paragraph4
        premium
      }
    }
  }
`
