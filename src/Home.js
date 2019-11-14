import React, {Component} from 'react';

export default class Home extends Component {
  

  

  render(){
    return (
      <>
        <div id="homeContainer">
          <div className="headingContainer">
            <h1>Welcome to the European Sign Language Atlas!</h1>
            <p className="home">ESLA is a database of European sign languages based on grammatical properties.</p>
          </div>
          <div className="headingContainer">
            <h2>What is the European Sign Language Atlas?</h2>
            <p className="home">ESLA (European Sign Language Atlas) is a website that contains a database of information about European 
            sign languages organized by language name and grammatical feature. All information herein is derived from a variety of descriptive 
            sources. It was created as a final project at the Flatiron School, in the Web Development course.</p>
          </div>
          <div className="headingContainer">
            <h2>What can I do here?</h2>
            <p className="home">You can search through languages by name by clicking on the "Languages" tag above. You can also search through 
            grammatical features by name by clicking on the "Features" tab. You must have Javascript enabled to get the fullest use of this 
            website.</p>
          </div>
          <div className="headingContainer">
            <h2>How can I contribute?</h2>
            <p className="home">You can contribute by clicking on the "Sign up" tab in the top right corner and creating an account on the website.</p>
          </div>
        </div>
      </>
    )
  }
}