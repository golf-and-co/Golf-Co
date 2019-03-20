import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import styled from "styled-components"
import HeroSmall from "../components/HeroSmall";
import Content from "../components/Content";
import {aggregate} from "../components/Control/Aggregate";
import {Checkbox} from "../components/Control/Checkbox";
import {Select} from "../components/Control/Select";
import {Button} from "../components/Control/Button";
import {Grid} from '../components/Grid'
import slugify from "slugify";
import Footer from "../components/Footer";

const Background = styled.section`
    padding-bottom: 200px;
    background-color: #E4ECD9;
`;

const Wrap = styled.section`
    @media (min-width: 768px) {
        width: 1110px;
        max-width: 100%;
    }
    margin: 0 auto !important;
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
        margin: 15px 15px 25px 5px;
    }
    .select {
        font-size: 0.8rem;
    }

    .select:not(.is-multiple):not(.is-loading)::after {
        border-color: #AAA;
    }
    select {
        width: 170px;
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
        left: 12px;
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

const Controls = ({countries, cities, hotelType, duration, rounds}) => 
<ControlWrap className="column is-one-fifth">
  <ControlBox>
    <Control>
      <h6 style={{display: "flex", padding: "5px 10px"}}>Location <a style={{marginLeft:"auto"}} href="/" className="clear">Clear</a></h6>
      <Select name="country">
        {countries.map(country => <option key={slugify(country)} value={country}>{country}</option>)}
      </Select>
      <br />
      <Select name="city" parent="country">
        {cities.map(city => <option key={slugify(city.value)} value={city.value} data-country={city.parent}>{city.value}</option>)}
      </Select>
      <Button value={"Select"} />
    </Control>
  </ControlBox>
  <br />
  <ControlBox>
    <Control>
      <h6 style={{display: "flex", padding: "5px 10px"}}>Hotel Type <a style={{marginLeft:"auto"}} href="/" className="clear">Clear</a></h6>
      {hotelType.map(type => <Checkbox key={slugify(type)} name="courseType" value={type} />)}
      <br />
      <Button value={"Select"} />
    </Control>    
  </ControlBox>  
  <br />
  <ControlBox>
    <Control>
      <h6 style={{display: "flex", padding: "5px 10px"}}>Duration <a style={{marginLeft:"auto"}} href="/" className="clear">Clear</a></h6>
      {duration.map(amount => <Checkbox key={slugify(amount)} name="holes" value={amount} />)}
      <br />
      <Button value={"Select"} />
    </Control>    
  </ControlBox> 
  <br />
  <ControlBox>
    <Control>
      <h6 style={{display: "flex", padding: "5px 10px"}}>Rounds <a style={{marginLeft:"auto"}} href="/" className="clear">Clear</a></h6>
      {rounds.map(round => <Checkbox key={slugify(round)} name="rounds" value={round} />)}
      <br />
      <Button value={"Select"} />
    </Control>    
  </ControlBox> 
</ControlWrap>

const packageDetails = ({ data, location }) => {  
  // aggregate data for controls
  const countries = aggregate(data.packages.edges, "country");
  const cities = aggregate(data.packages.edges, {parent:"country", child:"city"});
  const hotelType = aggregate(data.packages.edges, "hotelType");
  const duration = aggregate(data.packages.edges, "duration");
  const rounds = aggregate(data.packages.edges, "rounds");
  
  return <Layout>
    <HeroSmall data={data.packageListingPage.edges[0].node.frontmatter} />
    <Content data={data.packageListingPage.edges[0].node.frontmatter} />
    <Background>
      <Wrap className="columns">
        <Controls countries={countries} cities={cities} hotelType={hotelType} duration={duration} rounds={rounds} />
        <div className="column is-four-fifth">
          <Grid data={data.packages.edges} slug={"packages"} footer={true} hideStats={false} location={location} />
        </div>
      </Wrap>
    </Background>  
    <Footer />
  </Layout>
};

packageDetails.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default packageDetails;

export const packageDetailsQuery = graphql`
 {
  packageListingPage:allMarkdownRemark(filter: {frontmatter: {title: {eq: "Golf Packages"}}}) {
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
    packages:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "package"} searchable:{eq:true} }}){
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
          stats{
            icon {
              publicURL
            }
            label
            value
          }
          city
          country
          hotelType
          duration
          rounds
        }
        fields {
          slug
        }
       }
    }
    }
  }
`;
