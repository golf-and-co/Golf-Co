

const arrayCheck = (edge, filter, label) => {
    if(!Array.isArray(edge)) return false;
    return edge.some( item => Object.values(item).includes(filter));
}

/**
 * Only shows edges which have values matching control.
 * @param {Array} edges Nodes from frontmatter 
 * @param {Object} controls control name => control value
 * @param {Object} label for edges where the field is unstructured, the property to compare
 */
export const hide = (edges, controls, label) => edges.filter(edge => 
    controls.every(control => {
        // do not hide on an empty control
        if(control.value === null || typeof control.value === "undefined") return true;
        // hide if value does not match, or not in array
        return (edge.node.frontmatter[control.name] === control.value || arrayCheck(edge.node.frontmatter[control.name], control.value, label))
    })
);  