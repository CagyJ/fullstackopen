import React from 'react';

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  );
};

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  );
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part, i) => 
        <Part key={i} name={part.name} exercises={part.exercises} />
      )}
    </div>
  );
};

const Summary = ({parts}) => {
  return (
    <h4>total of {parts.reduce((prev, cur)=>(prev + cur.exercises),0)} exercises</h4>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Summary parts={course.parts} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course, i) =>
        <Course key={i} course={course} />
      )}
      
    </div>
  )
}

export default App;
