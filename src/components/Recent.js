import React from 'react'
import styled from "styled-components"

const RecentWrap = styled.section`
  background-color: #f6f9f2;
  display:flex;
  justify-content: center;
  padding:70px 0 90px 0;
`

export const Recent = ({data}) => <RecentWrap>
    <Blog headline={data.recentPosts}/>
    <Calendar />
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
            }
          }
        }
      }
    }`} render={data => <Recent data={data.allMarkdownRemark.edges[0].node.frontmatter} {...props} />} />
)