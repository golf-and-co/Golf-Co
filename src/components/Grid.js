import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Course } from '../components/Featured'
import { v4 } from 'uuid'

const Wrap = styled.section`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;

  a {
    margin: 10px;
    @media (max-width: 768px) {
        margin: 0 auto;
    }
  }
  .cardContentHover {
      height: 320px;
      top: -215px
  }
`

const Grid = ({data, filter}) => {
  /*
    edges: (2) […]
    ​​
        0: {…}
        ​​​
            node: {…}
            ​​​​
              frontmatter: {…}
            ​​​​​
                title: "Golf Packages"
    */

  // @TODO: factor out Course from featured, better adapter
  // what adapter wants:
  /*data.fields = {
        slug: 'a',
    };
    data.frontmatter = {};
    data.frontmatter.featuredDetails = {
        image: '',
        name: '',
        city: '',
        country: '',
    };*/

  return (
    <Wrap>
      {data.edges.map(edge => {
        return (
          //  @TODO: add filterable classes
          <div className="">
          <Course
            data={{
              frontmatter: {
                featuredDetails: {
                  image: edge.node.frontmatter.image,
                  name: edge.node.frontmatter.title,
                },
                stats: edge.node.frontmatter.stats,
                city: edge.node.frontmatter.city,
                country: edge.node.frontmatter.country,
              },
              fields: {
                slug: "/packages/"+edge.node.frontmatter.title.replace(/ /g, '-').toLowerCase(),
              },
            }}
            key={v4()}           
          />
</div>
        )
      })}
    </Wrap>
  )
}

Grid.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Grid
