import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'
import { Link } from "gatsby"

const FooterWrap = styled.section`
  background-color: #1a428a;
  display:block;
  justify-content: center;
  border-radius: 90%/300px 300px 0 0;
  margin-top:-160px;
`;

const Menu = link => <li>
  <Link to={link.href}>{link.text}</Link>
  {link.children.map( child => <Menu link={child}/>)}
</li>;

const Footer = ({data}) => {
console.log(data);  
return <FooterWrap>   
    <div className="columns">
        <div className="column one-quater">{<img alt={data.footerLogo.alt} src={
        !!data.footerLogo.image.childImageSharp
            ? data.footerLogo.image.childImageSharp.fluid.src
            : data.footerLogo.image
        } />}</div>
        <div className="column one-quarter">
        <ul>
        {data.footerColumn1.map( link => <Menu link/> )}
        {data.footerColumn2.map( link => <Menu link/> )}
        </ul>
        </div>
    </div>
</FooterWrap>}

export default props => (
    <StaticQuery
      query={graphql`{
        allMarkdownRemark(filter: {frontmatter: {title: {eq: "Home"}}}) {
          edges {
            node {
              frontmatter {
                footerLogo{
                  childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                footerColumn1{
                  text,
                  href,
                  children{
                    text,
                    href
                  }
                }
                footerColumn2{
                  text,
                  href,
                }
                footerSocialHeading
                footerSocial{
                  text,
                  href
                }
              }
            }
          }
        }
      }`} render={data => <Footer data={data.allMarkdownRemark.edges[0].node.frontmatter} {...props} />} />
)

Footer.propTypes = {
    data: PropTypes.object.isRequired,
}