### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  1. Callbacks: using callbacks to execute code when an asynchonous operation is finished.
  2. Promises: using promises to handle asynchronous code operations and chaining many operations together
  3. Async/Await: using async/await syntax, which allows writing asynchronous code in an asynchronous way. 

- What is a Promise?
  A promise is an opject representing the completion or a failure of an asynchronous operation.

- What are the differences between an async function and a regular function?
  Async functions are defined using the async keyword, allowing them to use await inside the function. 
  The function will alway return a promise, which is the value returned. 
  Regular functions don't return Promises, and don't use the await keyword, the run synchronously. 

- What is the difference between Node.js and Express.js?
  Node.js is a runtime environment for using Javascript code outside of the web browser. it enable capabilities like 
  server-side developement, file systems access, and networking. 
  Express.js is a web application framework built on top of Node.js, similar to Flask, providing a set of features and utilities 
  that simplify the developement of web apps and APIs

- What is the error-first callback pattern?
  A convention in Node.js for handling errors in asynchronous functions. According to this pattern, callback should have a error object as the first argument, followed by result or data. Errors are checked for and handled in the callback function. 

- What is middleware? Middleware is a code that runs in the middle of the request/response cycle. It allows for common logic, like request pre-processing, authentication, or error handling to be executed before reaching the final handler. Middleware can modify the request or response objects, terminate the request response cycle or pass control to the next middleware function. 

- What does the `next` function do?
  The next function is a call back function that is passed to each middleware in the chain. It is used to pass control to the next middleware function in the stack. By invoking the next function, the current middleware function in the stack. By invoking the next function the current middleware completes its excecution and hands over control the middle ware. 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
 1. Could make all these requests with promise.all, would be more efficient. 
 2. each variables name is not descriptive, not describing what it is.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

