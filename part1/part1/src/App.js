import React, { useState } from "react";

const Welcome = (props) => (
  <div>
    <h1>Hello, {props.name}</h1>
  </div>
)

const HookExample = () => {
  // '0' is the initial state for the variable('count')
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={ () => setCount(count + 1)}>
        Click me!
      </button>
      <button onClick={ () => setCount(0)}>
        ZERO
      </button>
    </div>
  )
}

// const App = () => {
//   const now = new Date();
//    return (
//     <div>
//       <h1>HELLO WORLD! HELLO REACT!</h1>
//       <Welcome name='Test'/>
//       <h1>Now: {now.toString()}</h1>
//     </div>
//    );
// };

// rewrite in JSX
const App = () => {
  const now = new Date();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1', null, 'HELLO WORLD! HELLO REACT!'
    ),
    React.createElement(
      Welcome, {name: 'Test'}
    ),
    React.createElement(
      'h1', null, 'Now: ', now.toString()
    ),
    React.createElement(
      HookExample, null
    )
  );
};

export default App;
