import React, {useState} from 'react'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

export const width25 = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 30vw;
  }
`

const Side = styled.nav`
  position: fixed !important;
  width: 30vw;
  height: 102vh;
  top: 0;
  background: #FFF !important;  
  color: #444 !important;
  font-size:30px;
  box-shadow: inset 0 0 5px #CCC;

  transition: right 0.5s ease-out;
  
  &.navbar {
    display: block;
    z-index: 100;
  }

  @media (max-width: 768px) {
    position: absolute !important;
    display: none;
    width: 100vw;
    height: auto;
  }
`

const Links = styled.div`
  padding: 0px 50px 0px 64px;
`

const HeaderLink = styled(Link)`
  color: #ccc !important;
  flex-grow: 1 !important;
  float: left;

  :hover {
    background: none !important;
  }
`

const HeaderAnchor = styled.a`
  color: #ccc !important;
  flex-grow: 1 !important;
  float: left;

  :hover {
    background: none !important;
  }
`

const LinkParent = styled.a`
  color: #1d8649;
  font-family: 'Gotham Book';
  font-size: 22px;
  font-weight: 300;
`

const LinkChild = styled.a`
  color: #1d8649;
  font-family: 'Gotham Book';
  /* Text style for "UAE" */
  font-size: 20px;
  line-height: 30px;
`

const Heading = styled.div`
  padding: 40px 50px 0px 64px;
  justify-content: space-around !important;
`

const DottedLine = styled.div`
  padding: 0px 50px 0px 64px;
  margin: 30px 60px;
  border: 1px dashed #cfddbb;
`

const FontAwesomeList = styled.ul`
  display: flex;
`

const FontAwesomeItem = styled.li`
  margin-right: 10px;
  border: 3px solid #fff;
  border-radius: 1.5rem;
  padding: 3px;
  line-height: 0;
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

const Footer = styled.footer`
  background-color: #1a428a;
  padding: 45px 65px !important;
  height: 80vh;
`

const FooterHeader = styled.h3`
  margin-bottom: 10px;
  color: #fff;
  font-family: 'Gotham Light';
  font-size: 20px;
  font-weight: 300;
  text-transform: uppercase;
`

const HamburgerWrap = styled.div`
  z-index: 0;
  color: #fff;
  margin: 45px 60px;

  &.navbar-burger {
    display: block;
  }

  :hover {
    background-color: transparent !important;
  }

  @media (max-width: 768px) {
    top: 0px;  
  }
`

const HamburgerLine1 = styled.span`
  top: calc(50% - 8px) !important;
  height: 3px !important;
  width: 24px !important;
`

const HamburgerLine2 = styled.span`
  top: calc(50%) !important;
  height: 3px !important;
  width: 24px !important;
`

const HamburgerLine3 = styled.span`
  top: calc(50% + 8px) !important;
  height: 3px !important;
  width: 24px !important;
`

const Hamburger = ({click}) => {

  return <HamburgerWrap
    id="hb"
    className="navbar-burger burger"
    data-target="navMenu"
    onClick={click}
  >

  
    <HamburgerLine1 />
    <HamburgerLine2 />
    <HamburgerLine3 />
  </HamburgerWrap>
}

const Social = ({ link }) => (
  <FontAwesomeItem>
    <LinkParent href={link.href}>
      <FontAwesome className={`fab fa-${link.text}`} />
    </LinkParent>
  </FontAwesomeItem>
)

const Menu = ({ link }) => {
  let children = ''
  if (typeof link.children !== 'undefined' && link.children !== null) {
    children = link.children.map((child, index) => (
      <li key={v4()}>
        <LinkChild
          href={child.href}
          link={child}
          style={{
            fontWeight: '300',
            fontFamily: 'Gotham Book',
            marginLeft: '10px',
          }}
        >
          {child.text}
        </LinkChild>
      </li>
    ))
    children = <ul>{children}</ul>
  }

  return (
    <li>
      <LinkParent href={link.href}>{link.text}</LinkParent>
      {children}
    </li>
  )
}

const Nav = (props) => {
  // Declare a new state variable, which we'll call "count"
  const [right, setRight] = useState("-100vw");
  const [overlay, setOverlay] = useState("none");
  // Hamburger menu click handler
  const click = () => {
    setRight('0'); 
    setOverlay("block");
  }
  return <span>
    <div style={{
      width: "100vw",
      height: "120vh",
      position: "fixed",
      background: "rgba(0,0,0,0.1)",
      left: "0",
      top: "0",
      zIndex: "10",
      display: overlay
  }} onClick={() => {
      setRight("-100vw");
      setOverlay("none") 
  }
    }></div>
  <Side
    className="navbar"
    role="navigation"
    aria-label="main-navigation"
    id="nav"
    style={{ right: right }}
  >
    <Heading className="navbar-start has-text-centered">
      <HeaderLink className="navbar-item" to="/">
        {
          <img
            alt={props.data.menuLogo.alt}
            src={
              !!props.data.menuLogo.image.childImageSharp
                ? props.data.menuLogo.image.childImageSharp.fluid.src
                : props.data.menuLogo.image
            }
          />
        }
      </HeaderLink>
      <div>
        <HeaderLink className="navbar-item" to="/">
          <i className="fas fa-home" />
        </HeaderLink>
        <HeaderAnchor className="navbar-item" onClick={() => { 
          setRight("-100vw");
          setOverlay("none");
        }}>
          <i className="fas fa-times-circle " />
        </HeaderAnchor>
      </div>
    </Heading>
    <DottedLine />
    <Links className="columns">
      <div className="column is-half">
        <ul>
          {props.data.footerColumn1.map(link => (
            <Menu key={v4()} link={link} />
          ))}
        </ul>
      </div>
      <div className="column is-half">
        <ul>
          {props.data.footerColumn2.map(link => (
            <Menu key={v4()} link={link} />
          ))}
        </ul>
      </div>
    </Links>
    <Footer>
      <FooterHeader>{props.data.footerSocialHeading}</FooterHeader>
      <FontAwesomeList>
        {props.data.footerSocial.map(link => (
          <Social key={v4()} link={link} />
        ))}
      </FontAwesomeList>
    </Footer>
  </Side>
  <Hamburger id="menu" click={click} />
  </span>
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(filter: { frontmatter: { title: { eq: "Home" } } }) {
          edges {
            node {
              frontmatter {
                menuLogo {
                  image {
                    childImageSharp {
                      fluid(maxWidth: 2048, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
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
      <Nav
        data={data.allMarkdownRemark.edges[0].node.frontmatter}
        {...props}
      />
    )}
  />
)

Nav.propTypes = {
  data: PropTypes.object.isRequired,
}
