import React from 'react'
import { Link } from 'gatsby'
import styled, { keyframes } from "styled-components"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

export const width25 = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 30vw;
  }
`;

const SideMenu = styled.nav`
  position: fixed !important;
  width: 30vw;
  height: 102vh;
  right: 0;
  background: #FFF !important;  
  color: #444 !important;
  font-size:30px;
  box-shadow: inset 0 0 5px #CCC;
  /* animation: ${width25} 0s ease-in-out 1s 1; */
`;

const MenuLinks = styled.div`
  padding: 0px 50px 0px 64px;
`;

const HeaderLink = styled(Link)`
  color: #CCC !important;
  flex-grow: 1 !important;
  float: left;

  :hover {
    background: none !important;
  }
`;

const MenuLink = styled(Link)`
  color: #1d8649;
  font-family: "Gotham Book";
  font-size: 22px;
  font-weight: 300;
`;

const MenuLinkChild = styled(Link)`
  color: #1d8649; 
  font-family: "Gotham Book";
  /* Text style for "UAE" */
  font-size: 20px;
  line-height: 30px;
`;

const Heading = styled.div`
  padding: 40px 50px 0px 64px;
  justify-content: space-around !important;
`;

const DottedLine = styled.div`
  padding: 0px 50px 0px 64px;
  margin: 30px 60px;
  border: 1px dashed #cfddbb;
`;

const FontAwesomeList = styled.ul`
  display: flex;
`;

const FontAwesomeItem = styled.li`
  margin-right: 10px;
  border: 3px solid #fff;
  border-radius: 1.5rem;
  padding: 3px;
  line-height: 0;
`;

const FontAwesome = styled.i`
  color: #1A428A;
  background: #FFF;
  border-radius: 2rem;
  height: 2rem;
  width: 2rem;
  text-align: center;
  line-height: 2rem !important;
  vertical-align: middle;
`;

const MenuFooter = styled.footer`
  background-color: #1a428a;
  padding: 45px 65px !important;
  height: 80vh;
`;

const MenuFooterHeader = styled.h3`
  margin-bottom: 10px;
  color: #FFF;
  font-family: "Gotham Light";
  font-size: 20px;
  font-weight: 300;
  text-transform: uppercase;
`;

const Social = ({link}) => <FontAwesomeItem>
  <MenuLink to={link.href}>
    <FontAwesome className={`fab fa-${link.text}`} />
  </MenuLink>
</FontAwesomeItem>

const Menu = ({link}) => {
  let children = '';
  if(typeof link.children !== 'undefined') {
    children = link.children.map( (child, index) => <li key={v4()}>
      <MenuLinkChild to={child.href} link={child} style={{"fontWeight":"300", "fontFamily": "Gotham Book", "marginLeft":"10px"}}>{child.text}</MenuLinkChild>
    </li>)
    children = <ul>{children}</ul>
  }
  
  return <li>
  <MenuLink to={link.href}>
    {link.text}
  </MenuLink>
  {children}
</li>
}

const Navbar = ({data, close}) => <SideMenu className="navbar" role="navigation" aria-label="main-navigation" id="nav" style={{display:"none"}}>
      <Heading className="navbar-start has-text-centered">
        <HeaderLink className="navbar-item" to="/">
          {<img alt={data.menuLogo.alt} src={
          !!data.menuLogo.image.childImageSharp
              ? data.menuLogo.image.childImageSharp.fluid.src
              : data.menuLogo.image
          } />}
        </HeaderLink>
        <div>
          <HeaderLink className="navbar-item" to="/"><i class="fas fa-home"></i></HeaderLink>
          <HeaderLink className="navbar-item" to="#" onClick={close}><i class="fas fa-times-circle "></i></HeaderLink>
        </div>
      </Heading>
      <DottedLine />
      <MenuLinks className="columns">
          <div className="column is-half">
            <ul>{data.footerColumn1.map( link => <Menu key={v4()} link={link} /> )}</ul>
          </div>
          <div className="column is-half">
            <ul>{data.footerColumn2.map( link => <Menu key={v4()} link={link} /> )}</ul>
          </div>
      </MenuLinks>
      <MenuFooter>
          <MenuFooterHeader>{data.footerSocialHeading}</MenuFooterHeader>
          <FontAwesomeList>{data.footerSocial.map( link => <Social key={v4()} link={link} /> )}</FontAwesomeList>
      </MenuFooter>
</SideMenu>

export default props => (
  <StaticQuery
    query={graphql`{
      allMarkdownRemark(filter: {frontmatter: {title: {eq: "Home"}}}) {
        edges {
          node {
            frontmatter {
              menuLogo{
                image {
                  childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
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
    }`} render={data => <Navbar data={data.allMarkdownRemark.edges[0].node.frontmatter} {...props} />} />
)

Navbar.propTypes = {
  data: PropTypes.object.isRequired,
}