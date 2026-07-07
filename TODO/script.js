const title = document.querySelector("#title");
const description = document.querySelector("#description");
const form = document.querySelector("form");
const ul = document.querySelector("#todo");

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const titleText = title.value.trim();
    const descriptionText = description.value.trim();
    if(titleText === "" || descriptionText === ""){
        alert("Please fill all fields");
        return;
    }
    const li = document.createElement("li");
    const newTitle = document.createElement("h3");
    newTitle.innerText = titleText;
    const newDescription = document.createElement("p");
    newDescription.innerText = descriptionText;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.style.padding = "5px";
    deleteBtn.style.borderRadius = "5px";
    deleteBtn.addEventListener('click', () =>{
        li.remove();
    })
    li.append(newTitle);
    li.append(newDescription);
    li.append(deleteBtn);
    ul.append(li);  

})

//event capture ==> event will be captured from the top to bottom
//event bubbling ==> event will be captured from the bottom to top
//innerText ==> consider everything as text, even if it is html
//innerHtml ==> consider everything as html, if it is html, it will be rendered as html