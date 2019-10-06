import React, { useRef } from 'react';
import { useRender, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import Clock from '../components/Clock';
import Shape from '../components/Shape';

import Constants from '../utils/Constants';

function Scene() {
  const clockRef = useRef();
  const shapeRef = useRef();

  const { camera } = useThree();

  camera.position.set(0, 10, 50);

  const frames = 60;
  const duration = 1.0;
  const step = 1 / (duration * frames);
  let t = 0;
  let index = 0;
  let quat1;
  let quat2;

  function lerp(x, y, dt) {
    return x + (y - x) * dt;
  }

  function ease(dt) {
    return dt < 0.5 ? 2 * dt * dt : -1 + (4 - 2 * dt) * dt;
  }

  useRender(() => {
    const currTime = clockRef.current.getElapsedTime();

    if (currTime > 10) return;

    if (parseInt(currTime.toFixed(2), 10) - index === 1 && index < 8) {
      t = 0;
      index += 1;
    }

    quat1 = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(
        Constants.keyframes[index].xa,
        Constants.keyframes[index].ya,
        Constants.keyframes[index].za
      ).normalize(),
      THREE.Math.degToRad(Constants.keyframes[index].theta)
    );

    quat2 = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(
        Constants.keyframes[index + 1].xa,
        Constants.keyframes[index + 1].ya,
        Constants.keyframes[index + 1].za
      ).normalize(),
      THREE.Math.degToRad(Constants.keyframes[index + 1].theta)
    );

    shapeRef.current.position.set(
      lerp(Constants.keyframes[index].x, Constants.keyframes[index + 1].x, t),
      lerp(Constants.keyframes[index].y, Constants.keyframes[index + 1].y, t),
      lerp(Constants.keyframes[index].z, Constants.keyframes[index + 1].z, t)
    );

    THREE.Quaternion.slerp(quat1, quat2, shapeRef.current.quaternion, t);

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
