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
        <Stat text='good' value={props.good} />
        <Stat text='neutral' value={props.neutral} />
        <Stat text='bad' value={props.bad} />
        <Stat text='all' value={props.bad + props.neutral + props.good} />
        <Stat text='average' value={(props.good - props.bad) / (props.bad + props.neutral + props.good)} />
        <Stat text='positive' value={(props.good) / (props.bad + props.neutral + props.good)} />
      </table>
    );
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)