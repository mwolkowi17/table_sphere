

import ReactDOM from 'react-dom'
import React from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CameraControls } from './orbitControl'
import { Table } from './table'





extend({ OrbitControls });


export default function App() {
  



  return (
    <div id="canvas-container" >
      <Canvas id="my" camera={{ fov: 40, near: 0.1, far: 10000, position: [0, 0, 50] }}>
        <CameraControls />

        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Table />
     
      </Canvas>,
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))
