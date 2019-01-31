import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import {withCookies} from "react-cookie";
import Layout from '../components/Layout'
import HeroCourse from '../components/HeroCourse';
import CartStats from '../components/CartStats';
import CartDetails from '../components/CartDetails';

import Footer from '../components/Footer';

export const PageTemplate = ({
  title,
}) => (
  <section className="section section--gradient">
    <div className="container">
      Preview Offline
    </div>
  </section>
)

PageTemplate.propTypes = {
  title: PropTypes.string,
}

const PackageDetails = ({ data, cookies }) => {
  
// @TODO: Add to cart, follow this schema
cookies.set('cart', {
  stats:[
    {icon: {
      publicURL:"/static/golf_tee-a3079085b609f0c2a1099738dea6aab4.svg"}, 
      label:"Golf Rounds",
      value:"5"
    }
  ], 
  headline:"7 Nights (BB Base) + 4 Rounds of",
  courses: [
    {
      frontmatter: {
        featuredDetails: {
          image: "/img/emirates-golf-club-course.png",
          name: "Abu Dhabi National Golf",
        },
        /*stats: edge.node.frontmatter.stats,
        city: edge.node.frontmatter.city,
        country: edge.node.frontmatter.country,
      },
      fields: {
        slug: edge.node.frontmatter.title.replace(/ /g, ''),*/
      },
    },
  ]
}, { path: '/' });
const cart = cookies.get('cart');


// adapter to use existing Hero Course component
data.markdownRemark.frontmatter.image = data.markdownRemark.frontmatter.hero;
data.markdownRemark.frontmatter.packageTitle = data.markdownRemark.frontmatter.title;
data.markdownRemark.frontmatter.title = data.markdownRemark.frontmatter.pageHeader;
console.log(data);
return <Layout>
    <HeroCourse data={data.markdownRemark.frontmatter} empty={true} oneLine={true}/>
    <CartStats data={data.markdownRemark.frontmatter} />
    <CartDetails data={data.markdownRemark.frontmatter} cart={cart} body={data.markdownRemark.html}/>
    <Footer />
</Layout>
};

PackageDetails.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default withCookies(PackageDetails)

export const packageDetailsQuery = graphql`
  query packageDetailsQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        pageHeader
        bodyHeader
        description
        city
        country
        statsDescription
        courses {
          image {
            childImageSharp{
              fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
              }
            }
          }
          name
          city
          region
          slug
        }
        image {
          childImageSharp{
            fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
            }
          }
        }
        hero {
          childImageSharp{
            fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
            }
          }
        }
        stats{
          icon {
            publicURL
          }
          label
          value
        }
      }
    }
  }
`
