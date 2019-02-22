import {hide} from "../src/components/Control/Hide";
import {lookup} from "../src/components/Control/Lookup";


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

describe("Hide", () => {
    it("filters edges", () => {
        expect(hide(edges, filters, "name")).toEqual([edges[0]]);
    })
})

describe("Lookup", () => {
    it("finds state", () => {
        expect(lookup(state.filters, [{name:"hotelType", value:"5"}])).toEqual([state.filters[0]]);
    })
})