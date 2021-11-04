
import React from 'react'
import { Html } from '@react-three/drei'


export function Display(props) {

    





    return (
        <group >

            <Html >

                <div className={'display'} style={{ backgroundColor: 'rgb(0,127,100)', visibility: props.ifvisibleA }}>
                    {props.elementName}
                    <div className='displayOff2' onClick={props.functionToClose}>
                        [x]close
                    </div>
                    <div className={'atomicnumber'}>
                        atomic weight: {props.atomicWeight}
                    </div>
                    <div className={'atomicDescription'}>
                        {props.atomicDescription}
                    </div>
                </div>
            </Html>
        </group>
    )
}
