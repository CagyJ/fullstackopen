import React from "react";

const Welcome = (props) => (
  <div>
    <h1>Hello, {props.name}</h1>
  </div>
)

const App = () => {
  const now = new Date();
   return (
    <div>
      <h1>HELLO WORLD! HELLO REACT!</h1>
      <Welcome name='Test'/>
      <h1>Now: {now.toString()}</h1>
    </div>
   );
};

export default App;
