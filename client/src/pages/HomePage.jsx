// src/pages/HomePage.js
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Destinations from '../components/Destinations';
import CallToAction from '../components/CallToAction';
import Tours from '../components/Tours';
import Testimonials from '../components/Testimonials';
import AboutUs from '../components/AboutUs';
import TravelTips from '../components/TravelTips';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
    <Header />
      <Hero />
      <Features />
      <section id="destinations">
        <Destinations />
      </section>
      <CallToAction />
      <Tours />
      <Testimonials />
      <AboutUs />
      <TravelTips />
      <Footer />
    </>
  );
};

export default HomePage;