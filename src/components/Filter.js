import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import Select from '../utilities/Select'

const Wrap = styled.section`
    display: flex;
  
    h6 {
        color: #000;
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: bold;
        margin: 15px;
    }

    .select {
        font-size: 0.8rem;
        margin: 10px 15px;
    }
    
    .select:not(.is-multiple):not(.is-loading)::after {
        border-color: #AAA;
    }

    select {
        width: 170px;
    }
`;

const Box = styled.section`
    background-color: #FFF;
    width: 260px;
    height:215px;
    justify-content:right;
`;

const Filter = ({data}) => <Wrap>
    <Box>
        <h6>Location</h6>
        <div class="select is-rounded">
            <select>
                <option>UAE</option>
            </select>
        </div>
        <br />
        <div class="select is-rounded">
            <select>
                <option>All Cities</option>
            </select>
        </div>
    </Box>
</Wrap>

Filter.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Filter;