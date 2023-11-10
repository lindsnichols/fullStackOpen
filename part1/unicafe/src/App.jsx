import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [nuetral, setNuetral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };

  const handleNuetral = () => {
    setNuetral(nuetral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total - 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNuetral} text="nuetral" />
      <Button onClick={handleBad} text="bad" />
      <h1>statistics</h1>

      <Statistics good={good} bad={bad} nuetral={nuetral} total={total} />
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const Statistics = ({ good, bad, nuetral, total }) => {
  if (good + bad + nuetral == 0) {
    return <div>No Feedback given</div>;
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine line={good} text="good" />
          <StatisticsLine line={nuetral} text="nuetral" />
          <StatisticsLine line={bad} text="bad" />
          <StatisticsLine line={bad + good + nuetral} text="total" />
          <StatisticsLine
            line={total / (bad + good + nuetral)}
            text="average"
          />
          <StatisticsLine
            line={(good / (bad + good + nuetral)) * 100}
            text="positive"
          />
        </tbody>
      </table>
    </div>
  );
};

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.line}</td>
    </tr>
  );
};

export default App;
