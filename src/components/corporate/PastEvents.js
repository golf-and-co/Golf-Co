import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { Course } from '../../components/Featured'

const Wrap = styled.section`
  background-color: #e4ecd9;
  padding: 30px;

  p {
    max-width: 920px;
    margin: 20px auto;
    color: #000;
    text-align: center;

    @media (max-width: 768px) {
      margin: 5px auto;
    }
  }

  .container a {
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55),-webkit-transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    :hover {
      transform: translateY(-6px);
      filter: brightness(102%) hue-rotate(12deg);
    }
  }
`

const Heading = styled.p`
  text-align: center;
  font-size: 200%;
  color: #1d8649 !important;
  font-weight: 100;
  margin: 0 auto 10px auto !important;
`

const Events = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    display: block;
  }
`

const Button = styled.button`
  display:block !important;
  width: 150px;
  margin: 20px auto 0px auto;
  background:none !important;
  color: #1d8649 !important;
  font-weight: 300;
  text-transform: uppercase;
  border-color: #1d8649 !important;
`;

const Content = () =>   {
  return (<Wrap>
    <Heading>PAST EVENTS</Heading>
    <StaticQuery
      query={graphql`
       query {
          allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "event"}}
        }, limit: 4){
            edges{
              node{
                fields {
                  slug
                }
                frontmatter{
                  title
                  description
                  date
                  images {
                    image {
                      publicURL
                    }
                  }
                }
              }
            }
          }
        }`
      }
      render={data => {
        return <Events className="container">
          {data.allMarkdownRemark.edges.map( edge => {
            // @TODO: centralize cards, take from /components/Featured
            edge.node.frontmatter.image = edge.node.frontmatter.images[0].image.publicURL;
            edge.node.frontmatter.cardDescription = <span class="event">{edge.node.frontmatter.location}<br /><span class="date">{edge.node.frontmatter.date}</span></span>;
            return <Course
            data={{
              frontmatter: {
                featuredDetails: {
                  image: edge.node.frontmatter.image,
                  name: edge.node.frontmatter.title,
                },
                stats: edge.node.frontmatter.stats,
                city: edge.node.frontmatter.city,
                country: edge.node.frontmatter.country,
                cardDescription: edge.node.frontmatter.cardDescription,
              },
              fields: {
                slug: edge.node.fields.slug,
              },
            }}
            footer={false} 
            hideStats={true}
            hideCaption={true}
            restoreWindow={true}
          />
          })}
        </Events>
      }}>
    </StaticQuery>
    <Button className="button is-rounded" onClick={() => window.location.href = "/events"}>View all</Button>
  </Wrap>)
}

export default Content;