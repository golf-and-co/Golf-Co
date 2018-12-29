import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Blog from "../components/Blog";
import Calendar from "../components/Event"

const RecentWrap = styled.section`
  background-color: #f6f9f2;
  display:flex;
  justify-content: center;
  padding:70px 0 200px 0;
`

export const Recent = ({data}) => <RecentWrap className="columns">
    <Blog className="column one-half" headline={data.recentPosts} />
    <Calendar className="column one-half" headline={data.recentCalendar} />
</RecentWrap>


export default props => (
  <StaticQuery
    query={graphql`{
      allMarkdownRemark(filter: {frontmatter: {title: {eq: "Home"}}}) {
        edges {
          node {
            frontmatter {
              recentPosts {
                heading1
                heading2
              }
              recentCalendar {
                heading1
                heading2
              }
            }
          }
        }
      }
    }`} render={data => <Recent data={data.allMarkdownRemark.edges[0].node.frontmatter} {...props} />} />
)