import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import HeroSmall from "../components/HeroSmall";
import styled from 'styled-components'
import Slider from "react-slick";
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

const Wrap = styled.div`
  .slick-slider {
    width: 400px;
    margin: 0 auto;
  }

`;

const galleryDetails = ({ data }) => { 
return <Layout>  
  <HeroSmall data={{...data.markdownRemark.frontmatter, backgroundColor:"#E4ECD9", showTitle:false}}  />
  <p style={{paddingTop:"30px", textAlign:"center", backgroundColor:"#E4ECD9", fontWeight:"bold", color:"#000"}}>{data.markdownRemark.frontmatter.title}</p>    
  <p style={{textTransform: "uppercase", textAlign:"center", backgroundColor:"#E4ECD9", fontWeight:"bold", color:"#000"}}>{data.markdownRemark.frontmatter.date}</p>    
  <div style={{paddingTop:"25px", backgroundColor:"#E4ECD9"}}>
    <div className="container">
      <p style={{color:"#000"}}>{data.markdownRemark.frontmatter.description}</p>    
    </div>
  </div>
  <div style={{paddingBottom:"200px", backgroundColor:"#E4ECD9"}}>
  <Wrap className="container">
    <Slider {...{dots:true}}>
      <div>
        <img src="http://placekitten.com/g/400/200" />
      </div>
      <div>
        <img src="http://placekitten.com/g/400/200" />
      </div>
    </Slider>
    </Wrap>
  </div>
  <Footer />
</Layout>;
}

galleryDetails.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired
    }),
  }),
}

export default galleryDetails

export const galleryDetailsQuery = graphql`
  query galleryDetails($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        date
        description
        type{
          label
        }
        images {
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
