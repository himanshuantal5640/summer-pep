import React, { useMemo, useState } from 'react'
import Child from './Child'

const Memo = () => {
    const [count,setCount] = useState(0);
    const expensiveCalulation = useMemo(()=>{
        console.log("Caluclating....")
        let re = 0;
        for(let i=0;i<100000;i++){
            re += i;
        }
        return re;
    },[])
  return (
    <div>
        <h1>Count: {count}</h1>
        <h2>Calculaton: {expensiveCalulation}</h2>
        <button onClick={()=> setCount(count+1)}>Increment</button>
        <Child/>

    </div>
  )
}

export default Memo
