import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Filter from '../components/Filter'
import Grid from '../components/Grid'

const Wrap = styled.section`
  display: flex;
`

const Listing = ({ data }) => (
  <Wrap>
    <Filter data={data} />
    <Grid data={data} />
  </Wrap>
)

Listing.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Listing
