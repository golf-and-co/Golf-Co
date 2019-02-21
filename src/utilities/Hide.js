/**
 * Only shows edges which have values matching filter.
 * @param {Array} edges Nodes from frontmatter 
 * @param {Object} filters filter name => filter value
 */

const arrayCheck = (edge, filter) => {
    if(!Array.isArray(edge)) return false;
    return edge.some( item => item.name === filter);
}

export const hide = (edges, filters) => edges.filter(edge => 
    Object.keys(filters).every(key => {
        // for array value
        return (edge.node.frontmatter[key] === filters[key] || arrayCheck(edge.node.frontmatter[key], filters[key]))
    })
);  