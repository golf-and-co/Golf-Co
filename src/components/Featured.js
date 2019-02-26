import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'
import Select from '../utilities/Select'
import { v4 } from 'uuid'
import {group, rollup} from "d3-array";
import Stats from '../components/Stats';

// @TODO: fix crosscut here, move to card component
const Wrap = styled.section`
  background-color: #cfddbb;
  display:block;
  justify-content: center;
  border-top-right-radius: 50% 10%;
  border-top-left-radius: 50% 10%;
  margin-top:-160px;

  @media (max-width: 768px) {
    border-radius: 35% 35% 0 0;
    width: 200%;
    margin-left: -50%;
  }

  .cardContentHover {
    height: 315px;
    top: -215px
  }

  padding-bottom: 60px;
`;

const Heading = styled.h3`
  color: #1d8649 !important;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 300;
  text-align:center;
  padding: 50px 0 0;
  line-height: 1 !important;
`;
const HeadingTag = styled.strong`
  font-weight: bold;
  font-family: "Gotham Bold";
`;

const CardLink = styled(Link)`
    margin: 0 auto;
`;

const Card = styled.div`
  width: 260px;
  height: 315px;
  border-radius: 6px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    margin: 0px auto 40px auto;
  }

  &.cardFooter {
    height: 395px;
  }

  &.cardFooter .cardContent {
    height: 180px;
  }

  &.cardFooter .content {
    font-size: 16px;
    margin-left: 10px;
    height: 54px;
  }
`;

const CardImageWrap = styled.div`
  height: 216px;
  position: relative;
  z-index: 0;
`;

const CardImage = styled.img`
  height:216px !important;
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

const CardContentTag = styled.div`
  color: #9b9b9b;
  font-size: 14px;
  margin-top: 9px;
`;

const CardCaption = styled.div`
  width: 80px;
  height: 20px;
  border-radius: 8px;
  background-color: #1d8649;
  color: #ffffff;
  font-family: "Gotham Book";
  font-size: .7rem;
  font-weight: 300;
  text-transform: uppercase;
  position: relative;
  z-index: 10;
  top: -185px;
  left: 10px;
  line-height: 1.1rem;
  letter-spacing: .1px;
  text-align:center;
}`;

const Button = styled.a`
    display: block !important;
    margin: 50px auto 0px auto;
    background:none !important;
    color: #1d8649 !important;
    font-weight: 300;
    text-transform: uppercase;
    border-color: #1d8649 !important;
    width: 300px;
`;

const ViewCourseButton = styled.a`
  font-family: 'Gotham Book';
  vertical-align: middle !important;
  margin: auto 10px;
  width: 200px;
  height: 50px !important;
  font-size: 16px;
  font-weight: 700;
  border: none !important;
  background-color: #18438b !important;

  @media (max-width: 768px) {
    position: absolute !important;
    top: 75px;
    left: calc(50% - 100px);
  }
`

const Rounds = styled.div`
    position: absolute;
    z-index: 10000;
    margin: -10px 106px;
    

    .is-rounded {
        background: green;
        border-radius: 20px;
        height: 40px;
        width: 40px;
        text-align: center;
        font-size: 1rem;
        color: #FFF;
        padding: 10px;
        margin-left:5px;
    }

    label {
        color: #000000;
        font-size: 12px;
        font-style: normal;
        font-stretch: normal;
        font-weight: 400;
        text-transform: uppercase;
    }
`;

const Search = styled.aside`
  margin: 0 auto;
  line-height: 90px;
  text-align: center;
  vertical-align: middle !important;
  position: relative;

  @media (min-width: 768px) {
    width: 640px;
    height: 90px;
  }

  @media (max-width: 768px) {
    max-width: 340px;
  }
`

// @TODO: use refs
const courseMouseEnter = (data) => {
    document.querySelector(`#${data.fields.slug.replace(/\//g,'')} .cardContent`).className +=' cardContentHover';
}

const courseMouseExit = (data) => {
    let featured = document.querySelector(`#${data.fields.slug.replace(/\//g,'')} .cardContent`);
    featured.className = featured.className.replace(/ cardContentHover/g, '');
}

// @TODO: refactor, need better properties, start by grouping in a decorator, pass a styled component
export const Course = ({data, footer, hideStats, location}) => {
    
    
    const mouseEnter = () => {
        if(!footer) {
            courseMouseEnter(data);
        }
    }

    const mouseLeave = () => {
        if(!footer) {
            courseMouseExit(data)
        }
    }

    const classes = () => {
        if(footer) {
            return "card cardFooter";
        } else {
            return "card";
        }
    }

    const rounds = () => {
        if(data.fields.rounds > 0) {
            let roundsLabel = 'Rounds';
            if(data.fields.rounds === "1") {
                roundsLabel = 'Round';
            }
            return <Rounds>
                <div className="is-rounded">{data.fields.rounds}</div>
                <label>{roundsLabel}</label>
            </Rounds>
        }
    }

    return <CardLink to={data.fields.slug} className="is-quarter">
        <Card id={data.fields.slug.replace(/\//g,'')} className={classes()} onMouseEnter={() => mouseEnter()} onMouseLeave={() => mouseLeave()}>
            <CardImageWrap className="cardImage">
            <figure className="image is-4by3">
                <CardImage src={
                !!data.frontmatter.featuredDetails.image.childImageSharp
                    ? data.frontmatter.featuredDetails.image.childImageSharp.fluid.src
                    : data.frontmatter.featuredDetails.image
                } alt="Placeholder" />
            </figure>
            <CardCaption>{data.frontmatter.city}</CardCaption>
            </CardImageWrap>
            <CardContent className="cardContent">
            <div className="content">
                {data.frontmatter.featuredDetails.name}
                <br />
                <CardContentTag>{data.frontmatter.city}, {data.frontmatter.country}</CardContentTag>
            </div>
            <Stats data={data.frontmatter} hideStats={hideStats}/>
            </CardContent>
            {rounds()}
        </Card>
    </CardLink>
};

// @TODO: get city list --> gql all courses that are featured + all, add classes for featuredCities, onClick handler, hide all, show cities and all if all.

//const selectNav = () => {
  //window.location.href = `/courses/?city=${document.querySelector('#featuredCitiesNav').value}`;
//}

const Featured = ({home, courses}) => {
  
  //let cities = Array.from((group(courses, course => {return {value:course.node.frontmatter.city}}).keys()));
  //cities.unshift({value:"--- All ---"});

  //const courses = home.courses.edges;
  let countries = Array.from(group(
    courses, 
    course => course.node.frontmatter.country
  ).keys()).map(country => { 
    return {value:country}
  });

  let cities = Array.from(group(
    courses, 
    course => course.node.frontmatter.city
  ).keys()).map(city => { 
    return {value:city}
  });

  const nested = rollup(courses, v => v.length, d => d.node.frontmatter.country, d => d.node.frontmatter.city);

  const updateCities = () => {
    const country = document.querySelector('#heroCountry').value;
    let update = [];
    if(country === '--- All ---') {
      update = Array.from(nested.get(country).keys());
    } else {
      update = cities;
    }

    document.querySelector('#heroCities').innerHTML = update.map(city => `<option>${city.value}</option>`).join(" ");
  }

  const redirect = () => {
    window.location.href = `/courses/?city=${document.querySelector('#heroCities').value}`;
  }

  return <Wrap>
      <Heading className="title">
      {home.featured.heading1}
      <br />
      <HeadingTag>{home.featured.heading2}</HeadingTag>
      <br />
      <Search>
        <Select id="heroCountry" options={countries} onChange = {() => updateCities()}/>
        <Select id="heroCities" options={cities} />
        <ViewCourseButton className="button is-link is-rounded" onClick={() => redirect()}>View Golf Course</ViewCourseButton>
      </Search>
      </Heading>
      
      <div className="container">
          <div className="columns">
              {courses.map(course => <Course key={v4()} data={course.node}  footer={false}/>)}
          </div>
      </div>

      <Button href="/courses" className="button is-rounded">{home.featuredViewAll}</Button>     
  </Wrap>;
}

export default props => (
    <StaticQuery
      query={graphql`{
  home:allMarkdownRemark(filter: {frontmatter: {title: {eq: "Home"}}}) {
    edges {
      node {
        frontmatter {
           featured {
              heading1
              heading2
          }
          featuredViewAll
          featuredBanner {
            heading1
            heading2
            image{
              childImageSharp{
                fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
            mobileImage{
              childImageSharp{
                fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
          },
          featuredFooter {
            heading1
            heading2
          },
          featuredLogo {
              image{
              childImageSharp{
                fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
  courses:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "course"}, isFeatured:{eq: true}}}, limit:4 sort:{fields:frontmatter___date, order:DESC}){
    edges{
      node{
        fields{
          slug
        }
        frontmatter{
          isFeatured
          title
          city
          region
          country
          description
          featuredDetails{
            image{
              childImageSharp{
                fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
            name
            description            
          }
          stats{
            icon {
                publicURL
            }
            label
            value
          }
        }
      }
    }
  }
}`} render={data => <Featured home={data.home.edges[0].node.frontmatter} courses={data.courses.edges} {...props} />} />
)

Course.propTypes = {
    data: PropTypes.object.isRequired,
}