import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Stat = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  if ((props.good + props.bad + props.neutral) === 0) {
    return (<div>No feedback given</div>)
  }
  else {
    return (
      <table>
        <tbody>
          <Stat text='good' value={props.good} />
          <Stat text='neutral' value={props.neutral} />
          <Stat text='bad' value={props.bad} />
          <Stat text='all' value={props.bad + props.neutral + props.good} />
          <Stat text='average' value={(props.good - props.bad) / (props.bad + props.neutral + props.good)} />
          <Stat text='positive' value={(props.good) / (props.bad + props.neutral + props.good)} />
        </tbody>
      </table>
    );
  }
}

const App = (props) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const  getAnecdote = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    return copy
  }
  return (
    <div>
      <h2>give feedback</h2>
      <Button
        handleClick={() => setGood(good + 1)} text = 'good'
      />
      <Button
        handleClick={() => setNeutral(neutral + 1)} text = 'neutral'
      />
      <Button
        handleClick={() => setBad(bad + 1)} text = 'bad'
      />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <div>
        <h2>Anecdotes</h2>
        <Button
          handleClick={() => setSelected(getAnecdote(0, props.anecdotes.length - 1))} text='next anecdote'
        />
        <Button
          handleClick={() => setVotes(vote)} text='vote'
        />
        <div>has {votes[selected]} votes</div>
        <div>{props.anecdotes[selected]}</div>
        <h3>Anecdote with Most votes:</h3>
        <div>{props.anecdotes[(votes.indexOf(Math.max(...votes)))]}</div>
      </div>
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes = {anecdotes} />,
  document.getElementById('root')
)