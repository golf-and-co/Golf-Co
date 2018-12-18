import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import styled from "styled-components"

const Wallpaper = styled.section`
  min-height: 757px;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #F6F9F2;
`

export default class IndexPage extends React.Component {
  render() {
    const data = this.props.data.allMarkdownRemark.edges[0].node
    console.log("data is")
    console.log(data)
    

    return (
      <Layout>
        <Wallpaper>
          <div className="container content">
            <div className="column is-10 is-offset-1">
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {data.frontmatter.title}
              </h1>
            </div>
          </div>
        </Wallpaper>
      </Layout>
    )
  }
}

/*

              <p>{description}</p>
              <PostContent content={content} />
              {tags && tags.length ? (
                <div style={{ marginTop: `4rem` }}>
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.map(tag => (
                      <li key={tag + `tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

*/

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const IndexQuery = graphql`
query HomePage {
  allMarkdownRemark(filter: {frontmatter: {title:{eq:"Enjoy the Ultimate"}}}) {
    edges {
      node {
        id
        fields{
          slug
        }
        tableOfContents
        headings{
          value
          depth
        }
        frontmatter{
          title
          heading
          description
        }
      }
    }
  }
}
`