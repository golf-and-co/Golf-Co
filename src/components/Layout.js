import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Navbar from '../components/Navbar'
import './all.sass'

const Container = styled.section`
  padding: 0;
  width: 100%;

  .button, button, .juicer-button {
    transition: color 0.3s 0.1s ease-out;
    overflow: hidden;
    position: relative;
    z-index:1;

    :hover {
      color: #FFF !important;
      :before {
        box-shadow:inset 0 0 0 300px #1d8649 !important;
      }
    }
  }

  .button:before, button:before, .juicer-button:before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    content: '';
    border-radius: 50%;
    display: block;
    width: 100%;
    height: 300px;
    line-height: 100%;
    text-align: center;
    transition: box-shadow 0.5s ease-out;
    z-index: -1;
    box-shadow:inset 0 0 0 0 #1d8649 !important;
  }
`

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "meta" } } }) {
          edges {
            node {
              frontmatter {
                siteTitle
                description
                favicon {
                  publicURL
                }
                meta {
                  name
                  property
                  content
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const metatags = data.allMarkdownRemark.edges[0].node.frontmatter.meta.map(tag => {
      if(typeof tag.property === "undefined" || tag.property === null) {
        return <meta key={tag.name} name={tag.name} content={tag.content} />
      } else {
        return <meta key={tag.property} property={tag.property} content={tag.content} />
      }
      })

      return <div className="container columns is-fluid no-margin">
        <Helmet>
          <html lang="en" />
          <title>{data.allMarkdownRemark.edges[0].node.frontmatter.siteTitle}</title>
 

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={data.allMarkdownRemark.edges[0].node.frontmatter.favicon.publicURL}
          />
          <link
            rel="icon"
            type="image/png"
            href={data.allMarkdownRemark.edges[0].node.frontmatter.favicon.publicURL}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={data.allMarkdownRemark.edges[0].node.frontmatter.favicon.publicURL}
            sizes="16x16"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
            integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
            crossorigin="anonymous"
          />

          <link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />

          <link
            rel="mask-icon"
            href="/img/safari-pinned-tab.svg"
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />

          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
            integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
            crossorigin=""
          />
          <script
            src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
            integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
            crossorigin=""
          />

          <script src='https://assets.juicer.io/embed.js' type='text/javascript'></script>
          <link href='https://assets.juicer.io/embed.css' media='all' rel='stylesheet' type='text/css' />

          {metatags}
        </Helmet>
        <Container id="main">{children}</Container>
        <Navbar />
      </div>
    }}
  />
)

export default TemplateWrapper
