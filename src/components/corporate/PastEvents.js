import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

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

const CardImage = styled.img`
  height:216px !important;
  border-radius: 6px 6px 0 0;
`;

const CardContent = styled.div`
  color: #000000;
  font-size: 20px;
  font-weight: 300;
  padding: 16px 0 0 0px !important;
  position: relative;
  z-index: 0;
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
   line-height: 120%;
`
const CardContentSubTitle = styled.div`
   font-size: 15px;
   font-weight: 100;
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
   width: 100%;
   color: #878787;
   line-height: 120%;
`

const CardContentDate = styled.div`
   font-size: 14px;
   font-weight: 900;
   white-space: nowrap;
   text-overflow: ellipsis;
   width: 100%;
   color: #8a8a8a;
   line-height: 120%;
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
                frontmatter{
                  title
                  description
                  from
                  to
                  background {
                    childImageSharp {
                      fluid(maxWidth: 2048, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }`
      }
      render={data => (
        <Events>
          {data.allMarkdownRemark.edges.filter(node =>
            (Date.now() < Date.parse(node.frontmatter.to))
          ).map(({node}) => {
            return <Card>
              <CardImageWrap>
                  <CardImage src={
                  !!node.frontmatter.background.childImageSharp
                      ? node.frontmatter.background.childImageSharp.fluid.src
                      : node.frontmatter.background
                  } alt="Placeholder" />
              </CardImageWrap>
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
    <Button className="button is-rounded">View all</Button>
  </Wrap>)
}

export default Content;