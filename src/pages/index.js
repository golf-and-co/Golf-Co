import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero';
import Infographic from '../components/Info';
import Featured from '../components/Featured';
import Blog from '../components/Blog';

export const IndexTemplate = () => <Layout>
  <Hero />
  <Infographic />
  <Featured />
</Layout>

export default IndexTemplate;