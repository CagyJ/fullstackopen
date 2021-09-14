import React from 'react';

const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>
};

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Content = (props) => (
  <div>
    <Part part={props.part1} exercises={props.exercises1} />
    <Part part={props.part2} exercises={props.exercises2} />
    <Part part={props.part3} exercises={props.exercises3} />
  </div>
);

const Total = (props) => {
  console.log(props);
  return (<p>
            Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
          </p>);
};

const App = () => {
  let props = {
   course : 'Half Stack application development',
   part1 : 'Fundamentals of React',
   exercises1 : 10,
   part2 : 'Using props to pass data',
   exercises2 : 7,
   part3 : 'State of a component',
   exercises3 : 14
  }
  console.log(props);

  // '...' will seperately assign the variables from props into props, else, the props will be encapulated into props
  // more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  return (
    <div>
      <Header course={props.course} />
      <Content {...props} />
      <Total {...props} />
    </div>
  )
}

export default App;
