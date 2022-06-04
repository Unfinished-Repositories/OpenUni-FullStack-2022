import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const randomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min))
}

// function credits: https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
const argmax = (arr) => {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomiseSelected = () => setSelected(randomInt(0, anecdotes.length))
  const voteForSelected = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button text='vote' onClick={voteForSelected} />
      <Button text='next anecdote' onClick={randomiseSelected} />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[argmax(votes)]}</p>
    </div>
  );
}

export default App;
