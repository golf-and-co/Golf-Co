import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'

const BlogCards = styled.section`
  justify-content: center;
`

const BlogHeader = styled.section`
  justify-content: center;
`

const BlogCard = styled.section`
  justify-content: center;
`

const Blog = ({data, headline}) => <BlogCards>
    <BlogHeader>{headline.headline1}</BlogHeader>
    <BlogCard />
</BlogCards>


export default props => (
    <StaticQuery
      query={graphql`{allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "post"}}} limit:2 sort:{fields:frontmatter___date, order:DESC}){
        edges{
          node{
            frontmatter{
              title
              templateKey
            }
            
          }
        }
      }
      }`} render={data => <Blog data={data.allMarkdownRemark.edges[0].node.frontmatter} {...props} />} />
)
            
Blog.propTypes = {
    data: PropTypes.object.isRequired,
}