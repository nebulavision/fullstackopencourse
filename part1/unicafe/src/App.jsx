import { useState } from 'react'

const Button = (props) => <button onClick={ props.onClick }>{ props.text }</button>

const StatisticLine = ({ text, value }) =>{
  return (
    <tr>
      <th style={{ textAlign: 'left'}}>{ text }</th>
      <th>{ value }</th>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.good === 0 && props.neutral === 0 && props.bad === 0) {  
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={ props.good } />
        <StatisticLine text="neutral" value={ props.neutral } />
        <StatisticLine text="bad" value={ props.bad } />
        <StatisticLine text="all" value={ props.all } />
        <StatisticLine text="average" value={ props.average } />
        <StatisticLine text="positive" value={ props.positive + ' %' } />
      </tbody>
    </table>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics
        good = { good }
        neutral = { neutral }
        bad = { bad }
        all = { good + neutral + bad }
        average = { (good - bad) / (good + neutral + bad) || 0 }
        positive={ (good / (good + neutral + bad) * 100) || 0 }
      />
    </div>
  )
}

export default App