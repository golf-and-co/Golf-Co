import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import HeroSmall from "../components/HeroSmall";
import Infographic from '../components/Info';
import styled from 'styled-components'
import Footer from '../components/Footer';

const Wrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Insurance = ({ data }) => { 
return <Layout>  
  <HeroSmall data={{...data.markdownRemark.frontmatter, backgroundColor:"#f6f9f2", title:false}}  />
  <Wrapper>
    <div style={{backgroundColor:"#f6f9f2"}}>
      <div className="container">
        <p style={{color: "#4a4a4a", paddingTop:"20px", textAlign:"center"}}>{data.markdownRemark.frontmatter.paragraph1}</p>
      </div>
    </div>
  </Wrapper>
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
