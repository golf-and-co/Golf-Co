import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Testimontials from '../components/corporate/Testimontials';
import PastEvents from '../components/corporate/PastEvents';
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

const Corporate = ({ data }) => <Layout>
  <PastEvents />
  <Testimontials />
  <Footer />
</Layout>;

Corporate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default Corporate

export const courseQuery = graphql`
  query Corporate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        top{
          message
        }
      }
    }
  }
`
