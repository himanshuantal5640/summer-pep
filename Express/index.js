const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan());
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
// Get all students
app.get('/students', (req, res) => {
    res.json({
        success: true,
        count: students.length,
        data: students
    });
});
// add using post 
app.post('/st', (req, res) => {
    const { id, name, age, course } = req.body;

    const student = { id, name, age, course };
    students.push(student);

    res.status(201).json({
        success: true,
        message: "Student created",
        data: student
    });
});

// PUT replace using patch
app.put('/st/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    students[index] = {
        id,
        ...req.body
    };

    res.json({
        success: true,
        message: "Student updated completely",
        data: students[index]
    });
});

// PATCH used to update
app.patch('/st/:id', (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    Object.assign(student, req.body);

    res.json({
        success: true,
        message: "Student updated partially",
        data: student
    });
});

// DELETE 
app.delete('/st/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        success: true,
        message: "Student deleted successfully",
        data: deletedStudent[0]
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
