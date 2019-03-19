import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { v4 } from 'uuid'

const settings = {
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000
}

const Background = styled.div`
  background-color: #f6f9f2;
  padding: 0 74px;
  display: block !important;

  @media(max-width:768px) {
    padding: 0 25px !important;
  }
`

const SliderWrap = styled(Slider)`
  padding-bottom: 150px !important;

  .slick-slide {
    height: 80vh; 
    line-height: 80vh;
    vertical-align: middle;

    @media(max-width:768px) {
      height: 50vh;
      line-height: 50vh;
      vertical-align: middle;
    }
  }

  .slick-slide img {
    line-height: 80vh;
    vertical-align: middle;

    @media(max-width:768px) {
      line-height: 50vh;
      vertical-align: middle;
    }
  }

  .slick-dots {
    bottom: auto !important
  }

  .slick-arrow {
    z-index: 2;
  }

  @media(max-width:768px) {
    padding-bottom: 90px !important;
  }
`

const Header = styled.h1`
  color: #1d8649;
  font-family: 'Gotham Book';
  font-size: 40px;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 2rem;
    padding: 20px !important;
    text-align:center;
  }
`

const Gallery = ({ data }) => {
  if(data.gallery[0].image === null)
    return <div />;

  return (
    <Background>
      <Header className="column">Gallery</Header>
      <SliderWrap className="column" {...settings}>
        {data.gallery.map(exhibit => (
            <img
              key={v4()}
              alt={exhibit.category}
              src={exhibit.image.childImageSharp.fluid.src}
            />
        ))}
      </SliderWrap>

    </Background>
  )
}
export default Gallery

Gallery.propTypes = {
  data: PropTypes.object.isRequired,
}
