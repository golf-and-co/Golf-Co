import React from 'react'
import { Link } from 'gatsby'
import styled from "styled-components"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from 'prop-types'

const SideMenu = styled.nav`
  position: fixed !important;
  width: 25vw;
  height: 102vh;
  right: 0;
  background: rgba(255,255,255,0.5) !important;
  padding: 20px;
`;

const Navbar = ({data}) => <SideMenu className="navbar" role="navigation" aria-label="main-navigation" id="nav" style={{display:"none"}}>
      <div className="navbar-start has-text-centered">
        <Link className="navbar-item" to="/about">
          About
        </Link>
        <Link className="navbar-item" to="/products">
          Products
        </Link>
        <Link className="navbar-item" to="/contact">
          Contact
        </Link>
        <Link className="navbar-item" to="/contact/examples">
          Form Examples
        </Link>
      </div>
</SideMenu>

export default props => (
  <StaticQuery
    query={graphql`{
      allMarkdownRemark(filter: {frontmatter: {title: {eq: "Home"}}}) {
        edges {
          node {
            frontmatter {
              footerLogo{
                image {
                  childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                alt
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
    }`} render={data => <Navbar data={data.allMarkdownRemark.edges[0].node.frontmatter} {...props} />} />
)

Navbar.propTypes = {
  data: PropTypes.object.isRequired,
}