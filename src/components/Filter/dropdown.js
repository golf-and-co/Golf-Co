<Nested data={{
            primary: Array.from((group(data.courses.edges, d => d.node.frontmatter.country).keys())),
            secondary: Array.from((group(data.courses.edges, d => d.node.frontmatter.city).keys())),
            nested: rollup(data.courses.edges, v => v.length, d => d.node.frontmatter.country, d => d.node.frontmatter.city),
          }}  
          label={{main:"Location", primary:"Country", secondary:"City" }}
          field={{main:"location", primary:"country", secondary:"city"}}
          location={{location}}
          handler={handler}
          apply={apply}
          defaultValue={{
            // @TODO: default value looks for object, need to lookup city and country from filter
            primary:defaultValue.primary,
            secondary:defaultValue.secondary,
          }}
          /> 
