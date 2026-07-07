const cardContainer = document.querySelector(".card-container");
async function fetchData() {
    try{
        cardContainer.innerHTML = "<h1>Loading...</h1>";
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        if(!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const users = await res.json();
        cardContainer.innerHTML = "";
        users.slice(0, 10).forEach((user) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h2>${user.title}</h2>
                <p>User ID: ${user.userId}</p>
                <p>Completed: ${user.completed}</p>
            `;
            cardContainer.appendChild(card);
        });

    }
    catch(error){
        cardContainer.innerHTML = `<h1>${error.message}</h1>`;
    }
}
fetchData();