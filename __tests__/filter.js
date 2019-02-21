import {hide} from "../src/utilities/Hide";

const edges = [
    {node:{frontmatter:{name:"1", city:"Dubai", country:"UAE", hotelType:"5", duration: "7", courseType:[{name:"Earth Course"}, {name:"Championship Course"}]}}},
    {node:{frontmatter:{name:"2", city:"Abu Dhabi", country:"Oman", hotelType:"5", duration: "7"}}},
    {node:{frontmatter:{name:"3", city:"Dubai", country:"UAE", hotelType:"5", duration: "5"}}}
];

const filters = [
    {"field":"courseType", "value":"Earth Course", "action":"ADD"},
    {"field":"duration", "value":"7", "action":"ADD"},
];

describe("Hide", () => {
    it("filters edges", () => {
        expect(hide(edges, filters)).toEqual([edges[0]]);
    })
})