// const promise = new Promise((resolve, reject) => {
//     let success = true; // Change this to false to test rejection
//     setTimeout(()=>{
//         if (success) {
//             resolve("Promise resolved successfully!");
//         } else {
//             reject("Promise rejected.");
//         } 
//     },1000)
// });

// promise.then((msg)=>{
//     console.log(msg);
// })
// .catch((err)=>{
//     console.error(err);
// })
// .finally(()=>{
//     console.log("Promise has been settled (either resolved or rejected).");
// })

// chnge it to promise based code from callback based code

function login() {
    return new Promise((resolve, reject) => {
        console.log("1. User logged in");
        let success = true;
        setTimeout(() => {
            console.log("2. Fetching user data...");
            if (success) {
                resolve();
            } else {
                reject("Failed to fetch user data.");
            }
        }, 5000);
    });
}

function fetchData(){
    return new Promise((resolve, reject) => {
        console.log("3. Data fetched");
        let success = true;
        setTimeout(() => {
            console.log("4. User Details loaded");
            if (success) {
                resolve();
            } else {
                reject("Failed to fetch user details.");
            }
        }, 2000);
    });
}

function getOrders(){
    return new Promise((resolve, reject) => {
        console.log("5. Getting orders...");
        let success = true; 
        setTimeout(() => {
            console.log("6. Orders loaded");
            if (success) {
                resolve();
            } else {
                reject("Failed to fetch orders.");
            }
        }, 1000);
    });
}
function getOrderDetails(){ 
    return new Promise((resolve, reject) => {
        console.log("7. Getting order details...");
        let success = true;
        setTimeout(() => {
            console.log("8. Order details loaded");
            if (success) {
                resolve();
            } else {
                reject("Failed to fetch order details.");
            }
        }, 3000);
    });
}

// login()
//     .then(() => fetchData())
//     .then(() => getOrders())
//     .then(() => getOrderDetails())
//     .catch((err) => console.error(err));


function getProducts(){
    return new Promise((resolve, reject) => {
        // let success = true;
        let success = false; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                resolve("Products fetched successfully!");
            } else {
                reject("Failed to fetch products.");
            }
        }, 3000);
    });
}

function getOffers(){
    return new Promise((resolve, reject) => {
        // let success = true;
        let success = false; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                resolve("Offers fetched successfully!");
            }
            else {
                reject("Failed to fetch offers.");
            }
        }, 2000);
    });
}
function getCategories(){
    return new Promise((resolve, reject) => {
        // let success = true;
        let success = false; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                resolve("Categories fetched successfully!");
            }
            else {
                reject("Failed to fetch categories.");
            }
        }, 1000);
    });
}

//use promise.all to fetch products, offers, and categories in parallel
// Promise.all([getProducts(), getOffers(), getCategories()])
//     .then((results) => {
//         console.log("All data fetched successfully!");
//         console.log(results);
//     })
//     .catch((err) => {
//         console.error(err);
//     });


//use promise.allSettled to fetch products, offers, and categories in parallel
// Promise.allSettled([getProducts(), getOffers(), getCategories()])
//     .then((results) => {
//         console.log("All data fetched (either resolved or rejected)!"); 
//         console.log(results);
//     })
//     .catch((err) => {
//         console.error(err);
//     });

//use promise.race to fetch products, offers, and categories in parallel
// Promise.race([getProducts(), getOffers(), getCategories()])
//     .then((result) => {
//         console.log("First data fetched successfully!");
//         console.log(result);
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// use promise.any to fetch products, offers, and categories in parallel
// Promise.any([getProducts(), getOffers(), getCategories()])
//     .then((result) => {
//         console.log("At least one data fetched successfully!");
//         console.log(result);
//     })
//     .catch((err) => {
//         console.error(err);
//     });


function one(){
    return new Promise((resolve, reject) => {
        let success = true; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                console.log("one");
                resolve();
            } else {
                reject("Failed to execute one.");
            }
        }, 1000);
    });
}

function two(){
    return new Promise((resolve, reject) => {
        let success = true; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                console.log("two");
                resolve();
            } else {
                reject("Failed to execute two.");
            }
        }, 1000);
    });
}
function three(){
    return new Promise((resolve, reject) => {
        let success = true; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                console.log("three");
                resolve();
            } else {
                reject("Failed to execute three.");
            }
        }, 1000);
    });
}
function four(){
    return new Promise((resolve, reject) => {
        let success = true; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                console.log("four");
                resolve();
            } else {
                reject("Failed to execute four.");
            }
        }, 1000);
    });
}
function five(){
    return new Promise((resolve, reject) => {
        let success = true; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                console.log("five");
                resolve();
            } else {
                reject("Failed to execute five.");
            }
        }, 1000);
    });
}
function six(){
    return new Promise((resolve, reject) => {
        let success = true; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                console.log("six");
                resolve();
            } else {
                reject("Failed to execute six.");
            }
        }, 1000);
    });
}
function seven(){
    return new Promise((resolve, reject) => {
        let success = true; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                console.log("seven");
                resolve();
            } else {
                reject("Failed to execute seven.");
            }
        }, 1000);
    });
}
function eight(){
    return new Promise((resolve, reject) => {
        let success = true; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                console.log("eight");
                resolve();
            } else {
                reject("Failed to execute eight.");
            }
        }, 1000);
    });
}
function nine(){
    return new Promise((resolve, reject) => {
        let success = true; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                console.log("nine");
                resolve();
            } else {
                reject("Failed to execute nine.");
            }
        }, 1000);
    });
}
function ten(){
    return new Promise((resolve, reject) => {
        let success = true; // Change this to false to test rejection
        setTimeout(() => {
            if (success) {
                console.log("ten");
                resolve();
            } else {
                reject("Failed to execute ten.");
            }
        }, 1000);
    });
}


one().then(() => two())
    .then(() => three())
    .then(() => four())
    .then(() => five())
    .then(() => six())
    .then(() => seven())
    .then(() => eight())
    .then(() => nine())
    .then(() => ten())
    .then(() => {
        console.log("All functions executed");
    })
    .catch((err) => {
        console.error(err);
    });
    


