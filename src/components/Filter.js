import React, {useState} from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'

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
    button.button.is-success {
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

export const Flat = ({label, field, data, handler, apply, filters}) => {
    // @TODO: need to split state updates, and apply.

    const check = (event) => {
      if(event.target.checked) {
        // target has just been checked, add
        handler({field: field, value: event.target.value, action: "ADD"});
      } else {
        // target is no longer checked, removed
        handler({field: field, value: event.target.value, action: "REMOVE"});
      }
    }
console.log(data);
    return <Wrap>
        <Box>
            <h6 style={{display: "flex", padding: "5px 10px"}}>{label} <a style={{marginLeft:"auto"}} href="/" className="clear">Clear</a></h6>
            {Object.keys(data).map(filter => 
                <Item key={v4()}>
                    <Checkbox 
                        className="is-checkradio is-success" 
                        onChange={check}
                        type="checkbox" 
                        checked={data[filter]}
                        value={filter}
                        name={field+"-"+filter.replace(/ /g,'')}
                    />
                    <Label className="checkbox">{filter}</Label>
                </Item>
            )}
            <button className="button is-success is-rounded" onClick={apply}>Apply</button>
        </Box>
    </Wrap>
};

export const Nested  = ({label, field, data, handler, apply, defaultValue}) => {   
    const [nested, setNested] = useState(data.secondary.map(row => <option key={v4()} value={row}>{row}</option>));

    const change = (field, event, nestedUpdate) => {
        // remove filter if label is selected
        if(event.target.value === '--label--') {
            if(nestedUpdate) setNested(Array.from(data.secondary).map(row => <option key={v4()} value={row}>{row}</option>));
            handler({field: field, value: "", action: "REMOVE"});    
        } else {
            if(nestedUpdate) setNested(Array.from(data.nested.get(event.target.value).keys()).map(row => <option key={v4()} value={row}>{row}</option>));
            handler({field: field, value: event.target.value, action: "REPLACE"});
        }
    }
 
    return <Wrap>
    <Box>
        <h6>{label.main}</h6>
        <div className="select is-rounded">
            <select value={defaultValue.primary} onChange={(event) => change(field.primary, event, true)}>
                <option value="--label--">{label.primary}</option>
                {data.primary.map(row => <option key={v4()} value={row}>{row}</option>)}
            </select>
        </div>
        <br />
        <div className="select is-rounded">
            <select value={defaultValue.secondary} id={`${field.main}-secondary`} data-main={field.main} data-field={field.secondary} onChange={(event) => change(field.secondary, event, false)} className="select filter">
                <option value="--label--">{label.secondary}</option>
                {nested}
            </select>
        </div>
        <button className="button is-success is-rounded" onClick={apply}>Apply</button>
    </Box>
    </Wrap>
};