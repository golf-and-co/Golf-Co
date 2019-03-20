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
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    margin: 0px 10px 20px 10px;
    @media (max-width: 768px) {
        margin: 0 auto;
    }
  }
  .cardContentHover {
      height: 320px;
      top: -220px;
  }
`

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const mapStateToProps = ({controls}) => {
  return {controls};
}

const GridElement = ({data, controls, slug, footer, hideStats, hideCaption, button}) => {
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

        if(edge.node.frontmatter.region === null) {
          //@TODO: better data model and props, add region to package to remove this
          edge.node.frontmatter.region = edge.node.frontmatter.country;
        }

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
                  region: edge.node.frontmatter.region,
                  country: edge.node.frontmatter.country,
                  cardDescription: edge.node.frontmatter.cardDescription,
                },
                fields: {
                  slug: edge.node.fields.slug,
                },
              }}
              footer={footer} 
              hideStats={hideStats}
              hideCaption={hideCaption}
              button={button}
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
