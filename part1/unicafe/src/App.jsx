import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({text, count}) => (
  <p>{text} {count}</p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)

  const goodFeedback = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    setAverage(average + 1)
  }

  const neutralFeedback = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }

  const badFeedback = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
    setAverage(average - 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={goodFeedback} text='good' />
      <Button handleClick={neutralFeedback} text='neutral' />
      <Button handleClick={badFeedback} text='bad' />

      <h2>Statistics</h2>
      <Statistics text='Good' count={good} />
      <Statistics text='Neutral' count={neutral} />
      <Statistics text='Bad' count={bad} />
      <Statistics text='All' count={total} />
      <Statistics text='Average' count={average / total} />
      <Statistics text='Positive' count={good / total}/>
    </div>
  )
}

export default App