 import React from 'react'
 import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const About = () => (
  <div id='about' className='fadeInDown' style={{background:'#f5f5f5'}}>
    <h2>About</h2>
    <Link to="/">back</Link>
    <h2></h2>
    <a href="/">back</a>
  </div>
)
export default About;