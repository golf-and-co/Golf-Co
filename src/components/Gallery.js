import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { v4 } from 'uuid'

const settings = {
  dots: true,
  adaptiveHeight: true,
  responsive: [
    {
        breakpoint: 980, // tablet breakpoint
        settings: {
            slidesToShow: 5,
            slidesToScroll: 2
        }
    },
    {
        breakpoint: 480, // mobile breakpoint
        settings: {
            slidesToShow: 3,
            slidesToScroll: 2
        }
    }
  ]
}

//padding: 0 115px;
const Background = styled.div`
  background-color: #f6f9f2;
  padding: 0 74px;
  display: block !important;

  @media(max-width:760px) {
    padding: 0 25px !important;
  }
`

const SliderWrap = styled(Slider)`
  width: 100%
  margin: 0 auto;
  padding-bottom: 150px !important;

  .slick-dots {
    bottom: auto !important
  }

  .slick-prev {
    z-index: 2;
    left: 35px;
    top: 42%;
  }

  .slick-next {
    z-index: 2;
    right: 35px;
    top: 42%;
  }

  @media(max-width:760px) {

  }
`

const About = styled.h1`
  color: #1d8649;
  font-family: 'Gotham Book';
  font-size: 40px;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 2rem;
    margin: 20px auto;
    text-align:center;
  }
`

const Slide = styled.div`
  padding: 0 10px;
`

const Gallery = ({ data }) => {
  if(data.gallery[0].image === null)
    return <div />;

  return (
    <Background className="columns">
      <About className="column">Gallery</About>
      <SliderWrap className="column" {...settings}>
        {data.gallery.map(exhibit => (
          <Slide key={v4()}>
            <img
              alt={exhibit.category}
              src={exhibit.image.childImageSharp.fluid.src}
            />
          </Slide>
        ))}
      </SliderWrap>

    </Background>
  )
}
export default Gallery

Gallery.propTypes = {
  data: PropTypes.object.isRequired,
}
