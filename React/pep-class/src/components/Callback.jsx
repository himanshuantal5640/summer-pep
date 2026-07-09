import React, { useCallback, useState } from "react";
import Child2 from "./Child2";

const Callback = () => {
  const [count,setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log("Child2 button clicked");
  },[]);
  return (
    <div style={{border: '2px solid red', padding:'10px'}}>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child2 handleClick={handleClick} />
    </div>
  );
};

export default Callback;
