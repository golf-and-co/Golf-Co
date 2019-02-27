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

const Insurance = ({ data }) => { 
return <Layout>  
  <HeroSmall data={{...data.markdownRemark.frontmatter, backgroundColor:"#f6f9f2", title:false}}  />
  <div style={{backgroundColor:"#f6f9f2"}}>
    <div className="container">
      <p style={{color: "#4a4a4a"}}>{data.markdownRemark.frontmatter.paragraph1}</p>
    </div>
  </div>
  <Infographic data={{...data.markdownRemark.frontmatter, filled:true}} />    
  <Footer />
</Layout>;
}

Insurance.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired
    }),
  }),
}

export default Insurance

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
          image {
            publicURL
          }
          title
        }
        limits {
          description
          limit
        }
        premium
      }
    }
  }
`
