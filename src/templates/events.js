import React  from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components"
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Content from "../components/Content";
import {aggregate} from "../components/Control/Aggregate";
import {Checkbox} from "../components/Control/Checkbox";
import {Button} from "../components/Control/Button";
import {Grid} from '../components/Grid'
import slugify from "slugify";
import Footer from "../components/Footer";

const Background = styled.section`
    padding-bottom: 200px;
    background-color: #E4ECD9;
    
    .cardContent .content {
      font-size: 14px;
      font-weight: bold;
    }

    .cardContent .content .date {
      color:#797979;
      font-weight: bold;
      text-transform: uppercase;
    }

    .event {
      font-size: 12px;
    }

`;

const Wrap = styled.section`
    @media (min-width: 768px) {
        width: 1110px;
        max-width: 100%;
    }
    margin: 0 auto !important;

    .cardContentHover {
      height: 100px !important;
      top: 0px !important;
    }
`;

const ControlWrap = styled.div`
  section {
    justify-content: right;
  }
  @media (max-width: 768px) {
    display: none !important;
  }
`;

const ControlBox = styled.div`
    display: flex;
    @media (max-width: 768px) {
      display: none;
      background-size: inherit;
    }

    h6 {
        color: #000;
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: bold;
        margin: 15px 15px 25px 15px;
    }
    
    button.button.is-success {
        background-color: #1d8649;
        font-size: 14px;
        margin: 15px auto;
        display: block;
        width: 97px;
    }
    a.clear {
        color: #333;
        font-size: 0.6rem;
        text-transform: none;
        text-align: right;
        margin-left: 40px;
    }
    .is-checkradio[type="checkbox"] + label {
        color: #000;
        font-size: 0.8rem;
    }
    .is-checkradio[type="checkbox"] + label::before, .is-checkradio[type="checkbox"] + label::before {
        width: 14px;
        height: 14px;
        top: 4px;
        border: 1px solid #cfddbb;
        background-color: #f6f9f2;
    }
    .is-checkradio[type="checkbox"] + label::after, .is-checkradio[type="checkbox"] + label::after {
        top: 5px;
        left: 5px;
        width: 6px;
        height: 8px;
    }
    .is-checkradio[type="checkbox"].is-success:checked + label::after, .is-checkradio[type="checkbox"].is-success:checked + label::after {
        border-color: #1d8649 !important;
    }

    br {
        line-height: 1;
    }
`;

const Control = styled.section`
    background-color: #FFF;
    width: 260px;
    min-height:225px;
    justify-content:right;
    border-radius: 3px;
    box-shadow: 3px 3px 3px rgba(0,0,0,0.1);

    & > .select {
        margin: 10px 15px;
    }
`

export const PageTemplate = ({ title }) => (
  <section className="section section--gradient">
    <div className="container">Preview Offline</div>
  </section>
);

PageTemplate.propTypes = {
  title: PropTypes.string
};

const Controls = ({types}) => 
<ControlWrap className="column is-one-fifth">
  <ControlBox>
    <Control>
      <h6 style={{display: "flex", padding: "5px 10px"}}>Galleries<a style={{marginLeft:"auto"}} href="/" className="clear">Clear</a></h6>
      {types.map(type => <Checkbox key={slugify(type)} name="type" value={type} />)}
      <br />
      <Button value={"Select"} />
    </Control>    
  </ControlBox>  
</ControlWrap>;

const gallery = ({ data, location }) => {
  // aggregate data for controls
  const types = aggregate(data.event.edges, {column:"type", property:"label"});

  return <Layout>
    <HeroSmall data={data.events.edges[0].node.frontmatter} />
    <Content data={data.events.edges[0].node.frontmatter} />
    <Background>
      <Wrap className="columns">
        <Controls types={types} />
        <div className="column is-four-fifth">
          <Grid data={data.event.edges.map(edge => {
            // want first event image, not event page hero to show in listing grid
            edge.node.frontmatter.image = edge.node.frontmatter.images[0].image.publicURL;
            edge.node.frontmatter.cardDescription = <span class="event">{edge.node.frontmatter.location}<br /><span class="date">{edge.node.frontmatter.date}</span></span>;
            return edge;
          })} slug={"events"} footer={false} hideStats={true} location={location} hideCaption={true} />
        </div>
      </Wrap>
    </Background>  
    <Footer />
  </Layout>
};

gallery.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default gallery;

export const eventsQuery = graphql`
 {
  events:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "events"}}}) {
    edges {
      node {
        frontmatter {
          title
          image{
            childImageSharp{
              fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            description
          }
        }
      }
    }
    event:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "event"}}}){
    edges{
       node{
        frontmatter{
          title
          image{
            childImageSharp{
              fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
              }
            }
          }
          location
          date
          type {
            label
          }
          images {
            image {
              publicURL
            }
          }
        }
        fields {
          slug
        }
       }
    }
    }
  }
`;
