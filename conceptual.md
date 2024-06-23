### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?(USING A CALLBACK FUNCTION)

- What is a Promise? (an object that represents the eventual completion of asynchronous code.)

- What are the differences between an async function and a regular function? (an async function will use the aiat keyword whoch pauses the cpde. a regular function will execute immediatly)

- What is the difference between Node.js and Express.js? (express is a node framework)

- What is the error-first callback pattern? (THE FIRST ARGUMENT IS RESERVED FOR ERROR HANDLEING)

- What is middleware? (REQ AND RES FUNCTIONS )

- What does the `next` function do? (PASSES TO THE NEXT MIDDLEWARE)

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc) (YOU CAN MAKE ALL REQUESTS AT THE SAME TIME BY USING PROMISE ALL. YOU CAN RESTURN A SINGLE PROMISE USING PROMISE AN. THEN USE THE 'THEN' METHON TO HADLE THE RESULTS AND CATCH TO HANDLE ERRORS)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
