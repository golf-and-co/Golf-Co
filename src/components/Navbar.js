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
  background: rgba(0,0,0,0.5) !important;
  padding: 20px;
`;

const Navbar = ({data, close}) => <SideMenu className="navbar" role="navigation" aria-label="main-navigation" id="nav" style={{display:"none"}}>
      <div className="navbar-start has-text-centered">
        <Link className="navbar-item" to="/about">
          {<img alt={data.footerLogo.alt} src={
          !!data.footerLogo.image.childImageSharp
              ? data.footerLogo.image.childImageSharp.fluid.src
              : data.footerLogo.image
          } />}
        </Link>
        <Link className="navbar-item" to="/"><i class="fas fa-home"></i></Link>
        <Link className="navbar-item" to="#" onClick={close}><i class="fas fa-times-circle "></i></Link>
      </div>
      <hr />
      <div className="columns">
          <div className="column is-half">
          </div>
          <div className="column is-half">
          </div>
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