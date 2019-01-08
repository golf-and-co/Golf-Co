import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import Slider from "react-slick";

const slideCount = (7 / 1);

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: slideCount,
  slidesToScroll: 3
};

const Background = styled.div`
  background-repeat: none;
  background-size: cover;
`;

const SliderWrap = styled(Slider)`
  max-width: 640px !important;
  margin: 0 auto;
  height:50vh;
  padding-top: calc(50vh - 32px);

  .slick-slide {
    background: #FFF;
  }

  .slick-arrow {
    top: 50vh;
    background-color: #FFF;
    width: 64px;
    height: 64px;
  }

  .slick-next:focus, .slick-next:hover, .slick-prev:focus, .slick-prev:hover {
    background: #FFF !important;
  }

  .slick-prev {
    left: -64px;
    border-radius: 64px 0 0 64px;
  }
  
  .slick-next {
    right: -64px;
    border-radius: 0 64px 64px 0;
  }

  .slick-prev::before {
    content: '❬';
  }
  
  .slick-next::before {
    content: '❭';
  }
  
  .slick-prev::before, .slick-next::before {
    color: #91bc9b !important;
    border-radius: 20px;
    border: 1px solid #417d4f;
    padding: 4px 8px 10px;
    height: 35px;
    font-stretch: expanded;
    font-size: 12px;
  }  
`;

const Slide = styled.div`
  color: #000;
  width: 64px !important;
  height: 64px;
  background-color: #d8d8d8;
  text-align: center;
  line-height: 64px;
  vertical-align: center;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
  margin: 0 16px;
  cursor: pointer;

  img {
    height: 64px;
  }
`;

const Gallery = ({data}) => { 
  
  console.log(data);

  return <Background style={{
    backgroundImage: `url(${
      !!data.gallery[0].image.childImageSharp
        ? data.gallery[0].image.childImageSharp.fluid.src
        : data.gallery[0].image
    })`,
  }}>

  <SliderWrap {...settings}>
    {data.gallery.map(exhibit => <Slide><img src={exhibit.image.childImageSharp.fluid.src} /></Slide>)}
  </SliderWrap>
</Background>
};
export default Gallery;

Gallery.propTypes = {
  data: PropTypes.object.isRequired,
}