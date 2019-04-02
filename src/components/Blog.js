import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Course } from "../components/Featured";
import styled from "styled-components";
import PropTypes from "prop-types";

const Cards = styled.section`
  justify-content: center;

  & .content {
    text-transform: uppercase;
    font-size: 0.9rem;
    font-weight: bold;
    letter-spacing: 0;
    margin: 0 20px;
    text-align: center;
  }

  & .content .date {
    display: none;
  }
`;

const Header = styled.section`
  color: #1d8649;
  /* Text style for "LET’S TALK" */
  font-family: "Gotham Light";
  font-weight: 300;
  font-size: 30px;
  text-transform: uppercase;
  text-align: center;
`;

const HeaderStrong = styled.strong`
  color: #1d8649;
  font-family: "Gotham Black";
  font-weight: 900;
`;

const ViewAllButton = styled.button`
  display: block !important;
  margin: 20px auto 44px auto;
  background: none;
  color: #1d8649;
  font-weight: 300;
  text-transform: uppercase;
  border-color: #1d8649;
  padding: 0 30px !important;
`;

const Columns = styled.div`
  justify-content: center;
`;

const Card = ({ edge }) => {
  return (
    <Course
      data={{
        frontmatter: {
          featuredDetails: {
            image: edge.node.frontmatter.image,
            name: edge.node.frontmatter.title
          },
          stats: edge.node.frontmatter.stats,
          city: edge.node.frontmatter.city,
          country: edge.node.frontmatter.country,
          cardDescription: edge.node.frontmatter.cardDescription
        },
        fields: {
          slug: edge.node.fields.slug
        }
      }}
      footer={false}
      hideStats={true}
      hideCaption={true}
      restoreWindow={true}
    />
  );
};

export const Blog = ({ data, headline }) => {
  return (
    <Cards className="container">
      <Header>
        {headline.heading1}
        <br />
        <HeaderStrong>{headline.heading2}</HeaderStrong>
      </Header>
      <br />
      <Columns className="columns">
        {data.edges.map(edge => {
          if (
            typeof edge.node.frontmatter.logo === "undefined" ||
            edge.node.frontmatter.logo === null
          ) {
            edge.node.frontmatter.image =
              edge.node.frontmatter.images[0].image.publicURL;
          } else {
            edge.node.frontmatter.image = edge.node.frontmatter.logo.publicURL;
          }
          edge.node.frontmatter.cardDescription = (
            <span className="event">
              {edge.node.frontmatter.location}
              <br />
              <span className="date">{edge.node.frontmatter.date}</span>
            </span>
          );
          return <Card key={edge.node.frontmatter.title} edge={edge} />;
        })}
      </Columns>
      <ViewAllButton
        className="button is-rounded"
        onClick={() => (window.location = "/events")}
      >
        View All
      </ViewAllButton>
    </Cards>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "event" } } }
          limit: 4
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                image {
                  childImageSharp {
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
                logo {
                  publicURL
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Blog data={data.allMarkdownRemark} {...props} />}
  />
);

Blog.propTypes = {
  data: PropTypes.object.isRequired
};
