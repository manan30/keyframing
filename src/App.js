import React from 'react';

import { Canvas, CodeFAB } from './GlobalStyles';
import Icon from './svg/ic_code.svg';
import Scene from './views/Scene';

function App() {
  return (
    <>
      <Canvas>
        <Scene />
      </Canvas>
      <a
        href='https://github.com/manan30/keyframing'
        target='_blank'
        rel='noopener noreferrer'>
        <CodeFAB src={Icon} />
      </a>
    </>
  );
}

export default App;
