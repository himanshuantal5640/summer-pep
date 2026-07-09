import React from 'react'

const Child = React.memo(() => {
    console.log("Child component rendered");
  return (
    <div>
        <p>This is the Child component</p>
    </div>
  )
})

export default Child
