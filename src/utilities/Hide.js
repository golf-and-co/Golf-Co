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
    filters.every(filter => {
        if(filter.value === null || typeof filter.value === "undefined") return true;
        return (edge.node.frontmatter[filter.field] === filter.value || arrayCheck(edge.node.frontmatter[filter.field], filter.value))
    })
);  