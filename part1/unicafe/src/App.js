import { useState } from 'react'

const Button = (props) => (
  <button onClick={() => props.handler(props.value + 1)}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (
    props.states.good.value
    + props.states.neutral.value
    + props.states.bad.value
    == 0
  ) {
    return <p>No feedback given</p>
  }
  const all = props.states.good.value + props.states.neutral.value + props.states.bad.value
  const average = (props.states.good.value - props.states.bad.value) / all
  const positive = (props.states.good.value / all) * 100
  return <table>
    <StatisticsLine text={props.states.good.text} value={props.states.good.value}/>
    <StatisticsLine text={props.states.neutral.text} value={props.states.neutral.value}/>
    <StatisticsLine text={props.states.bad.text} value={props.states.bad.value}/>
    <StatisticsLine text='all' value={all}/>
    <StatisticsLine text='average' value={average}/>
    <StatisticsLine text='positive' value={positive.toFixed(2) + '%'}/>
  </table>
}

const StatisticsLine = (props) => (
  <tr>
    <td>{props.text} </td>
    <td>{props.value} </td>
  </tr>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const states = {
    good: {
      text: 'good',
      value: good,
      handler: setGood
    },
    neutral: {
      text: 'neutral',
      value: neutral,
      handler: setNeutral
    },
    bad: {
      text: 'bad',
      value: bad,
      handler: setBad
    },
  }

  return (
    <div>
      <Button text={states.good.text} value={states.good.value} handler={states.good.handler} />
      <Button text={states.neutral.text} value={states.neutral.value} handler={states.neutral.handler} />
      <Button text={states.bad.text} value={states.bad.value} handler={states.bad.handler} />
      <h1>statistics</h1>
      <Statistics states={states} />
    </div>
  )
}

export default App
