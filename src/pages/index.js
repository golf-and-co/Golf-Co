import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero';
import Infographic from '../components/Info';
import Featured from '../components/Featured';
import Recent from '../components/Recent';

export const IndexTemplate = () => <Layout>
  <Hero />
  <Infographic />
  <Featured />
  <Recent />
</Layout>

export default IndexTemplate;