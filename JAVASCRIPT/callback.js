function one(){
    console.log("one");
}
function two(fun){
    // console.log("two");
    fun()
}
// // one();
// // two();
// two(one);
// calling two and pass one as arguement 


function greet(name){
    console.log(`Hello ${name}`);
}

function processUserInput(callbacks){
    // callbacks("John");
    console.log('start');
    callbacks();
    console.log('end');
}
// processUserInput(greet);
// processUserInput(greet("John")); //we cannot pass like this because it will call the function immediately and not wait for the callback to be executed. we need to pass the function reference instead of calling it.

// processUserInput(()=>greet("John")); // we can also use arrow function to pass the function reference.

//setTimeout is synchronous function that takes a callback function as an argument and executes it after a specified time interval. It is used to delay the execution of a function or to schedule a function to be executed at a later time. In this case, we are using setTimeout to delay the execution of the callback function by 2 seconds.
// setTimeout(()=>{
//     console.log("Hello after 2 seconds");
// },2000);


function login(callback) {
    console.log("1. User logged in");
    setTimeout(() => {
        console.log("2. Fetching user data...");   
        callback();
    },5000);
}

function fetchData(callback){
    console.log("3. Data fetched");
    setTimeout(() => {
        console.log("4. User Details loaded")
        callback();
    }, 2000);
}

function getOrders(callback){
    console.log("5. Getting orders...");
    setTimeout(() => {
        console.log("6. Orders loaded");
        callback();
    }, 1000);
}
function getOrderDetails(callback){ 
    console.log("7. Getting order details...");
    setTimeout(() => {
        console.log("8. Order details loaded");
        callback(); 
    }, 3000);
}
//without using callback functions, the code will execute in a synchronous manner and we will not be able to control the order of execution. order is 
// 1. User logged in
// 3. Data fetched
// 5. Getting orders...
// 7. Getting order details...
// 6. Orders loaded
// 4. User Details loaded
// 8. Order details loaded
// 2. Fetching user data...
// login();
// fetchData();
// getOrders();
// getOrderDetails();
// using callback functions, we can control the order of execution and make sure that the functions are executed in the desired order. The output will be as follows:  
// 1. User logged in
// 2. Fetching user data...
// 3. Data fetched
// 4. User Details loaded
// 5. Getting orders...
// 6. Orders loaded
// 7. Getting order details...
// 8. Order details loaded
// 9. All data loaded
// login(()=>{
//     fetchData(()=>{
//         getOrders(()=>{ 
//             getOrderDetails(()=>{
//                 console.log("9. All data loaded");
//             });
//         });
//     });
// });


//promise
function one(callback){
    console.log("one");
    callback();
}
function two(callback){
    console.log("two");
    callback();
}
function three(callback){
    console.log("three");
    callback();
}
function four(callback){
    console.log("four");
    callback();
}
function five(callback){
    console.log("five");
    callback();
}
function six(callback){
    console.log("six");
    callback();
}
function seven(callback){
    console.log("seven");
    callback();
}
function eight(callback){
    console.log("eight");
    callback();
}   
function nine(callback){
    console.log("nine");
    callback();
}
function ten(){
    console.log("ten");
    // callback();
}

//it is synchronous function that takes a callback function as an argument and executes it after the current function has completed. It is used to execute a series of functions in a specific order. In this case, we are using callbacks to execute the functions one after the other in a specific order. The output will be as follows:
one(()=>{
    two(()=>{
        three(()=>{
            four(()=>{
                five(()=>{
                    six(()=>{
                        seven(()=>{
                            eight(()=>{
                                nine(()=>{
                                    ten(()=>{
                                        console.log("All functions executed");
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});