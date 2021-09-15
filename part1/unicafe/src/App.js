import React, { useState } from 'react';

const Display = ({text}) => {
  return (
    <div>
      <h2>{text}</h2>
    </div>
  );
};

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

const StatisticLine = ({text, num}) => {
  if (text === "positive") {
    return (
      <>
      <tr>
        <td>
          {text} 
        </td>
        <td>
          {num}%
        </td>
      </tr>
      </>
    );
  }
  return (
    <>
    <tr>
      <td>
        {text} 
      </td>
      <td>
        {num}
      </td>
    </tr>
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodPlusOne = () => {setGood(good + 1)};
  const neutralPlusOne = () => {setNeutral(neutral + 1)};
  const badPlusOne = () => {setBad(bad + 1)};

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <Display text='give feedback' />
        <Button text='good' onClick={goodPlusOne} />
        <Button text='neutral' onClick={neutralPlusOne} />
        <Button text='bad' onClick={badPlusOne} />
        
        <Display text='statistics' />
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <Display text='give feedback' />
        <Button text='good' onClick={goodPlusOne} />
        <Button text='neutral' onClick={neutralPlusOne} />
        <Button text='bad' onClick={badPlusOne} />
        
        <Display text='statistics' />
        <table>
          <tbody>
            <StatisticLine text='good' num={good} />
            <StatisticLine text='neutral' num={neutral} />
            <StatisticLine text='bad' num={bad} />
            <StatisticLine text='all' num={good + neutral + bad} />
            <StatisticLine text='average' num={(good + bad*-1) / (good + neutral + bad)} />
            <StatisticLine text='positive' num={good / (good + neutral + bad) * 100} />
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default App;
