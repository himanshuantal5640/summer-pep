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
async function loadUser() {
    await login();
    await fetchData();
    await getOrders();
    await getOrderDetails();
    console.log("9. All data loaded");
}

loadUser().catch((error) => {
    console.error(error);
});


// async function hello(){
//     return 'Hello World';
// }

// hello().then((message) => {
//     console.log(message);
// });

