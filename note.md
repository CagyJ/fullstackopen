# Fullstackopen

From: https://fullstackopen.com/

- Submission page: https://studies.cs.helsinki.fi/stats/courses/fullstackopen
- 





## Part 1: React.js



**Create-react-app**

1. create a react app quickly: `npx create-react-app ${app-name}`

2. Start the app: `cd ${app-name}` , then `npm start`







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



### JSX

https://reactjs.org/docs/introducing-jsx.html

produces React 'elements', 



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









