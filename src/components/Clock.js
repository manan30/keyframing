import React from 'react';

function Clock({ setRef }) {
  return <clock ref={setRef} args={[true]} />;
}

export default Clock;
