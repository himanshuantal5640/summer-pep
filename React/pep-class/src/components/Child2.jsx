import React from 'react';

const Child2 = ({ handleClick }) => {
  console.log("Child2 Rendered");

  return (
    <div style={{ border: "2px solid black", padding: "10px", margin:"10px" }}>
      <p>This second child component</p>
      <button onClick={handleClick}>Child2 Button</button>
    </div>
  );
};

export default React.memo(Child2);