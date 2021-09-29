# Fullstackopen

From: https://fullstackopen.com/

- Submission page: https://studies.cs.helsinki.fi/stats/courses/fullstackopen
- 





## Part 1: React



**Create-react-app**

1. create a react app quickly: `npx create-react-app ${app-name}`

2. Start the app: `cd ${app-name}` , then `npm start`

it will automaticalluy turn the project into a git-repo, run

`rm -rf .git`





### **Component**

https://reactjs.org/docs/components-and-props.html

**Define**:

- Simplest way: function

  ```javascript
  function Welcome(props) {
  	return <h1>Hello, {props.name}</h1>;
  }
  // functional represent
  const welcom = () => (
    <h1>Hello, {props.name}</h1>;
  )
  ```

- ES6 Class

  ```javascript
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```

**User-define**:

```javascript
const element = <Welcome name="Test"/>
```

**Render**:

```javascript
ReactDOM.rent {
	element,
	document.getElementId('root');
}
```

**Composing**:

```javascript
const Welcome = (props) => (
  <div>
    <h1>Hello, {props.name}</h1>
  </div>
)

const App = () => (
  <div>
    <h1>HELLO WORLD! HELLO REACT!</h1>
    <Welcome name='Test'/>
  </div>
);

// or (with return keyword)
const App = () => {
   return (
    <div>
      <h1>HELLO WORLD! HELLO REACT!</h1>
      <Welcome name='Test'/>
    </div>
   );
};
```

!!!: try to make 'props' be **read-only**

!!!!!!!: the first character of component's name should be **CAPITAL**.







#### Error

- return a part of table elements as component, and it displays `<div> cannot within <tr> or <td> or sth.`
  - https://stackoverflow.com/questions/47911216/react-div-cannot-appear-as-a-child-of-tr-warning
  - Simply, use fragments: `<> </>` substitute the `<div>`
- 



### JSX

https://reactjs.org/docs/introducing-jsx.html

produces React 'elements'



**Embedding Expressions:**

```javascript
const name = 'Josh';
const element = <h1>Hello, {name}</h1>;
```

could use any js expression in the {}, e.g. +, -, ...

could use inside of `if`, `for`, assign it to variables, ...



**Specifying Attributes:**

```javascript
// use quotes to specify string
const element = <div tabIndex="0"></div>;

// use curly braces to embed js expression
const element = <img src={user.avatarUrl}></img>
```



**Specifying children:**

```javascript
const element = (
	<div>
		<h1>Hello</h1>
		<h2>hahahhahhahha</h2>
	</div>
)
```



**Represents Object:**

```javascript
const element = (
	<h1 className="greeting">
  	Hello, world!
  </h1>
);

// =====>

const element = React.createElement(
	'h1',
  {className: 'greeting'},
  'Hello, world'
)

// simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
}
```



JSX中使用表达式

- 属性中：`<MyComponent foo = {1 + 2 + 3}`

- 延展属性：

  ```javascript
  const props = {firstName: 'Ben', lastName: 'Hector'}
  const greeting = <Greeting {...props} />
  ```

- 作为子元素：`const element = <li>{props.message}</li>;`













### JavaScript

most popular: Babel

Use `node filename.js` to run the program



#### Variables

`const` can not be changed, `let` defines a normal var

```javascript
const x = 1;
x = 4; // causes an error

let y = 5;
y += 5; // good
y = 'eoihavdkjvf'; // good
```

More info:

- https://medium.com/podiihq/javascript-variables-should-you-use-let-var-or-const-394f7645c88f
- https://www.jstips.co/en/javascript/keyword-var-vs-let/
- https://www.youtube.com/watch?v=sjyJBL5fkp8



#### Arrays

```javascript
const t = [1, -1, 3];
t.push(5);

console.log(t.length); // 4
console.log(t[1]); // -1

t.forEach(value => {
	console.log(value); // 1 -1 3 5
});
```

`const` defined array could be changed.

In React, usually writing in functional way and the functional programming paradigm is to use immutable data structures. So, it is preferable to use `concat` to add new element. Actually, it will create a new array to cover it, instead of adding a new element.

```javascript
const t1 = [1, -1];
const t2 = t1.concat(5); // 1 -1 5
```

`map` method could iterate and do some stuffs on the elements, and it will create a new array also.

```javascript
const t = [1, 2, 3];
const m = t.map(value => value*2); // 2 4 6
```

And also, it can be used in another way:

```javascript
const m = t.map(value => '<li>' + value + '<li>');
```

Besides, the array could also destructure assignment, like

```javascript
const t = [1, 2, 3, 4, 5];
const [t1, t2, ...rest] = t;
console.log(t1); // 1
console.log(rest); // [3, 4, 5]
```



#### Objects

```javascript
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}
// output
console.log(object1.name)         // Arto Hellas is printed
const fieldName = 'age' 
console.log(object1[fieldName])    // 35 is printed
// modify
object1.address = 'Helsinki'
object1['secret number'] = 12341
```



#### Functions

arrow functions

```javascript
const sum = (p1, p2) => {
	console.log(p1);
	console.log(p2);
	return p1 + p2;
}

const result = sum(1, 5); // 6
```

If there is only one parameter, we can exclude the parentheses:

```javascript
const square = p => {
	return p*p;
}
```

If there is only a single expression, we can also exclude the braces(only return the result):

```javascript
const square = p => p*p;
```



#### Object methods

We could assing method inside the definition of the objects, or after creation

```javascript
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  }
};

arto.growOlder = function() {
  this.age += 1
};
```



#### Classes

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 35)
adam.greet()
```

inheritance in js: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance



#### More...

- intro, tutorial: https://javascript.info/
- Tutorial(video): https://egghead.io/
- Functional programming in JavaScript: https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84
- Template strings in mdn



### Re-render

we could define a refresh function to re-render base,

```javascript
const refresh = () => {
	ReactDOM.render(
		<App />,
		document.getElementById('root'))
};
```

Also, set the interval to render every second,

```
setInterval(() => {
	refresh(),
	counter += 1
}, 1000);
```



### State Hook

add some state to a function, no needing to convert to a class.

https://reactjs.org/docs/hooks-state.html

```javascript
import React, { useState } from "react";

const HookExample = () => {
  // '0' is the initial state for the variable('count')
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={ () => setCount(count + 1)}>
        Click me!
      </button>
    </div>
  )
}
```

**Attention**: the `useState` function must not be called from inside of a loop, a conditional expression and where is not a function defining a component





DRY: 

- 能计算得到的状态就不要单独存储
- 组件尽量无状态，数据通过props获取







### Event Handling

Button element is also called mouse events(clicking), usually use `onClick` to specify the function defined in the code.

If we define the event handlers in a simpler form, it will break the application:

```javascript
<button onClick={setCounter(counter + 1)}> 
  plus
</button>
```

Better way to define the function should be separated:

```javascript
const HookExample = () => {
  // '0' is the initial state for the variable('count')
  const [count, setCount] = useState(0);
  
  const increaseByOne = () => setCounter(counter + 1);

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={ increaseByOne }>
        Click me!
      </button>
    </div>
  )
}
```

**lift the state up**: when several components need to reflect the same changing data, better to lift the shared state up to their closest common ancestor.

```javascript
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick = {props.onClick}>
      {props.text}
    </button>
  );
}

const HookExample = () => {
  // '0' is the initial state for the variable('count')
  const [count, setCount] = useState(0);

  const increaseByOne = () => setCount(count + 1);
  const setToZero = () => setCount(0);

  return (
    <div>
      
      <p>You clicked</p> 
      <Display counter={count} /> 
      <p>times.</p>

      <Button text='Click me!' onClick={increaseByOne} />
      <Button text='ZERO' onClick={setToZero} />
      
    </div>
  )
}
```



!!!: calling a functio which changes the state causes the component to re-render



**Function that returns a function**

anthor way to define an event handler, 

```javascript
const App = () => {
  const [value, setValue] = useState(10)

  const hello = () => {
    const handler = () => console.log('hello world')
    return handler
  }

  return (
    <div>
      {value}
      <button onClick={hello()}>button</button>
    </div>
  )
}
```



**Passing Event Handlers to Child Components**

Use Function that returns a function

```javascript
const Button = (props) => (
	<button onClick={props.handleClick}> {props.text} </button>
)

const App = () => {
	const [value, setValue] = useState(10);
	
	const setToValue = (newValue) => {
		setValue(newValue);
	}
	
	return (
		<div>
			<Button handleClick={() => setToValue(1000)} text="thousand" />
	)
}
```

Otherwise, u will get a re-render too many times error.





**Form**

Enable editing of the input element, need to register an event handler to synchronize the changes:

```html
<form onSubmit={addNote}>
  <input value={newNote} onChange={handleNoteChange}/>
  <button type="submit">save</button>
</form>
```

```javascript
const handleNoteChange = (event) => {
  console.log(event.target.value);
  setNewNote(event.target.value);
}
```

Every time a change occurs in the input element, the event handler function will reveive the event object as parameter.







### Complex state

Use object as the state to implement more complex feature,

```javascript
const [clicks, setClicks] = useState({
  left: 0, right: 0
});
```

and handling arrays

```javascript
const [allClicks, setAll] = useState([]);
```



### More

- Start learning React(uses class components): https://egghead.io/courses/react-with-class-components-fundamentals-4351f8bb
- The Befinner's Guide to React(uses the new functional): https://egghead.io/courses/the-beginner-s-guide-to-react



## Part 2: Communicating with server

### Key-attribute

https://reactjs.org/docs/lists-and-keys.html#keys

the error is caused by `map`, when we use `map`, we must have a unique key value(attribute).

So, we could use the indexes as the key-attribute

```javascript
{notes.map(note => 
  <li key={note.id}>
    {note.content}
  </li>
)}
```

Or passing the second parmeter to the callback function of the`map`,

```javascript
{notes.map((note, i) =>
    <li key={i}>
      {note.content}
		</li>
)}
```

Also called index as a key is an anti-pattern, see more: https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318



### Forms

**IMPORTANT**

controlled component: https://reactjs.org/docs/forms.html#controlled-components



### Get data from server

**JSON server**: github.com/typicode/json-server

- Create a file called `db.json`
- Start json server: `npx json-server --port 3001 --watch db.json`



Nowadays, use `fetch` method (which based on `promises`) to pull the data from server, instead of XHR way.

Currently, JavaScript engines are **single-threaded**, so it cannot execute code in parallel.

It is requirement to use a **non-blocking model** for executig **IO operations**.

*npm: node package manager*

We would like to use `axios` lib, its functions like fetch, but more pleasant to use. And we need to install axios at the root directory of the project:

```shell
npm install axios
```

Also, we could install json-server as a development dependency, it could run when we let the app start:

```shell
npm install json-server --save-dev
```

And, modify `package.json` file:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "server": "json-server -p3001 --watch db.json"
}
```

Then we can run `npm run server` to start json-server.



**Promis**: an object represents an asynchronous operation, which has three states.

- Pending: the final value is not available yet
- Fulfilled: the operation has completed and the final value is available, somtimes called resolved.
- Rejected: an error prevented the final value

Using axios to get the promis object from the json-server:

```javascript
// chained format
axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data;
    console.log(notes);
    
  });
```





### Effect-hooks

Perform side effects in function components, such as data fetching, setting up a subscription, changing the DOM in React components, ...

So, we can use it to fetch data from a server.

```javascript
// executed immediately after rendering
useEffect(() => {
  console.log('effect');
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
    console.log('promise fulfilled');
    setNoteArr(response.data);
  })
}, []);
```

After the component rendering, a call to a state-updating function triggers the re-rendering of the component, the data fetched from the server will be rendered to the screen.

The **first parameter** is a function(**effect** itself), effect run after every completed render.

The **second parameter** is used to specify **how often** the effect run, if it is **empty arrray []**, it represents it only run along with the first render of the component.



### Bind Weather Api

Set environment variable for api-key (Linux/MacOS)

```shell
REACT_APP_API_KEY='bd476ea1049ba82d6cbcc4bdaf661559' npm start
```

And then we could use this variable in the application,

```javascript
process.env.REACT_APP_API_KEY
```





### Store data to server

use Post method to store the data to server,

```javascript
const noteObject = {
  content: newNote,
  data: new Date().toISOString(),
  import: Math.random() < 0.5,
  id: noteArr.length + 1
};

axios
  .post('http://localhost:3001/notes', noteObject)
  .then(response => {
  console.log(response);
})
```



### Update data to server

use Put method to update the data to server

```javascript
const url = `http://localhost:3001/notes/${id}`
const note = noteArr.find(n => n.id === id);
const changedNote = {...note, important: !note.important};

axios.put(url, changedNote).then(response => {
  setNoteArr(noteArr.map(note => note.id !== id ? note : response.data))
})
```



### Extracting communication with the backend

**single responsibility principle**: every module, class or function in a computer program should have reponsibility over a single part of that program's functionality and it should encapsulate that part.





### Handle the error from promise

Use `catch` method as the error handler 

```javascript
axios
  .put(`${baseUrl}/${id}`, newObject)
  .then(response => response.data)
  .then(changedNote => {
    // ...
  })
  .catch(error => {
    console.log('fail')
  })
```



### Delete data to server

```javascript
axios
  .delete(`http://localhost:3001/persons/${id}`)
  .then(response => {
  console.log(response);
  const newPersons = persons.filter(person => person.id === id);
  setPersons(newPersons);
})
```



## Part 3: Programming a server with NodeJS and Express

use `npm init` to generate the `package.json` file

Then, add a new script inside ''scripts'' block, like `"start": "node index.js"`, which mean we could use `npm start`



### Simple Web Server

```javascript
const http = require('http')

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```



### Express

`npm install express`

library which to ease server side development with Node

it will generate `"express": "^4.17.1"`, the ^ means that when the project updates, the version of express will be at least 4.17.1.

If we would like to work on another computer, we could use `npm install` to download the whole packages

example for express:

```javascript
const express = require('express')
const app = express()
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
```



### nodemon

Because it is not automatically reloaded after changes, we could import nodemon.

nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

`npm install --save-dev nodemon`

and we can start our application with nodemon like `node_modules/.bin/nodemon index.js`

so, add some new in the `package.json` file, 

```javascript
"dev": "nodemon index.js"
```

npm will help us to find the `node_modules/.bin/`directory.

Now, we could use `npm run dev` to start the server with nodemon.



### REST

Representational State Transfer, aka REST.

the **resources** should have an associated URL which is the resource's **unique address.**

Operation by HTTP verb:

| URL      | verb   | functionality                                                |
| :------- | :----- | :----------------------------------------------------------- |
| notes/10 | GET    | fetches a single resource                                    |
| notes    | GET    | fetches all resources in the collection                      |
| notes    | POST   | creates a new resource based on the request data             |
| notes/10 | DELETE | removes the identified resource                              |
| notes/10 | PUT    | replaces the entire identified resource with the request data |
| notes/10 | PATCH  | replaces a part of the identified resource with the request data |





### Middleware

name of the json-parser from the express

be used for handling request and response objects

could take the raw data from requests and parse it into JavaScript object, assigns it to the property `body`

Middleware is a function that receives three parameters: `request`, `response`, `next`

```javascript
const requestLogger = (request, response, next) => {
	console.log('Method: ', request.method)
	console.log('Path: ', request.path)
	console.log('Body: ', request.body)
	console.log('---')
	next()
}
```

the `next` function yields control to the next middleware

Use:

```javascript
app.use(requestLogger)
```

Others, we could use it for catching requests made to non-existent routes:

```javascript
const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)
```





### CORS

Cross-Origin Resource Sharing

it allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served.

the JavaScript code of an application that runs in a browser can only communicate with a server in the same [origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

Install: `npm install cors`

Import and use:

```javascript
const cors = require('cors')
app.use(cors())
```



### Heroku

https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up



push local changes

- Changes 
- `npm install`
- `heroic local` check local site
- `git add .`
- `git commit -m "xxx"` 
- `git push heroku main` deploy to web server
- `heroku open` open the web page



define config vars

- `heroku config:set XXX=xxx` set the config var
- `heroku config` check the exists config vars
- Use: `process.env.XXX`





### MongoDB

[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

`mongodb+srv://cagyjiao:<password>@cluster0.iac40.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

Install MongoDb into project, use the higher level API, called Mongoose

`npm install mongoose `

Password: cagy0322



cmd+shift and search ESLint



## React Lifecycle

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/



