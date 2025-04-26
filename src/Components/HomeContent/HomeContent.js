import React from 'react';
import Greeting from '../UserComponents/Greeting/Greeting';
import Testimonial from '../UserComponents/Testimonial/Testimonial';
import Features from '../UserComponents/Features/Features';
import Secrets from '../UserComponents/Secrets/Secrets';
import AppDownload from '../UserComponents/AppDownload/AppDownload'

function HomeContent() {
  return (
    <>
      <Greeting />
      <br /><br />
      <Testimonial />
      <br /><br />
      <Features />
      <Secrets />
      <AppDownload/>
    </>
  );
}

export default HomeContent;
