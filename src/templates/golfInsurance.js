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
  <HeroSmall data={{...data.markdownRemark.frontmatter, backgroundColor:"#f6f9f2"}} />
  <div className="container">
    <p style={{color: "#4a4a4a", backgroundColor:"#f6f9f2"}}>{data.markdownRemark.frontmatter.paragraph1}</p>
  </div>
  <Infographic data={{...data.markdownRemark.frontmatter, filled:true}} />
  <div className="container">
    <h3>{data.title}</h3>
    <p style={{color: "#4a4a4a", backgroundColor:"#f6f9f2"}}>{data.markdownRemark.frontmatter.paragraph2}</p>
  </div>
  {data.benefits.map(benefit => {
    return <div className="card">
      <h6>{benefit.title}</h6>
      <img src={benefit.image.publicURL} />
      <p>{benefit.description}</p>
    </div>
  })}
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
        benefits {
          image {
            publicURL
          }
          description
          title
        }
        premium
      }
    }
  }
`
