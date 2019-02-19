import React, {useState} from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'
import queryString from 'query-string';

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

    & > .select {
        margin: 10px 15px;
    }
`
const Item = styled.div`
    padding-left: 10px;
`;

const Checkbox = styled.input`
    margin-top: 4px;
    z-index: 10;
    cursor: pointer;
`;

const Label = styled.label`
    cursor: default;
`;

//@TODO: this is a mess. Start using redux or react hooks

// select: change secondary dropdown, and hide
const select = (field, data, label) => {
    const primary = document.querySelector(`#`+field.main+`-primary`);
    let options = [];
    if (primary.value === '--label--') {
        options = data.secondary;
    } else {
        // lookup value from indexed array, if all, use all
        options = Array.from(data.nested.get(primary.value).keys());
    }

    // set values
    document.querySelector(`#`+field.main+`-secondary`).innerHTML = `<option value="--label--">${label.secondary}</option>`+options.map(option => {
        return `<option>${option}</option>`
    }).join("");
    // filter select
}




export const Flat = ({label, field, data, click}) => {
    return <Wrap>
        <Box>
            <h6 style={{display: "flex", padding: "5px 10px"}}>{label} <a style={{marginLeft:"auto"}} href="/" className="clear">Clear</a></h6>
            {data.filter(
                value => value !== "null"
            ).map(value => 
                <Item key={v4()}>
                    <Checkbox 
                        className="is-checkradio is-success" 
                        onClick={click} 
                        data-field={field} 
                        id={`${field}-${value.replace(/ /g, "")}`} 
                        type="checkbox" 
                        name={`${field}-${value.replace(/ /g, "")}`}  
                        />
                    <Label className="checkbox" htmlFor={value.replace(/ /g, "")}>{value}</Label>
                </Item>
            )}
            <a href="/" className="button is-success is-rounded">Apply</a>
        </Box>
    </Wrap>
};

export const Nested  = ({label, field, data, location, hide}) => {   
    let defaultValue;
    const [nested, setNested] = useState(data.secondary.map(row => <option key={v4()} value={row}>{row}</option>));

    const change = (event) => {
        setNested(Array.from(data.nested.get(event.target.value).keys()).map(row => <option key={v4()} value={row}>{row}</option>));
    }

    if(typeof location !== 'undefined') {
        defaultValue = queryString.parse(location.location.search).city;
    }

    return <Wrap>
    <Box>
        <h6>{label.main}</h6>
        <div className="select is-rounded">
            <select id={`${field.main}-primary`} data-main={field.main} data-field={field.primary} onChange={(event) => change(event)} className="select filter">
                <option value="--label--">{label.primary}</option>
                {data.primary.map(row => <option key={v4()} value={row}>{row}</option>)}
            </select>
        </div>
        <br />
        <div className="select is-rounded">
            <select defaultValue={defaultValue} id={`${field.main}-secondary`} data-main={field.main} data-field={field.secondary} onChange={() => setNested()} className="select filter">
                <option value="--label--">{label.secondary}</option>
                {nested}
            </select>
        </div>
        <a href="/" className="button is-success is-rounded">Apply</a>
    </Box>
    </Wrap>
};

/*const Filter = ({data, filter}) => <div>
    <Nested label={label} data={{primary:countries, secondary:cities}} />
    <br />
    <Flat data={filters.hotelType} label="Hotel Type" />
    <br />
    <Flat data={filters.duration} label="Duration" />
</div>;

Filter.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Filter*/
