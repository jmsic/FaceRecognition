import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '525a44d565534a02b248bf1672d2cd22'
});



const particlesOptions = {
                particles: {
                  number: {
                    value:30,
                    density:{
                      enabled:true,
                      value_area: 800 
                    }
                  }
                }}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(
      function(response){
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err){
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" 
          params={{particlesOptions}} 
        />      
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl = {this.state.imageUrl}/>
        
      </div>
    );
  }
}



export default App;
