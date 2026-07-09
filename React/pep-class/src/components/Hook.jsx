import React from 'react'
import { useState,useRef } from 'react'

const Hook = () => {
    const [image, setImage] = useState(null);
    const imgRef = useRef();//use to handle file input reset using DOM manipulation and it give current value of the input field
    const handleChange = (e) => {
        const file = e.target.files[0];
        if(file){
            const imgUrl = URL.createObjectURL(file);
            setImage(imgUrl);
        }
    }
    const removeImage = ()=>{
        setImage(null);
        // console.log(imgRef.current.value);
        // Clear file input
        if (imgRef.current) {
            imgRef.current.value = "";
        }
        // console.log(imgRef.current.value);
    }
  return (
    <div>
     
        <input ref={imgRef} type="file" accept="image/*" onChange={handleChange} />
        <button onClick={removeImage} style={{ marginLeft: '10px', width: '50%' }}>Remove Image</button>
        {image ? (
            <div>
                <img src={image} alt="Preview Image" style={{ width: '200px', height: '200px' }} />
            </div>
        ): <p>No image selected</p>}


    </div>
  )
}

export default Hook
