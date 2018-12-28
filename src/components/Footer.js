import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'
import Select from '../utilities/Select'

const FooterWrap = styled.section`
  background-color: #1a428a;
  display:block;
  justify-content: center;
  border-radius: 90%/300px 300px 0 0;
  margin-top:-160px;
`;



const Footer = ({data}) => <FooterWrap>   
    <div className="columns">
        
    </div>
</FooterWrap>

export default props => (
    <StaticQuery
      query={graphql`{
  allMarkdownRemark(filter: {frontmatter: {title: {eq: "Home"}}}) {
    edges {
      node {
        frontmatter {
          footerLogo
          footerColumn1
          footerColumn2
          footerSocialHeading
          footerSocial
        }
      }
    }
  }
}`} render={data => <Footer data={data.allMarkdownRemark.edges[0].node.frontmatter} {...props} />} />
)

Footer.propTypes = {
    data: PropTypes.object.isRequired,
}