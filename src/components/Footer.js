import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'
import { Link } from "gatsby"

const FooterWrap = styled.section`
  background-color: #1a428a;
  display:block;
  justify-content: center;
  border-radius: 200% 200% 0 0;
  margin-top:-160px;
  width: 120%;
  margin-left: -10%;
  min-height: 150px;
  padding-top:100px;
`;


const MenuLink = styled(Link)`
  color: #FFF;
  font-family: "Gotham Bold";
  font-size: 18px;
  font-weight: 700;

  :hover {
    color:#FFF;
    text-shadow:3px 3px 3px rgba(0,0,0,0.3);
  }
`;

const FontAwesomeList = styled.ul`
  display: flex;
`;

const FontAwesomeItem = styled.li`
  margin-right: 10px;
  border: 3px solid #fff;
  border-radius: 1.5rem;
  padding: 3px;
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

const Social = ({link}) => {
  let children = '';
  if(typeof link.children !== 'undefined') {
    children = link.children.map( (child, index) => <li>
      <MenuLink key={index} to={child.href} link={child} style={{"fontWeight":"300", "fontFamily": "Gotham Book", "marginLeft":"10px"}}>{child.text}</MenuLink>
    </li>);
  }
  children = <ul>{children}</ul>
  link.text = <FontAwesome className={`fab fa-${link.text}`} />

  return <FontAwesomeItem>
    <MenuLink to={link.href}>
      {link.text}
    </MenuLink>
    {children}
  </FontAwesomeItem>
}

const Menu = ({link}) => {
  let children = '';
  if(typeof link.children !== 'undefined') {
    children = link.children.map( (child, index) => <li>
      <MenuLink key={index} to={child.href} link={child} style={{"fontWeight":"300", "fontFamily": "Gotham Book", "marginLeft":"10px"}}>{child.text}</MenuLink>
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

const Footer = ({data}) => {
return <FooterWrap> 
  <div className="container">
    <div className="columns">
        <div className="column one-quater">{<img alt={data.footerLogo.alt} src={
        !!data.footerLogo.image.childImageSharp
            ? data.footerLogo.image.childImageSharp.fluid.src
            : data.footerLogo.image
        } />}</div>
        <div className="column one-quarter">
          <ul>{data.footerColumn1.map( (link, index) => <Menu key={index} link={link} /> )}</ul>
        </div>
        <div className="column one-quarter">
          <ul>{data.footerColumn2.map( (link, index) => <Menu key={index} link={link} /> )}</ul>
        </div>
        <div className="column one-quarter">
          <h3>{data.footerSocialHeading}</h3>
          <FontAwesomeList>{data.footerSocial.map( (link, index) => <Social key={index} link={link} /> )}</FontAwesomeList>
        </div>
    </div>
  </div>  
</FooterWrap>
}

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
      }`} render={data => <Footer data={data.allMarkdownRemark.edges[0].node.frontmatter} {...props} />} />
)

Footer.propTypes = {
    data: PropTypes.object.isRequired,
}