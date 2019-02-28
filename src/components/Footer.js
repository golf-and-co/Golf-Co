import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const FooterWrap = styled.section`
  background-color: #1a428a;
  display: block;
  justify-content: center;
  border-top-right-radius: 50% 10%;
  border-top-left-radius: 50% 10%;
  width: 100%;
  margin-top: -50px;
  min-height: 150px;
  padding-top: 100px;
  padding-left: 10%;
  padding-right: 10%;
  z-index: 100;
  position: relative;

  @media (max-width: 768px) {
    margin-top: -20px;
    border-radius: 20% 20% 0 0;
    padding-top: 0px;
    text-align: center;
  }
`

const MenuLink = styled.a`
  color: #fff;
  font-family: 'Gotham Bold';
  font-size: 18px;
  font-weight: 700;

  :hover {
    color: #fff;
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  }
`

const FontAwesomeList = styled.ul`
  display: flex;
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const FontAwesomeItem = styled.li`
  margin-right: 10px;
  border: 3px solid #fff;
  border-radius: 1.5rem;
  padding: 3px;
`

const FontAwesome = styled.i`
  color: #1a428a;
  background: #fff;
  border-radius: 2rem;
  height: 2rem;
  width: 2rem;
  text-align: center;
  line-height: 2rem !important;
  vertical-align: middle;
`

const Social = ({ link }) => (
  <FontAwesomeItem>
    <MenuLink href={link.href}>
      <FontAwesome className={`fab fa-${link.text}`} />
    </MenuLink>
  </FontAwesomeItem>
)

const Menu = ({ link }) => {
  let children = ''
  if (typeof link.children !== 'undefined' && link.children !== null) {
    children = link.children.map((child, index) => (
      <li key={v4()}>
        <MenuLink
          href={child.href}
          link={child}
          style={{
            fontWeight: '300',
            fontFamily: 'Gotham Book',
            marginLeft: '10px',
          }}
        >
          {child.text}
        </MenuLink>
      </li>
    ))
    children = <ul>{children}</ul>
  }

  return (
    <li>
      <MenuLink href={link.href}>{link.text}</MenuLink>
      {children}
    </li>
  )
}

const Footer = ({ data }) => {
  return (
    <FooterWrap>
      <div className="container">
        <div className="columns is-desktop">
          <div className="column one-quater">
            {
              <img
                alt={data.footerLogo.alt}
                src={
                  !!data.footerLogo.image.childImageSharp
                    ? data.footerLogo.image.childImageSharp.fluid.src
                    : data.footerLogo.image
                }
              />
            }
          </div>
          <div className="column one-quarter is-hidden-tablet">
            <h3>{data.footerSocialHeading}</h3>
            <FontAwesomeList>
              {data.footerSocial.map(link => (
                <Social key={v4()} link={link} />
              ))}
            </FontAwesomeList>
          </div>
          <div
            className="columns is-mobile is-hidden-tablet"
            style={{ marginTop: '40px' }}
          >
            <div className="column one-half is-hidden-tablet">
              <ul>
                {data.footerColumn1.map(link => (
                  <Menu key={v4()} link={link} />
                ))}
              </ul>
            </div>
            <div className="column one-half is-hidden-tablet">
              <ul>
                {data.footerColumn2.map(link => (
                  <Menu key={v4()} link={link} />
                ))}
              </ul>
            </div>
          </div>

          <div className="column one-quarter is-hidden-mobile">
            <ul>
              {data.footerColumn1.map(link => (
                <Menu key={v4()} link={link} />
              ))}
            </ul>
          </div>
          <div className="column one-quarter is-hidden-mobile">
            <ul>
              {data.footerColumn2.map(link => (
                <Menu key={v4()} link={link} />
              ))}
            </ul>
          </div>
          <div className="column one-quarter is-hidden-mobile">
            <h3>{data.footerSocialHeading}</h3>
            <FontAwesomeList>
              {data.footerSocial.map(link => (
                <Social key={v4()} link={link} />
              ))}
            </FontAwesomeList>
          </div>
        </div>
      </div>
    </FooterWrap>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(filter: { frontmatter: { title: { eq: "Home" } } }) {
          edges {
            node {
              frontmatter {
                footerLogo {
                  image {
                    childImageSharp {
                      fluid(maxWidth: 2048, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  alt
                }
                footerColumn1 {
                  text
                  href
                  children {
                    text
                    href
                  }
                }
                footerColumn2 {
                  text
                  href
                }
                footerSocialHeading
                footerSocial {
                  text
                  href
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Footer
        data={data.allMarkdownRemark.edges[0].node.frontmatter}
        {...props}
      />
    )}
  />
)

Footer.propTypes = {
  data: PropTypes.object.isRequired,
}
