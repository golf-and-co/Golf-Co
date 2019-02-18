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

const Corporate = ({ data }) => { 
return <Layout>  
  <HeroSmall data={{...data.markdownRemark.frontmatter, backgroundColor:"#f6f9f2", title:false}}  />
  <div style={{backgroundColor:"#f6f9f2"}}>
    <div className="container">
      <p style={{color: "#4a4a4a"}}>{data.markdownRemark.frontmatter.paragraph1}</p>
    </div>
  </div>
  <Infographic data={{...data.markdownRemark.frontmatter, filled:true}} />
  <div style={{color: "#4a4a4a", backgroundColor:"#f6f9f2"}}>
    <div className="container">
      <h3 style={{color: "#1d8649", fontSize:"30px", fontWeight: "bold", fontFamily: "Gotham Bold", textAlign: "center"}}>{data.markdownRemark.frontmatter.title}</h3>
      <p style={{color: "#4a4a4a", backgroundColor:"#f6f9f2", padding:"30px 60px"}}>{data.markdownRemark.frontmatter.paragraph2}</p>
      <div style={{display:"flex"}}>
        {data.markdownRemark.frontmatter.benefits.map(benefit => {
          return <Card className="card">
            <h6>{benefit.title}</h6>
            <img src={benefit.image.publicURL} alt="Golf themed images including bladed irons on course grass"/>
            <p>{benefit.description}</p>
          </Card>
        })}
      </div>

      <div style={{marginTop: "30px", textAlign:"center", paddingBottom:"30px"}}>
        <p style={{textTransform:"uppercase"}}>Insurance Provided by</p>
        <img src="/img/rsa.png" alt="RSA Logo, the letters R S A followed by a superscripted two-toned gear-like circle, dark blue on top and pink on bottom"/>
      </div>
      </div>
  </div>
  <div style={{backgroundColor:"#E4ECD9", paddingBottom:"300px"}}>
    <div className="container">
      <h3 style={{fontFamily:"Gotham Thin", fontSize:"30px", fontWeight:"300", color:"#1d8649", textTransform:"uppercase", textAlign:"center", paddingTop:"60px"}}>Get Your Insurance Now</h3>
      <table style={{width:"90%", backgroundColor:"#FFF", margin:"10px auto 80px auto"}} >
        <tr>
          <th style={{textAlign: "center", border: "3px solid #FFF", width:"70%", backgroundColor:"#25408F", color:"#FFF"}}>Description of Benefits</th>
          <th style={{textAlign: "center", border: "3px solid #FFF", backgroundColor:"#25408F", color:"#FFF"}}>Limit (AED)</th>
        </tr>
        {data.markdownRemark.frontmatter.limits.map(limit => <tr><td style={{paddingLeft:"1rem", border: "3px solid #FFF", width:"70%", backgroundColor:"#F1F2F2", color:"#25408F"}}>{limit.description}</td><td style={{textAlign: "center", border: "3px solid #FFF", backgroundColor:"#F1F2F2", color:"#25408F"}}>{limit.limit}</td></tr>)}
      </table>

      <p style={{textAlign: "center",  color: "#1a428a", fontSize: "16px", textTransform:"uppercase", fontWeight:"bold"}}>Yearly Premium</p>
      <p style={{textAlign: "center",  color: "#1a428a", fontSize: "30px", margin:"20px auto", fontWeight:"bold", fontFamily:"Gotham Thin"}}>{data.markdownRemark.frontmatter.premium}</p>
      <button style={{cursor:"pointer", fontSize:"24px", border:"0", display:"block", margin:"0 auto", color:"#FFF", padding:"15px 40px", borderRadius:"20px", backgroundColor:"#1a428a", fontColor:"#FFF", textTransform:"uppercase", fontWeight:"bold"}}>Get Insured</button>
    </div>
  </div>


    
  <Footer />
</Layout>;
}

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
