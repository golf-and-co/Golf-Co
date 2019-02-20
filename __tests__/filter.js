import {hide} from "../src/utilities/Hide";

const edges = [
    {node:{frontmatter:{name:"1", city:"Dubai", country:"UAE", hotelType:"5", duration: "7"}}},
    {node:{frontmatter:{name:"2", city:"Abu Dhabi", country:"Oman", hotelType:"5", duration: "7"}}},
    {node:{frontmatter:{name:"3", city:"Dubai", country:"UAE", hotelType:"5", duration: "5"}}}
];

const filters = {
    "city": "Dubai",
    "duration": "7",
};

describe("Hide", () => {
    it("filters edges", () => {
        expect(hide(edges, filters)).toEqual([edges[0]]);
    })
})