import React, { useState } from "react";

const Welcome = ({name}) => (
  <div>
    <h1>Hello, {name}</h1>
  </div>
)

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick = {onClick}>
      {text}
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
