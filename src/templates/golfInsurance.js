import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import HeroSmall from "../components/HeroSmall";
import styled from 'styled-components'
import Infographic from '../components/Info';
import Footer from '../components/Footer';

const Card = styled.section`
  width: 356px;
  height: 428px;
  border-radius: 10px;

  h6 {
    color: #1d8649;
    font-size:26px;
    font-family: "Gotham Bold";
    line-height: 26px;
    padding: 25px 30px;
    text-align: center;
  }

  p {
    padding: 10px 15px;
    text-align: center;
    font-size: 14px;
  }
`;

const Corporate = ({ data }) => <Layout>
  <HeroSmall data={{...data.markdownRemark.frontmatter, backgroundColor:"#f6f9f2"}} />
  <div className="container">
    <p style={{color: "#4a4a4a", backgroundColor:"#f6f9f2"}}>{data.markdownRemark.frontmatter.paragraph1}</p>
  </div>
  <Infographic data={{...data.markdownRemark.frontmatter, filled:true}} />
  <div style={{color: "#4a4a4a", backgroundColor:"#f6f9f2", paddingBottom:"220px"}}>
    <div className="container">
      <h3 style={{color: "#1d8649", fontSize:"30px", fontWeight: "bold", fontFamily: "Gotham Bold", textAlign: "center"}}>{data.markdownRemark.frontmatter.title}</h3>
      <p style={{color: "#4a4a4a", backgroundColor:"#f6f9f2", padding:"30px 60px"}}>{data.markdownRemark.frontmatter.paragraph2}</p>
    </div>  
  </div>
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
          description
          title
        }
        premium
      }
    }
  }
`
