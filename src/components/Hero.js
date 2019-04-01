import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";
import PropTypes from "prop-types";
import logo from "../img/logo.svg";

const Background = styled.div`
  background: #f6f9f2;
  padding-bottom: 10px;
  text-align: center;
  position: relative;
`;

const HeroWrap = styled.section`
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #f6f9f2;
  max-width: none;
  border-bottom-right-radius: 50% 10%;
  border-bottom-left-radius: 50% 10%;
`;
const Heading = styled.h1`
  margin-top: 20vh !important;
  margin-bottom: 10vh !important;
  text-align: center;
  color: white !important;
  font-family: "Gotham Light";
  text-transform: uppercase;
  font-size: 15px !important;
  font-weight: 300;

  @media (min-width: 768px) {
    font-size: 30px !important;
  }
`;

const HeadingStrong = styled.strong`
  font-size: 30px !important;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 60px !important;
    font-weight: 700;
  }
`;

const Logo = styled(Link)`
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.01) !important;
  padding-top: 20px !important;
  :hover {
    background-color: rgba(0, 0, 0, 0.01) !important;
    color: #fff !important;
  }
`;

const Weather = styled.div`
  font-size: 16px;
  font-family: "Gotham Book";
  text-align: left;
  margin-left: 20px;
  color: white;
  width: 20%;
  position: absolute;
  bottom: 75px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
    bottom: 20px;
    text-align: center;

    .weatherLead {
      display: none;
    }
  }
`;

function getCurrentWeather(weather) {
  const utcoffsetMinutes = weather.edges[0].node.xmlChildren.find(
    element => element.name === "timezone"
  ).attributes.utcoffsetMinutes;

  const currentDate = new Date();
  const currentUTCTime = new Date(
    new Date().getTime() +
      utcoffsetMinutes * 60 * 1000 +
      currentDate.getTimezoneOffset() * 60 * 1000
  );
  //find weather correct for our time
  let currentWeather = weather.edges[1].node.xmlChildren[0].children.find(
    weather => {
      const from = new Date(weather.attributes.from);
      const to = new Date(weather.attributes.to);
      if (currentUTCTime >= from && currentUTCTime <= to) return true;
    }
  );

  //if weather not found, then assume first is correct
  if (!currentWeather) {
    currentWeather = weather.edges[1].node.xmlChildren[0].children[0];
    console.log("Didn't find correct weather forecast. Setting first one.");
  }

  const celsiusDegrees = currentWeather.children.find(
    weatherElement => weatherElement.name === "temperature"
  ).attributes.value;

  return {
    celsius: celsiusDegrees,
    fahrenheit: parseInt(celsiusDegrees * 1.8 + 32)
  };
}

const Hero = ({ data }) => {
  const homepage = data.homepage.edges[0].node.frontmatter;
  const weather = getCurrentWeather(data.weather);

  return (
    <Background>
      <HeroWrap
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.0) ), url(${
            !!homepage
              ? homepage.image.childImageSharp.fluid.src
              : homepage.image
          })`
        }}
      >
        <Weather>
          <div>
            <span className="weatherLead">Current temperature in </span>Dubai
          </div>
          <div>
            {weather.celsius} &#x2103; | {weather.fahrenheit} &#x2109;
          </div>
        </Weather>
        <div className="container content is-fluid">
          <div className="column is-10 is-offset-1">
            <Logo to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="GolfAndCo" />
            </Logo>
            <Heading className="title">
              {homepage.heading1}
              <br />
              <HeadingStrong>{homepage.heading2}</HeadingStrong>
            </Heading>
          </div>
        </div>
      </HeroWrap>
    </Background>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      {
        homepage: allMarkdownRemark(
          filter: { frontmatter: { title: { eq: "Home" } } }
        ) {
          edges {
            node {
              frontmatter {
                heading1
                heading2
                image {
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
        weather: allForecastXml(
          filter: { name: { in: ["location", "forecast"] } }
        ) {
          edges {
            node {
              xmlChildren {
                name
                attributes {
                  utcoffsetMinutes
                }
                children {
                  children {
                    name
                  }
                  name
                  attributes {
                    from
                    to
                    period
                  }
                  children {
                    name
                    attributes {
                      number
                      numberEx
                      name
                      var
                      value
                      deg
                      code
                      mps
                      unit
                    }
                  }
                }
              }
            }
          }
        }
        courses: allMarkdownRemark(
          filter: {
            frontmatter: {
              templateKey: { eq: "course" }
              isFeatured: { eq: true }
            }
          }
          limit: 4
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                isFeatured
                title
                city
                region
                country
                description
                featuredDetails {
                  image {
                    childImageSharp {
                      fluid(maxWidth: 2048, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  name
                  description
                }
                stats {
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
      }
    `}
    render={data => <Hero data={data} {...props} />}
  />
);

Hero.propTypes = {
  data: PropTypes.object.isRequired
};
