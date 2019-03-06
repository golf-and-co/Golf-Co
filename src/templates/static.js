import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import HeroSmall from "../components/HeroSmall";
import Content from '../components/Content'
import ReactMarkdown from 'react-markdown';
import Footer from '../components/Footer';

const Static = ({ data }) => {
  // adapter for content

  data.markdownRemark.frontmatter.description = <ReactMarkdown source={data.markdownRemark.frontmatter.body} />;

  return <Layout>
    <HeroSmall data={{...data.markdownRemark.frontmatter, backgroundColor:"#f5f8f1"}} />
    <Content data={data.markdownRemark.frontmatter} />
    <Footer />
  </Layout>;
}

Static.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired
    }),
  }),
}

export default Static

export const staticQuery = graphql`
  query static($id: String!) {
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
        content
      }
    }
  }
`
