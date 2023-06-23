import React from 'react'

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function MyParticlesBlack() {

  const particlesInit = useCallback(async engine => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    // await console.log(container);
}, []);
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: "-1" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          "fullScreen": {
              "enable": true,
              "zIndex": 1
          },
          "particles": {
              "number": {
                  "value": 250
              },
              "color": {
                  "value": "#6BD0FF"
              },
              "shape": {
                  "type": "circle",
                  "options": {
                      "sides": 5
                  }
              },
              "opacity": {
                  "value": 0.8,
                  "random": false,
                  "anim": {
                      "enable": false,
                      "speed": 0.1,
                      "opacity_min": 0.1,
                      "sync": false
                  }
              },
              "size": {
                  "value": 1,
                  "random": false,
                  "anim": {
                      "enable": false,
                      "speed": 1,
                      "size_min": 0.1,
                      "sync": false
                  }
              },
              "rotate": {
                  "value": 0,
                  "random": true,
                  "direction": "clockwise",
                  "animation": {
                      "enable": true,
                      "speed": 0.1,
                      "sync": false
                  }
              },
              "line_linked": {
                  "enable": false,
                  "distance": 600,
                  "color": "#6BD0FF",
                  "opacity": 0.4,
                  "width": 2
              },
              "move": {
                  "enable": true,
                  "speed": 0.2,
                  "direction": "none",
                  "random": false,
                  "straight": false,
                  "out_mode": "out",
                  "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                  }
              }
          },
          "interactivity": {
              "events": {
                  "onhover": {
                      "enable": true,
                      "mode": ["grab"]
                  },
                  "onclick": {
                      "enable": false,
                      "mode": "bubble"
                  },
                  "resize": true
              },
              "modes": {
                  "grab": {
                      "distance": 300,
                      "line_linked": {
                          "opacity": 0.35
                      }
                  },
                  "bubble": {
                      "distance": 400,
                      "size": 10,
                      "duration": 2,
                      "opacity": 8,
                      "speed": 3
                  },
                  "repulse": {
                      "distance": 200
                  },
                  "push": {
                      "particles_nb": 4
                  },
                  "remove": {
                      "particles_nb": 2
                  }
              }
          },
          "retina_detect": true,
          "background": {
              "color": "#000",
              "image": "",
              "position": "50% 50%",
              "repeat": "no-repeat",
              "size": "cover"
          }
      }}
    />
    </div>
  )
}

export default MyParticlesBlack;
