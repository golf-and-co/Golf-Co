import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const MapWrap = styled.div`
  height: 100vh;
  position: relative;
  z-index: 0;

  @media (max-width: 768px) {
    margin-top: 0px;
  }

  .map__reactleaflet {
    height: 100vh;
  }
`

const CourseMap = ({ data }) => (
  <MapWrap>
    <iframe src={`https://maps.google.com/maps?q=${data.map}&z=15&output=embed`} id="courseMap" title="courseMap" style={{ width: '100%', height: '100%' }} frameBorder="0" ></iframe>
    
  </MapWrap>
)

export default CourseMap

CourseMap.propTypes = {
  data: PropTypes.object.isRequired,
}
