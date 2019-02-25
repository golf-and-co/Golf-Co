import React from 'react'
import styled from 'styled-components'
import { Course } from '../components/Featured'
import {connect} from "react-redux"
import { v4 } from 'uuid'
import {hide} from "../components/Control/Hide"

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

const mapStateToProps = ({controls}) => {
  return {controls};
}

const GridElement = ({data, controls, slug, footer, hideStats}) => {
  // hide per state.controls
  const visible = hide(data, controls).map(edge => edge.node.frontmatter.title);
  const style = (title) => {
    if(visible.includes(title)) {
      return {display:"flex"};
    }
    return {display:"none"};
  };
  return (
    <Wrap>
      {data.map(edge => {    
        return (
          <Item key={v4()} style={style(edge.node.frontmatter.title)}>
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

export const Grid = connect(
  mapStateToProps
)(GridElement);
