import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import {withCookies, cookie} from "react-cookie";
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
cookies.set('cart', {stats:[{icon:{publicURL:"/static/golf_tee-a3079085b609f0c2a1099738dea6aab4.svg"}, label:"Golf Rounds",value:"5"}], headline:"7 Nights (BB Base) + 4 Rounds of"}, { path: '/' });
const cart = cookies.get('cart');
return <Layout>
    <HeroCourse data={data.markdownRemark.frontmatter} empty={true} />
    <CartStats cart={cart} data={data.markdownRemark.frontmatter} />
    <CartDetails data={data.markdownRemark.frontmatter} cart={cart} />
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
        city
        country
        image {
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
        dialogs{
          icon {
            publicURL
          }
          heading
          message
        }
        tags{
          icon {
            publicURL
          }
          label
        }
        gallery {
          category
          image {
            childImageSharp{
              fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
              }
            }
          }
        }
        map
      }
    }
  }
`
