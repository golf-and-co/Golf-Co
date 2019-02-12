import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import Grid from '../components/Grid'

const Background = styled.section`
    padding-bottom: 200px;
    background-color: #E4ECD9;
`;

const Wrap = styled.section`
    @media (min-width: 768px) {
        width: 1110px;
        max-width: 100%;
    }
    margin: 0 auto !important;
`;

const FilterWrap = styled.div`
    section {
        justify-content: right;
    }
    @media (max-width: 768px) {
        display: none !important;
    }
`;

const Listing = ({data, side, filter, slugType}) => <Background>
    <Wrap className="columns">
        <FilterWrap className="column is-one-fifth">
            {side}
        </FilterWrap>
        <div className="column is-four-fifth">
            <Grid data={data} filter={filter} slugType={slugType}/>
        </div>
    </Wrap>
</Background>

Listing.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Listing;