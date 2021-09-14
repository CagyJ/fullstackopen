import React from "react";

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

export default App;
