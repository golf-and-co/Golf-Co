import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import Slider from "react-slick";

const slideCount = (7 / 1);

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: slideCount,
  slidesToScroll: 1
};

const SliderWrap = styled(Slider)`
  max-width: 640px !important;
  margin: 0 auto;

  .slick-prev::before {
    content: '❬'
  }
  
  .slick-next::before {
    content: '❭'
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
`;

const Background = ({children}) => <div>
  {children}
</div>

const Gallery = ({data}) => <Background>
  <SliderWrap {...settings}>
    <Slide>
      <h3>1</h3>
    </Slide>
    <Slide>
      <h3>2</h3>
    </Slide>
    <Slide>
      <h3>3</h3>
    </Slide>
    <Slide>
      <h3>4</h3>
    </Slide>
    <Slide>
      <h3>5</h3>
    </Slide>
    <Slide>
      <h3>6</h3>
    </Slide>
    <Slide>
      <h3>7</h3>
    </Slide>
    <Slide>
      <h3>8</h3>
    </Slide>
    <Slide>
      <h3>9</h3>
    </Slide>
    <Slide>
      <h3>10</h3>
    </Slide>
  </SliderWrap>
</Background>

export default Gallery;

Gallery.propTypes = {
  data: PropTypes.object.isRequired,
}