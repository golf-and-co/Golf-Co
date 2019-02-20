import React from "react"
import renderer from "react-test-renderer"

import Content from "../src/components/Content"

describe("Content", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Content data={{description:"test"}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})