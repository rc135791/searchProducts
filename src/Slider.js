import React, {Component} from 'react';
import { Slide } from 'react-slideshow-image';
 
const slideImages = [
  '/assets/images/slideshow/girls.jpg',
  '/assets/images/slideshow/men.jpg',
  '/assets/images/slideshow/women.jpg',
  '/assets/images/slideshow/man.gif',
  '/assets/images/slideshow/baby.gif'
];
 
const properties = {
  duration: 8000,
  transitionDuration: 800,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    //console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}

class Slider extends Component{
	render(){
		return <div className="slide-container">
        <Slide {...properties}>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[0]})`, 'height': '400px'}} className="rd_ht400">
            <span></span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]})`}} className="rd_ht400">
            <span></span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})`}} className="rd_ht400">
            <span></span>
          </div>
        </div>
        <div className="each-slide">
        <div style={{'backgroundImage': `url(${slideImages[3]})`}} className="rd_ht400">
          <span></span>
        </div>
      </div>
      <div className="each-slide">
      <div style={{'backgroundImage': `url(${slideImages[4]})`}} className="rd_ht400">
        <span></span>
      </div>
    </div>
      </Slide>
    </div>
	}
}

export default Slider