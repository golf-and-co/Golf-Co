import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Course } from '../components/Featured'
import { v4 } from 'uuid'
import queryString from 'query-string';

const Wrap = styled.section`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;

  a {
    margin: 0px 10px 20px 10px;
    @media (max-width: 768px) {
        margin: 0 auto;
    }
  }
  .cardContentHover {
      height: 320px;
      top: -215px
  }
`

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Grid = ({visible, slug, footer, hideStats, location}) => {
  
  return (
    <Wrap>
      {visible.map(edge => {
        // @TODO: move this up to page
        // allows url to hide based on city, for homepage drop downs
        let locationStyle = {};
        if(typeof location !== 'undefined') {  
          const cityURL = queryString.parse(location.search).city;
          if(typeof cityURL === 'undefined') {
            locationStyle = {};
          } else if(cityURL !== edge.node.frontmatter.city) {
            locationStyle = {display:"none"};
          } else {
            locationStyle = {};
          }
        }
        return (
          <Item key={v4()} style={locationStyle}>
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
                  slug: `/${slug}/`+edge.node.frontmatter.title.replace(/ /g, '-').toLowerCase(),
                },
              }}
              footer={footer} 
              hideStats={hideStats}
            />
          </Item>
        )
      })}
    </Wrap>
  )
}

Grid.propTypes = {
  visible: PropTypes.array.isRequired,
}

export default Grid
