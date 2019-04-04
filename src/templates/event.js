import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import styled from "styled-components";
import Slider from "react-slick";
import Footer from "../components/Footer";
import { v4 } from "uuid";

const Wrap = styled.div`
  .slick-slider {
    width: 80%;
    margin: 0 auto;
    padding: 5vh 0;
  }

  .slick-slider img {
    width: 80%;
    margin: 0 auto;
  }

  .slick-track {
    display: flex;
  }
  .slick-track .slick-slide {
    display: flex;
    height: auto;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 768px) {
    p {
      padding: 0 20px;
    }
  }
`;

const galleryDetails = ({ data }) => {
  return (
    <Layout>
      <HeroSmall
        data={{
          ...data.markdownRemark.frontmatter,
          backgroundColor: "#E4ECD9",
          showTitle: false
        }}
      />
      <p
        style={{
          paddingTop: "30px",
          textAlign: "center",
          backgroundColor: "#E4ECD9",
          fontWeight: "bold",
          color: "#000"
        }}
      >
        {data.markdownRemark.frontmatter.title}
      </p>
      <p
        style={{
          textTransform: "uppercase",
          textAlign: "center",
          backgroundColor: "#E4ECD9",
          fontWeight: "bold",
          color: "#000"
        }}
      >
        {data.markdownRemark.frontmatter.date}
      </p>
      <div style={{ paddingTop: "25px", backgroundColor: "#E4ECD9" }}>
        <div className="container">
          <p style={{ color: "#000" }}>
            {data.markdownRemark.frontmatter.description}
          </p>
        </div>
      </div>
      <div style={{ paddingBottom: "200px", backgroundColor: "#E4ECD9" }}>
        <Wrap className="container">
          <Slider
            {...{
              dots: true,
              slidesToShow: parseInt(
                data.markdownRemark.frontmatter.imagesPerSlide
              ),
              slidesToScroll: parseInt(
                data.markdownRemark.frontmatter.imagesPerSlide
              ),
              infinite: true
            }}
          >
            {data.markdownRemark.frontmatter.albums.images.map(entry => {
              return (
                <div key={v4()}>
                  <img src={entry.image.publicURL} alt="Gallery" />
                </div>
              );
            })}
          </Slider>
        </Wrap>
      </div>
      <Footer />
    </Layout>
  );
};

galleryDetails.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired
    })
  })
};

export default galleryDetails;

export const galleryDetailsQuery = graphql`
  query galleryDetails($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        date
        description
        type {
          label
        }
        albums {
          images {
            image {
              publicURL
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imagesPerSlide
      }
    }
  }
`;
