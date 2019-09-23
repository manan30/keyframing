import React, { useState } from 'react';

function Shape({ setRef }) {
  const [scale, setScale] = useState(1);

  return (
    <>
      <mesh
        ref={setRef}
        scale={[scale, scale, scale]}
        onClick={() => setScale(scale === 1 ? 1.5 : 1)}>
        <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
        <meshNormalMaterial attach='material' />
      </mesh>
    </>
  );
}

export default Shape;
