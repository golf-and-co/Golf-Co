/**
 * Only shows edges which have values matching filter.
 * @param {Array} edges Nodes from frontmatter 
 * @param {Object} filters filter name => filter value
 */
export const hide = (edges, filters) => edges.filter(edge => Object.keys(filters).every(key => (edge[key] === filters[key])));  