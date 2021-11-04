
import React, { useRef, useState  } from 'react';
import * as THREE from 'three'
import { Html } from '@react-three/drei';
import { table, colorComponent } from "./data";
import { Display } from './display';


//import { getData } from './ajaxgetter2';



export function Table(props) {
    const refPlane = useRef()
    const group = useRef()


   /// z tego segmentu trzeba zrobić sferę, treba podać dane wynikowe z algorytmu z pierwszego projektu
    const elementsSetBase = []


    for (let i = 0; i < table.length; i += 6) {
        //elementsSetBase.push([(table[i + 3] * 140) - 1330, - (table[i + 4] * 180) + 990, 0, table[i], table[i + 1]])
        elementsSetBase.push([(table[i + 3] * 3) - 30, - (table[i + 4] * 3.1) + 18, 0, table[i], table[i + 1], table[i + 2]])

    }
   //const elementsSetBase2=[]
   for(let i=0; i<118; i++){
   elementsSetBase[i].push(colorComponent[i])
   }
   console.log(elementsSetBase)
  /// koniec segementu do zrobienia sfery
  

  //początek sfery

  const elementsSetBaseSphere = []

  const vector = new THREE.Vector3();

  for (let i = 0, l = 118; i < l; i++) {

    const phi = Math.acos(- 1 + (2 * i) / l);
    const theta = Math.sqrt(l * Math.PI) * phi;

    const object = new THREE.Object3D();

    object.position.setFromSphericalCoords(800, phi, theta);

    vector.copy(object.position).multiplyScalar(2);

    object.lookAt(vector);

    elementsSetBaseSphere.push([object.position.x/60,object.position.y/60,object.position.z/60,object.rotation.x,object.rotation.y,object.rotation.z,])
    
    
  }
  
  // do każdego z elementów tablicy trzeba dodać dane z 'table'


   //display info
    const [count, setCount] = useState(0);


    const [ifVisible, setVisible] = useState(false);
    

    const [elementNameToDsiplay, setElementNameToDisplay] = useState('');
    const [atomicWeightToDisplay, setAtomicWeightToDisplay] = useState('');
    const [atomicDescriptionToDisplay, setAtomicDescriptionToDispaly] = useState('');
  
    /*useEffect(() => {
       setTableFirstTime(false);
      });*/

    const wynikToDisplay = require('./ajaxgetter2.js');
   
    //

    //search begin
    const searching_results = [];
    const [value, setValue] = useState('');
  
    const valueToArray = value.split('');
    if (valueToArray.length !== 0) {
        valueToArray[0] = valueToArray[0].toUpperCase();
    }
    const valueToCheck = valueToArray.join('');

    if (value !== '') {
        for (let i = 0; i < elementsSetBase.length; i++) {
            if ((elementsSetBase[i][3]) === valueToCheck) {
                searching_results.push(elementsSetBase[i]);
                console.log('pushed')
            }
            if ((elementsSetBase[i][3].split('')[0]) === valueToCheck) {
                searching_results.push(elementsSetBase[i]);
                console.log('pushed2');
            }
            if ((elementsSetBase[i][4]) === valueToCheck) {
                searching_results.push(elementsSetBase[i])
            }
            if ((elementsSetBase[i][4].split('')[0]) === valueToCheck) {
                searching_results.push(elementsSetBase[i]);

            }
        }

        console.log('value');
        console.log(searching_results)
    }

    const searching_result_map = searching_results.map((element, i) => (
        <group key={i} ref={group} position={[element[0], element[1], 0]} rotation={[0, 0, 0]} >
            <mesh key={"a" + i} ref={refPlane} >
                <planeGeometry args={[2, 2, 2]} />
                <meshBasicMaterial attach="material" color={'black'} />
            </mesh>
            <Html key={"b" + i} position={[0, 0.05, 0.09]} transform occlude  >
                <button onClick={() => {

                    setCount(count + 1);
                    setVisible(true);
                    //setOffDisplay(true)
                    setElementNameToDisplay(element[4])
                    setAtomicWeightToDisplay(element[5])
                    setAtomicDescriptionToDispaly(wynikToDisplay.getData(i))
                
                    console.log(atomicDescriptionToDisplay)

                }}>
                    <div className='OneElement' id={element[3]} style={{ backgroundColor: 'rgba(255,127,170,50)' }}>
                        {element[3]}
                    </div>

                    <div className='name'>
                        {element[4]}
                    </div>
                </button>
            </Html>
        </group>)
    )


    //SearchEnd

    const elementsSetFinal = elementsSetBaseSphere.map((element, i) =>

    (<group key={i} ref={group} position={[element[0], element[1], element[2]]} rotation={[element[3], element[4],element[5]]} >
        <mesh key={"a" + i} ref={refPlane} >
            <boxGeometry args={[2, 2.6, 0.1]} />
            <meshPhongMaterial attach="material" color={'rgba(0,127,100,  0.40534638195481165)'} opacity={0.2}  transparent={true}/>
        </mesh>
         <Html key={"b" + i} position={[0, 0.05, 0.09]} transform occlude  >
            <button onClick={() => {
                setCount(count + 1);
                setVisible(true);
                //setOffDisplay(true)
                setElementNameToDisplay(element[4])
                setAtomicWeightToDisplay(element[5])
                setAtomicDescriptionToDispaly(wynikToDisplay.getData(i))
                console.log(atomicDescriptionToDisplay)
                
                
                
                

            }}>
                <div className='OneElement' id={element[3]} style={{ backgroundColor: 'rgba(0,127,100,' +  0.40534638195481165 + ')' }}>
                    {element[3]}
                </div>

                <div className='name'>
                    {element[4]}
                </div>
            </button>
        </Html>
    </group>)
    )
   if(ifVisible===true){
        return (
            <group>

                {elementsSetFinal}
                {searching_result_map}
                
                <Display ifvisibleA={ifVisible ? 'visible' : 'hidden'}
                    elementName={elementNameToDsiplay}
                    atomicWeight={atomicWeightToDisplay}
                    atomicDescription={atomicDescriptionToDisplay.replace(/<p>/g, ' ').replaceAll('</p>', '')}
                    functionToClose={() =>{ setVisible(false); setValue('')}}
                />
                <Html>
                    <div className='searcher'>
                        <span>
                            Search
                        </span>


                        <input className='searchinput'  onChange={(e => setValue(e.target.value))}>
                        </input>

                    </div>
                </Html>
            </group>
        )
    }
    else{
        return (
            <group>

                {elementsSetFinal}
                {searching_result_map}
                
                <Html>
                    <div className='searcher'>
                        <span>
                            Search
                        </span>


                        <input className='searchinput' onChange={(e => setValue(e.target.value))}>
                        </input>

                    </div>
                </Html>
            </group>
        )
    }
   
   
}