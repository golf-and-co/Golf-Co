import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrap = styled.section`
    display: flex;
    @media (max-width: 768px) {
        display: none;
        background-size: inherit;
    }

    h6 {
        color: #000;
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: bold;
        margin: 15px 15px 25px 15px;
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
    a.button.is-success {
        background-color: #1d8649;
        font-size: 14px;
        margin: 15px auto;
        display: block;
        width: 97px;
    }
    a.clear {
        color: #333;
        font-size: 0.6rem;
        text-transform: none;
        text-align: right;
        margin-left: 40px;
    }
    .is-checkradio[type="checkbox"] + label {
        color: #000;
        font-size: 0.8rem;
        margin-left: 15px;
    }
    .is-checkradio[type="checkbox"] + label::before, .is-checkradio[type="checkbox"] + label::before {
        width: 14px;
        height: 14px;
        top: 4px;
        border: 1px solid #cfddbb;
        background-color: #f6f9f2;
    }
    .is-checkradio[type="checkbox"] + label::after, .is-checkradio[type="checkbox"] + label::after {
        top: 5px;
        left: 5px;
        width: 6px;
        height: 8px;
    }
    .is-checkradio[type="checkbox"].is-success:checked + label::after, .is-checkradio[type="checkbox"].is-success:checked + label::after {
        border-color: #1d8649 !important;
    }

    br {
        line-height: 1;
    }
`;

const Box = styled.section`
    background-color: #FFF;
    width: 260px;
    height:215px;
    justify-content:right;
`

const Flat = ({label, data}) => <Wrap>
    <Box>
        <h6>{label} <a href="/" className="clear">Clear</a></h6>
        {data.map(filter => <div>
        <input className="is-checkradio is-success" id={filter.replace(/ /g, "")} type="checkbox" name={filter.replace(/ /g, "")}/>
        <label className="checkbox" htmlFor={filter.replace(/ /g, "")}>{filter}</label>
        </div>)}
        <a href="/" className="button is-success is-rounded">Apply</a>
    </Box>
</Wrap>;

const Filter = ({data, filter}) => {
console.log(data);

const filters = {
    location: {'UAE':['Dubia', 'Abu Dhabi'], 'Qatar':["Doha"]},
    hotelType: ["5 Star", "4 Star", "3 Star"],
    duration: ["7 Days or More", "5-7 Days", "3-5 Days"],
};

data.edges.forEach(edge =>{
    filter.forEach(value => {
        // normalize, list of values to filter on
        // filters.push({value: edge.node.frontmatter[value];
    });
});

const countries = Object.keys(filters.location);
let cities = [];
countries.forEach(country => {
    cities = cities.concat(filters.location[country]);
});

return <div>
    <Wrap>
        <Box>
            <h6>Location</h6>
            <div className="select is-rounded">
                <select>
                    <option>All Countries</option>
                    {countries.map(country => <option>{country}</option>)}
                </select>
            </div>
            <br />
            <div className="select is-rounded">
                <select>
                    <option>All Cities</option>
                    {cities.map(city => <option>{city}</option>)}
                </select>
            </div>
            <a href="/" className="button is-success is-rounded">Apply</a>
        </Box>
    </Wrap>
    <br />
    <Flat data={filters.hotelType} label="Hotel Type" />
    <br />
    <Flat data={filters.duration} label="Duration" />
</div>
}

Filter.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Filter
