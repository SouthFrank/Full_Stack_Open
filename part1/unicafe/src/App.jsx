import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text, value}) => (
  <div>{text} {value}</div>
)

const Statistics = ({good, bad, neutral, total, average}) => {
  console.log(total)
  if(total === 0){
    return (
      <div>There is no feedback given</div>
    )
  }
  
  return (
    <div>
      <StatisticLine text='Good' value={good}/>
      <StatisticLine text='Bad' value={bad}/>
      <StatisticLine text='Neutral' value={neutral}/>
      <StatisticLine text='Total' value={total}/>
      <StatisticLine text='Average' value={average}/>
      <StatisticLine text='Positive' value={good/total}/>
    </div>
  )
}
  

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
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average}/>
    </div>
  )
}

export default App