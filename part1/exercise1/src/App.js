import React from 'react';

const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
};

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Content = (props) => (
  <div> 
    <Part part={props[0].name} exercises={props[0].exercises} />
    <Part part={props[1].name} exercises={props[1].exercises} />
    <Part part={props[2].name} exercises={props[2].exercises} />
  </div>
);

const Total = (props) => {
  console.log(props);
  return (<p>
            Number of exercises {props[0].exercises + props[1].exercises + props[2].exercises}
          </p>);
};

const App = () => {
  
  const course = 'Half Stack application development';
  const parts = [
    {
      name : 'Fundamentals of React',
      exercises : 10
    },
    {
      name: 'Using props to pass data',
      exercises : 7
    },
    {
      name : 'State of a component',
      exercises : 14
    }
  ];
  

  // '...' will seperately assign the variables from props into props, else, the props will be encapulated into props
  // more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  return (
    <div>
      <Header course={course} />
      <Content {...parts} />
      <Total {...parts} />
    </div>
  )
}

export default App;
