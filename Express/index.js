const { json } = require('body-parser');
const express = require('express');
const app = express();
app.use(json());
app.get('/',(req,res)=>{
    res.send('Home page');
})
app.get('/login',(req,res)=>{
    res.send("Login page");
})
app.post('/login',(req,res)=>{
    res.send({success:true,message:"Logged In"});
});


const students = [
    {id:1,name:"tom",age:22,course:"MERN"},
    {id:2,name:"tom",age:21,course:"DSA"},
    {id:3,name:"tom3",age:23,course:"PHP"},
]
app.get('/student/:name/course/:course',(req,res)=>{
    const { name, course } = req.params;

    const st = students.find(
        s =>
            s.name.toLowerCase() === name.toLowerCase() &&
            s.course.toLowerCase() === course.toLowerCase()
    );

    if (st) {
        return res.json({
            success: true,
            data: st
        });
    }

    res.status(404).json({
        success: false,
        message: "Student not found"
    });
})

// Add new student
app.post('/student', (req, res) => {
    console.log(req.body);
    const { id, name, age, course } = req.body;

    students.push({
        id,
        name,
        age,
        course
    });

    res.json({
        success: true,
        message: "Student added successfully",
        data: students
    });
});
// Get all students
app.get('/students', (req, res) => {
    res.json({
        success: true,
        count: students.length,
        data: students
    });
});

app.listen(3000);