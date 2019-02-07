import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import HeroSmall from "../components/HeroSmall";
import CorporateContent from '../components/corporate/CorporateContent'
import Testimontials from '../components/corporate/Testimontials';
import PastEvents from '../components/corporate/PastEvents';
import Footer from '../components/Footer';

const backgroundColor = "#f5f8f1";

const Corporate = ({ data }) => <Layout>
  
  <CorporateContent data={data.markdownRemark.frontmatter}/>
  <PastEvents />
  <Testimontials />
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

export const courseQuery = graphql`
  query Corporate($id: String!) {
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
        heading1
        paragraph3
        paragraph4
        sendEnquiry
      }
    }
  }
`
