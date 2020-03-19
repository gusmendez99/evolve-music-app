import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'

import Footer from "../../components/footer/footer.component";

import './home.styles.css'

const HomePage = () => (
  <Fragment>
    <header className="near-black dt vh-100 w-100 bg-light-gray cover home-page">
      <div className="dtc v-mid tc w-100">
        <h1 className="f1 lh-solid mw8 center tc b mt6 ph5-ns white"> Evolve Music - Stream Music App </h1>
        
        <p className="f3 mw8 center tc ph5 white">A new way to play music</p>
        <Link className="f3 ph4 pv3 mb2 dib link no-underline br-pill dim bg-blue ba b--blue near-white page-scroll" to="/login">Login</Link>
      </div>
    </header>
    <section id="about" className="vh-75 dt bg-blue near-white w-100">
      <div className="dtc v-mid center measure tc">
        <h2 className="f2 f1-ns">Listen your music</h2>
        <hr className="mw4 center bn bg-near-white white" />
        <p className="f4 mw7 center">Music for everyone. Millions of songs. Listen anywhere.</p>
        <a href="#services" className="f3 ph4 pv3 mb2 dib link no-underline br-pill dim bg-near-white ba b--near-white blue page-scroll">See Our Services</a>
      </div>
    </section>
    <section id="services" class="mv3 pa0">
      <div class="tc mv4 pa0">
        <h2 class="f3 f1-ns">Services</h2>
        <hr class="mw4 center bn bg-blue" />
      </div>
      <div class="cf w-100 w-80-ns center">
        <div class="fl w-100 w-25-ns tc mb4">
          <i class="material-icons md-48">play_circle_filled</i>
          <h3 class="f3">More music</h3>
          <p class="black-50 ph3">Ready to play</p>
        </div>
        <div class="fl w-100 w-25-ns tc mb4">
          <i class="material-icons md-48">account_circle</i>
          <h3 class="f3">Users</h3>
          <p class="black-50 ph3">Put an image, video, animation, or anything else in the screen!</p>
        </div>
        <div class="fl w-100 w-25-ns tc mb4">
          <i class="material-icons md-48">assignment</i>
          <h3 class="f3">Manage people</h3>
          <p class="black-50 ph3">CRUD of artist, albums, ...</p>
        </div>
        <div class="fl w-100 w-25-ns tc mb4">
          <i class="material-icons md-48">assessment</i>
          <h3 class="f3">Stats</h3>
          <p class="black-50 ph3">Make your own reports</p>
        </div>
      </div>
    </section>
    <Footer/>
  </Fragment>
);

export default HomePage;