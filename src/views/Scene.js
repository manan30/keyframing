import React, { useRef } from 'react';
import { useRender } from 'react-three-fiber';
import * as THREE from 'three';

import Clock from '../components/Clock';
import Shape from '../components/Shape';

import Constants from '../utils/Constants';

function Scene() {
  const clockRef = useRef();
  const shapeRef = useRef();

  const frames = 60;
  const duration = 1.0;
  const step = 1 / (duration * frames);
  let t = 0;

  const a = {
    x: 0.0,
    y: 0.0,
    z: 0.0
  };

  const b = {
    x: 2.0,
    y: 0.0,
    z: 0.0
  };

  function lerp(x, y, dt) {
    return x + (y - x) * dt;
  }

  function ease(dt) {
    return dt < 0.5 ? 2 * dt * dt : -1 + (4 - 2 * dt) * dt;
  }

  useRender(() => {
    const time = clockRef.current.getElapsedTime();
    // const quaternion = new THREE.Quaternion();
    // quaternion.setFromAxisAngle(
    //   new THREE.Vector3(1.0, 1.0, -1.0),
    //   THREE.Math.degToRad(30)
    // );

    if (time > 1) return;

    shapeRef.current.position.set(
      lerp(a.x, b.x, ease(t)),
      lerp(a.y, b.y, ease(t)),
      lerp(a.z, b.z, ease(t))
    );
    // shapeRef.current.position.set(2, 0, 0);

    t += step;
  });

  return (
    <>
      <Clock setRef={clockRef} />
      <Shape setRef={shapeRef} />
    </>
  );
}

export default Scene;
