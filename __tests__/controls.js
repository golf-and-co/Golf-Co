import {hide} from "../src/components/Control/Hide";
import {lookup} from "../src/components/Control/Lookup";
import {aggregate} from "../src/components/Control/Aggregate";

const edges = [
    {node:{frontmatter:{name:"1", city:"Dubai", country:"UAE", hotelType:"5", duration: "7", courseType:[{name:"Earth Course"}, {name:"Championship Course"}]}}},
    {node:{frontmatter:{name:"2", city:"Abu Dhabi", country:"Oman", hotelType:"5", duration: "7"}}},
    {node:{frontmatter:{name:"3", city:"Dubai", country:"UAE", hotelType:"5", duration: "5"}}}
];

const filters = [
    {"name":"courseType", "value":"Earth Course"},
    {"name":"duration", "value":"7"},
];

const state = {
    filters: [
        {name:"hotelType", value:"5"},
        {name:"hotelType", value:"7"},
    ]
}

/*
    Hide takes current filters in state, and applies them to data to determine which entries are visible
*/
describe("Hide", () => {
    it("filters edges", () => {
        expect(hide(edges, filters, "name")).toEqual([edges[0]]);
    })
})

/*
    Lookup is used by controls, to see if their filter is active in state. 
    Needed as state is an array of [{name:"", value:""}], to allow for multiple checked options
*/
describe("Lookup", () => {
    it("finds state", () => {
        expect(lookup(state.filters, [{name:"hotelType", value:"5"}])).toEqual([state.filters[0]]);
    })
})

/*
    Aggregate is used when generating a list of available values for the controls, such as checkboxes and options in drop down
    The options we need may be nested in a structured data in a row, so need to be able to drill down and grab them.
*/
describe("Aggregate", () => {
    it("groups structured data", () => {
        expect(aggregate(edges, {column:"courseType",property:"name"})).toEqual(["Earth Course", "Championship Course"]);
    })
})