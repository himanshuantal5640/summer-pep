const file = require('fs');

// file.readFile('hello.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     else{
//         console.log(data);
//     }
// })

// file.writeFile('hello.text','Good Moring!!',(err)=>{
//     if(err){
//         console.log("No such file");
//         return;
//     }
//     console.log("written");
// })


file.appendFile('hello.txt','\nGood Night',(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Written!!");
})