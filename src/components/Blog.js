import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'

const BlogCards = styled.section`
  justify-content: center;
`

const BlogHeader = styled.section`
  color: #1d8649;
  /* Text style for "LET’S TALK" */
  font-family: "Gotham Light";
  font-weight: 300;
  font-size: 30px;
  text-transform: uppercase;
  text-align: center;
`

const BlogHeaderStrong = styled.strong`
  color: #1d8649;
  font-family: "Gotham Black";
  font-weight: 900;
`

const BlogCard = styled.section`
  color: #9b9b9b;
  font-family: "Gotham Book";
  font-size: 14px;
  font-weight: 300;
`

const Blog = ({data, headline}) =>{
console.log(data);
console.log(headline);
return <BlogCards>
    <BlogHeader>
      {headline.heading1}
      <br />
      <BlogHeaderStrong>{headline.heading2}</BlogHeaderStrong>
    </BlogHeader>
    <BlogCard />
</BlogCards>
}


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