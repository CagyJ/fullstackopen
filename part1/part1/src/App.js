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

const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  };
  return (
    <div>
      button press history: {allClicks.join('-')}
    </div>
  );
};

const ComplexState = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  });

  const [allClicks, setAll] = useState([]);

  const clickLeft = () => {
    const newClicks = {
      left: clicks.left + 1,
      right: clicks.right
    };
    setClicks(newClicks);

    setAll(allClicks.concat('L'));
  }

  const clickRight = () => {
    const newClicks = {
      left: clicks.left,
      right: clicks.right + 1
    };
    setClicks(newClicks);

    setAll(allClicks.concat('R'));
  }

  return (
    <div>
      {clicks.left} 
      <Button onClick={clickLeft} text='L' />
      <Button onClick={clickRight} text='R' />
      {clicks.right}
      <br></br>
      <History allClicks={allClicks} />
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
      HookExample
    ),
    React.createElement(
      ComplexState
    )
  );
};

export default App;
