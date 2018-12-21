import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero';
import Info from '../components/Info';
import Featured from '../components/Featured';

export default class IndexPage extends React.Component {
  render() {
    const data = this.props.data.allMarkdownRemark.edges[0].node.frontmatter
    return (
      <IndexTemplate data={data} />
    )
  }
}

export const IndexTemplate = ({data}) => <Layout>
  <Hero data={data} />
  <Info data={data} />
  <Featured data={data} />
</Layout>

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const IndexQuery = graphql`
query HomePage {
  allMarkdownRemark(filter: {frontmatter: {title:{eq:"Home"}}}) {
    edges {
      node {
        frontmatter{
          heading1
          heading2
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          info1 {
            heading
            description
            image {
              publicURL
            } 
          }
          info2 {
            heading
            description
            image {
              publicURL
            } 
          }
          info3 {
            heading
            description
            image {
              publicURL
            } 
          }
          info4 {
            heading
            description
            image {
              publicURL
            } 
          }
          featured {
            heading1
            heading2
          }
          course1 {
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            heading
            description
          }
        }
      }
    }
  }
}
`