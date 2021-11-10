import background from './images/floatingIslands.jpg';
import './App.css';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class App extends Component {
  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, 3);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add( pointLight, ambientLight );
    
    const lightHelper = new THREE.PointLightHelper(pointLight)
    const gridHelper = new THREE.GridHelper(200, 50)
    scene.add(lightHelper, gridHelper)

    const controls = new OrbitControls(camera, renderer.domElement);

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshBasicMaterial({color: 0xffffff});
      const star = new THREE.Mesh(geometry, material)
    
      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));
    
      star.position.set(x, y, z);
      scene.add(star);
    }
    
    Array(200).fill().forEach(addStar);

    //const backgroundTexture = new THREE.TextureLoader().load('./images/floatingIslands.jpg');
    scene.background = new THREE.TextureLoader().load(background);

    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return (
      <div />
    )
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
// function App() {
//   // === THREE.JS CODE START ===
  
//   // === THREE.JS EXAMPLE CODE END ===
//   // return (
//   //   <div className="App">
//   //     <header className="App-header">
//   //       <img src={logo} className="App-logo" alt="logo" />
//   //       <p>
//   //         Edit <code>src/App.js</code> and save to reload.
//   //       </p>
//   //       <a
//   //         className="App-link"
//   //         href="https://reactjs.org"
//   //         target="_blank"
//   //         rel="noopener noreferrer"
//   //       >
//   //         Learn React
//   //       </a>
//   //     </header>
//   //   </div>
//   // );

// }

export default App;
