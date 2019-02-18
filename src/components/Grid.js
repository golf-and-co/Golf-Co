import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Course } from '../components/Featured'
import { v4 } from 'uuid'
import { isObject } from 'util';
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

const Grid = ({data, filter, slugType, footer, hideStats, location}) => {
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
        const classes = filter.map(field => {
        
        // filter is an array of fields
        // accomplished by getting value of field, slugify, and setting as a classname
        // then based on filter, class combination is shown.
        if(isObject(field)) {
          const key = Object.keys(field)[0];
          const value = field[key];
          //@TODO: replace and use hooks and context api. Nested arrays made using classes too complex
          return edge.node.frontmatter[key].filter(
              row => row[value] !== null
          ).map(row => 
              key+"-"+row[value].replace(/ /g,'')
          ).join(" ");
        } else {
          return field+"-"+edge.node.frontmatter[field].replace(/ /g,'-');
        }
      }).join(" ");

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
          <Item className={classes+" filterable"} key={v4()} style={locationStyle}>
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
                  slug: `/${slugType}/`+edge.node.frontmatter.title.replace(/ /g, '-').toLowerCase(),
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
  data: PropTypes.object.isRequired,
}

export default Grid
