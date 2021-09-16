import React, { useState } from 'react';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const Display = ({text, tag}) => {
  if (tag === 'h2') {
    return (
      <div>
        <h2>{text}</h2>
      </div>
    );
  }
  return (
    <div>
      <h4>{text}</h4>
    </div>
  );
  
};

const Button = (props) => {
  return (
    <button onClick={props.onClick} >
      {props.text}
    </button>
  )
}

const VoteInfo = (props) => {
  return (
    <div>
      <h3>has {props.num} votes</h3>
    </div>
  )
}


const MostVotePart = ({text, num}) => {
  if (num === 0) {
    return (
      <Display text = 'No votes so far' tag = 'h2' />
    )
  }
  return (
    <div>
      <Display text = 'Anecdote with most votes' tag = 'h2' />
      <Display text = { text } tag = 'h4' />
      <VoteInfo num = { num } />
    </div>
  );
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, updateVotes] = useState(Array(7).fill(0));
  const [mostVote, setMostVote] = useState(0);

  const randomSelection = () => {
    setSelected( getRandomInt(6) );
  };

  const votePlusOne = (num) => {
    const copy = [...votes];
    copy[num] += 1;
    const max = getMax(copy);
    setMostVote(max);
    updateVotes(copy);
  }

  const getMax = (arr) => {
    return arr.reduce((idxMax, val, idx, arr) => val > arr[idxMax] ? idx : idxMax, 0);
  }
  

  return (
    <div>
      <Display text = 'Anecdote of the day' tag = 'h2' />
      <Display text= { anecdotes[selected] } tag = 'h4' />
      <VoteInfo num= { votes[selected] } />
      <Button text = 'vote' onClick={ () => votePlusOne(selected) } />
      <Button text= 'Next anecdotes' onClick={ randomSelection } />

      <MostVotePart text = { anecdotes[mostVote] } num = {votes[mostVote]} />

    </div>
  );
}

export default App;
