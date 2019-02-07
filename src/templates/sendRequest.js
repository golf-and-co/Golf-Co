import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import HeroSmall from "../components/HeroSmall";
import Footer from '../components/Footer';

const SendRequest = ({ data }) => <Layout>
  <HeroSmall data={{...data.markdownRemark.frontmatter}}/>
  <div style={{height:"60vh;"}}>
    <p>We are all set to take your request. Just fill up the form below.</p>
    <form>
      <div class="container">
        <div class="columns">
          <div class="column">

              <div class="field">
                  <label class="label">Date</label>
                  <div class="control">
                      <input type="date" />
                  </div>
              </div>

              <div class="field">
                  <label class="label">First Name</label>
                  <div class="control">
                      <input class="input" type="text" placeholder="First Name" />
                  </div>
              </div>

              <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                      <input class="input" type="text" placeholder="Email" />
                  </div>
              </div>
          </div>

              

          <div class="column">
              <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                      <input class="input" type="text" placeholder="Email" />
                  </div>
              </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <Footer />
</Layout>;

SendRequest.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired
    }),
  }),
}

export default SendRequest

export const sendRequestQuery = graphql`
  query sendRequestQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
