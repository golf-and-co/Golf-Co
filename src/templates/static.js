import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import styled from 'styled-components'
import HeroSmall from "../components/HeroSmall";
import Content from '../components/Content'
import ReactMarkdown from 'react-markdown';
import Footer from '../components/Footer';

const Wrap = styled.section`
  p {
    text-align: left !important;
  }

  h2 {
    font-size: 1.2rem;
    margin: 0px auto 50px auto;
    color: #1d8649;
    font-size: 2em;
    font-family: Gotham;
  }

  section {
    margin-top: -30px;
    padding-bottom: 60px;
  }
`;

const Static = ({ data }) => {
  // adapter for content

  data.markdownRemark.frontmatter.description = <ReactMarkdown source={data.markdownRemark.frontmatter.content} />;

  return <Layout>
    <Wrap>
      <HeroSmall data={{...data.markdownRemark.frontmatter, backgroundColor:"#f5f8f1"}} />
      <Content data={data.markdownRemark.frontmatter} />
    </Wrap>
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
