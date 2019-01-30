import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrap = styled.section`
  display: flex;
`

const Box = styled.section`
  background-color: #fff;
`

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
            <a href="/" class="button is-success is-rounded">Apply</a>
        </Box>
    </Wrap>
    <br />
    <Wrap>
        <Box>
            <h6>Hotel Type <a href="/" className="clear">Clear</a></h6>
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
            <a href="/" class="button is-success is-rounded">Apply</a>
        </Box>
    </Wrap>
    <br />
    <Wrap>
        <Box>
            <h6>Duration <a href="/" className="clear">Clear</a></h6>
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
            <a href="/" class="button is-success is-rounded">Apply</a>
        </Box>
    </Wrap>
</div>

Filter.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Filter
