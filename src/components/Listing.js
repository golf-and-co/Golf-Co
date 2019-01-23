import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import Filter from '../components/Filter'
import Grid from '../components/Grid'

const Background = styled.section`
    padding-bottom: 200px;
    background-color: #E4ECD9;
`;

const Wrap = styled.section`
    width: 1110px;
    margin: 0 auto !important;
`;

const FilterWrap = styled.div`
    section {
        justify-content: right;
    }
`

const Listing = ({data}) => <Background>
    <Wrap className="columns">
        <FilterWrap className="column is-one-fifth">
            <Filter data={data}/>
        </FilterWrap>
        <div className="column is-four-fifth">
            <Grid data={data} />
        </div>
    </Wrap>
</Background>

Listing.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Listing;