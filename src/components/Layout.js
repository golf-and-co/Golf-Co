import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Navbar from '../components/Navbar'
import './all.sass'

const Container = styled.section`
  padding: 0;
  width: 100%;
`
const HamburgerWrap = styled.div`
  z-index: 30;
  color: #FFF;
  margin: 45px 60px;

  :hover {
    background-color: transparent !important;
  }
`;

const HamburgerLine1 = styled.span`
  top: calc(50% - 8px) !important;
  height: 3px !important;
  width: 24px !important;
`;

const HamburgerLine2 = styled.span`
  top: calc(50%) !important;
  height: 3px !important;
  width: 24px !important;
`;

const HamburgerLine3 = styled.span`
  top: calc(50% + 8px) !important;
  height: 3px !important;
  width: 24px !important;
`;

const navClick = () => {
  const nav = document.getElementById("nav");
  const hb = document.getElementById("hb");
  if (nav.style.display === 'block') {
    nav.style.display = 'none';
    hb.style.display = 'flex';
  } else {
    // nav hidden, open nav
    nav.style.display = 'block';
    hb.style.display = 'none';
  }
}

const Hamburger = () => <HamburgerWrap id="hb" className="navbar-burger burger is-visible-desktop is-hidden-mobile" data-target="navMenu" onClick={navClick}>
  <HamburgerLine1></HamburgerLine1>
  <HamburgerLine2></HamburgerLine2>
  <HamburgerLine3></HamburgerLine3>
</HamburgerWrap>;

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
            }
          }
        }
    `}
    render={data => (
      <div className="container columns is-fluid no-margin">
        <Helmet>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description} />
          
          <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
	        <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
	        <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous" />

          <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

	        <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
	        <meta name="theme-color" content="#fff" />

	        <meta property="og:type" content="business.business" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>
        <Container id="main">{children}</Container>
        <Navbar close={navClick} />
        <Hamburger id="menu" />        
      </div>
    )}
  />
)

export default TemplateWrapper
