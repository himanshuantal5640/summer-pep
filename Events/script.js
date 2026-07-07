const grandParent = document.querySelector('#grandparent');
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

child.addEventListener('click', (event) => {
  console.log('Child clicked');
  event.stopPropagation(); // Prevents the event from bubbling up to parent and grandparent
});

parent.addEventListener('click', (event) => {
  console.log('Parent clicked');
  event.stopPropagation(); // Prevents the event from bubbling up to grandparent
});

grandParent.addEventListener('click', (event) => {
  console.log('Grandparent clicked');
});

// callback function is a function that is passed as an argument to another function and is executed after some operation has been completed. In this case, the callback functions are the event listeners attached to the child, parent, and grandparent elements. When a click event occurs on any of these elements, the corresponding callback function is executed, logging a message to the console.