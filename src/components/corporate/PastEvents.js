import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const Wrap = styled.section`
  background-color: #e4ebd9;
  padding: 30px;

  p {
    max-width: 920px;
    margin: 20px auto;
    color: #5ea778;
    text-align: center;
    font-size: 30px;

    @media (max-width: 768px) {
      margin: 5px auto;
    }
  }
`

const Events = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Card = styled.div`
  width: 260px;
  height: 320px;
  border-radius: 6px;
  background-color: #ffffff;
  margin: 0px 15px 0px 15px;

  @media (max-width: 768px) {
    margin: 0px auto 40px auto;
  }
`

const CardImageWrap = styled.div`
  height: 216px;
  position: relative;
  z-index: 0;
`;

const CardContent = styled.div`
  color: #000000;
  font-size: 20px;
  font-weight: 300;
  padding: 16px 0 0 0px !important;
  position: relative;
  z-index: 100;
  background-color: #FFF !important;
  transition: height 1s ease-out, top 1s ease-out;
  height: 100px;
  top: 0px;
  overflow: hidden;

  #stats {
      width: 260px;
      height: 325px;
      background-color: #81AA8C;
  }

  #stats ul {
    color: #FFF;
    font-size: .8rem;
  }

  #stats ul li {
    border-color: #1d8649;
    padding-top: 10px;
  }

  #stats ul li i {
    color: #CFDDBB;
  }

  .content {
      margin-left: 15px;
   }
`;

const CardContentTitle = styled.div`
   font-size: 17px;
   font-weight: 900;
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
   width: 100%;
   color: black;
`
const CardContentSubTitle = styled.div`
   font-size: 15px;
   font-weight: 100;
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
   width: 100%;
   color: #878787;
`

const CardContentDate = styled.div`
   font-size: 14px;
   font-weight: 900;
   white-space: nowrap;
   text-overflow: ellipsis;
   width: 100%;
   color: #8a8a8a;
`


const CardContentTag = styled.div`
  color: #9b9b9b;
  font-size: 14px;
  margin-top: 9px;
`;

const Content = () =>   {
  return (<Wrap>
    <p>PAST EVENTS</p>
    <StaticQuery
      query={graphql`
       query {
          allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "event"}}}){
            edges{
              node{
                frontmatter{
                  title
                  description
                  from
                }
              }
            }
          }
        }`
      }
      render={data => (
        <Events>
          {data.allMarkdownRemark.edges.map(({node}, index) => {
            console.log(node);
            return <Card>
            <CardImageWrap></CardImageWrap>
            <CardContent>
            <div className="content">
              <CardContentTitle>{node.frontmatter.title}</CardContentTitle>
              <CardContentSubTitle>{node.frontmatter.description}</CardContentSubTitle>
              <CardContentDate>{node.frontmatter.from}</CardContentDate>
            </div>
            </CardContent>
            </Card>
          })}
        </Events>

      )}>
    </StaticQuery>
  </Wrap>)
}

export default Content;