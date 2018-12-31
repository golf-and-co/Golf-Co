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
  color: #000;
`;

const navClick = () => {
  const nav = document.getElementById("nav");
  console.log(nav.style.display);
  if (nav.style.display === 'block') {
    console.log(" to none");
    nav.style.display = 'none';
  } else {
    // nav hidden, open nav
    console.log(" to block");
    nav.style.display = 'block';
  }
}

const Hamburger = () => <HamburgerWrap className="navbar-burger burger is-visible-desktop" data-target="navMenu" onClick={navClick}>
  <span></span>
  <span></span>
  <span></span>
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

	        <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
	        <meta name="theme-color" content="#fff" />

	        <meta property="og:type" content="business.business" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>
        <Container id="main">{children}</Container>
        <Navbar />
        <Hamburger id="menu" />        
      </div>
    )}
  />
)

export default TemplateWrapper
