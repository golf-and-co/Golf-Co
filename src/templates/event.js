import React, { useState } from "react";
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
    align-items: baseline;
    justify-content: center;
  }

  @media (min-width: 768px) {
    p {
      padding: 0 20px;
    }

    .slick-track .slick-slide {
      align-items: baseline;
    }
  }
`;

const galleryDetails = ({ data }) => {
  const [gallery, setGallery] = useState(false);
  let displayGallery;
  let displayAlbums;

  if (!!gallery) {
    displayGallery = "block";
    displayAlbums = "none";
  } else {
    displayGallery = "none";
    displayAlbums = "block";
  }

  return (
    <Layout>
      <HeroSmall
        data={{
          ...data.markdownRemark.frontmatter,
          backgroundColor: "#E4ECD9",
          showTitle: false
        }}
      />
      <div style={{ padding: "0 10px", backgroundColor: "#E4ECD9" }}>
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
            <div style={{ display: displayGallery }}>
              <button
                onClick={() => setGallery(false)}
                className="is-rounded "
                style={{
                  backgroundColor: "#1d8649",
                  color: "#ffffff",
                  fontFamily: "Gotham Book",
                  fontSize: "1rem",
                  fontWeight: "300",
                  textTransform: "uppercase",
                  position: "relative",
                  padding: "5px 10px",
                  margin: "10px 0px",
                  letterSpacing: ".1px",
                  textAlign: "center",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Back
              </button>
              {data.markdownRemark.frontmatter.albums.map(entry => {
                let displayValue;
                if (gallery === entry.name) {
                  displayValue = "block";
                } else {
                  displayValue = "none";
                }

                if (!entry.images) {
                  entry.images = [];
                }

                return (
                  <div style={{ display: displayValue }}>
                    <Slider
                      key={v4()}
                      {...{
                        dots: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 2000
                      }}
                    >
                      {entry.images.map(image => (
                        <img
                          key={v4()}
                          alt={entry.name}
                          src={image.image.replace("../../../static", "")}
                        />
                      ))}
                    </Slider>
                  </div>
                );
              })}
            </div>

            <div style={{ display: displayAlbums }}>
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
                {data.markdownRemark.frontmatter.albums.map(entry => {
                  return (
                    <div key={v4()} onClick={() => setGallery(entry.name)}>
                      <img
                        style={{ cursor: "pointer" }}
                        src={entry.images[0].image.replace(
                          "../../../static",
                          ""
                        )}
                        alt="Gallery"
                      />
                      <div style={{ color: "#000", textAlign: "center" }}>
                        {entry.date}
                      </div>
                      <div style={{ color: "#555", textAlign: "center" }}>
                        {entry.name}
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </Wrap>
        </div>
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
          name
          date
          images {
            image
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
