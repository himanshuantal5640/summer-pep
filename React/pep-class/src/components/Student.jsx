import React, { useState } from "react";
import "./Student.css";

const Student = () => {
  const [student, setStudent] = useState({
    name: "",
    regid: "",
    email: "",
    age: "",
    city: "",
    role: "student",
  });

  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData((prev) => [...prev, student]);

    setStudent({
      name: "",
      regid: "",
      email: "",
      age: "",
      city: "",
      role: "student",
    });
  };

  return (
    <div className="container">
      <h2 className="heading">Student Details Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input  type="text" name="name" value={student.name} placeholder="Enter Your Name" onChange={handleChange} /><br /><br />
        <label>Registration Number: </label>
        <input type="number" name="regid" value={student.regid} placeholder="Enter your registration number" onChange={handleChange} />
        <br /><br />
        <label>Email: </label>
        <input type="email" name="email" value={student.email} placeholder="Enter Your Email" onChange={handleChange}/>
        <br /><br />
        <label>Age: </label>
        <input type="number" name="age" value={student.age} placeholder="Enter Your Age" onChange={handleChange}/>
        <br /><br />
        <label>City: </label>
        <input type="text" name="city" value={student.city} placeholder="Enter Your City" onChange={handleChange} />
        <br /><br />
        <label>Role: </label>
        <select  name="role" value={student.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="scholar">Scholar</option>
        </select>
        <br /><br />
        <button type="submit">Submit</button>
      </form>
      {submittedData.length > 0 && (
        <div className="student-list">
          <h2>Student Details</h2>

          {submittedData.map((student, index) => (
            <div key={index} className="student-card">
              <h3>Student {index + 1}</h3>
              <p>Name: {student.name}</p>
              <p>Registration No: {student.regid}</p>
              <p>Email: {student.email}</p>
              <p>Age: {student.age}</p>
              <p>City: {student.city}</p>
              <p>Role: {student.role}</p>
              <hr />
            </div>
        ))}
      </div>
    )}
    </div>
  );
};

export default Student;