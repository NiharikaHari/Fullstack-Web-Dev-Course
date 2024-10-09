import { useState } from "react";

const Heading = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  let sum = good + bad + neutral;
  const calcAvg = () => {
    return ((good - bad) / sum).toFixed(2);
  };
  const calcPositive = () => {
    return ((good / sum) * 100).toFixed(2) + " %";
  };
  if (sum === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}></StatisticLine>
        <StatisticLine text="neutral" value={neutral}></StatisticLine>
        <StatisticLine text="bad" value={bad}></StatisticLine>
        <StatisticLine text="all" value={sum}></StatisticLine>
        <StatisticLine text="average" value={calcAvg()}></StatisticLine>
        <StatisticLine text="positive" value={calcPositive()}></StatisticLine>
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateGood = () => {
    setGood(good + 1);
  };
  const updateNeutral = () => {
    setNeutral(neutral + 1);
  };
  const updateBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Heading text="give feedback"></Heading>
      <Button text="good" onClick={updateGood}></Button>
      <Button text="neutral" onClick={updateNeutral}></Button>
      <Button text="bad" onClick={updateBad}></Button>
      <Heading text="statistics"></Heading>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
