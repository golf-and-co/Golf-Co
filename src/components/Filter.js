import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import Select from '../utilities/Select'

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
`;

const Filter = ({data}) => <div>
    <Wrap>
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
            <a class="button is-success is-rounded">Apply</a>
        </Box>
    </Wrap>
    <br />
    <Wrap>
        <Box>
            <h6>Hotel Type <a className="clear" href="#">Clear</a></h6>
            <div>
              <input class="is-checkradio is-success" id="fiveStar" type="checkbox" name="fiveStar"/>
              <label class="checkbox" for="fiveStar">5 Star</label>
            </div>           
            <div>
              <input class="is-checkradio is-success" id="fourStar" type="checkbox" name="fourStar"/>
              <label class="checkbox" for="fourStar">4 Star</label>
            </div>
            <div>
              <input class="is-checkradio is-success" id="threeStar" type="checkbox" name="threeStar"/>
              <label class="checkbox" for="threeStar">3 Star</label>
            </div>
            <a class="button is-success is-rounded">Apply</a>
        </Box>
    </Wrap>
    <br />
    <Wrap>
        <Box>
            <h6>Duration <a className="clear" href="#">Clear</a></h6>
            <div>
              <input class="is-checkradio is-success" id="sevenDays" type="checkbox" name="sevenDays"/>
              <label class="checkbox" for="sevenDays">7 Days or More</label>
            </div>           
            <div>
              <input class="is-checkradio is-success" id="fiveDays" type="checkbox" name="fiveDays"/>
              <label class="checkbox" for="fiveDays">5-7 Days</label>
            </div>
            <div>
              <input class="is-checkradio is-success" id="threeDays" type="checkbox" name="threeDays"/>
              <label class="checkbox" for="threeDays">3-5 Days</label>
            </div>
            <a class="button is-success is-rounded">Apply</a>
        </Box>
    </Wrap>
</div>

Filter.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Filter;