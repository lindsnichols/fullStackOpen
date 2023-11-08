const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={`${part1} ${exercises1}`}
        part2={`${part2} ${exercises2}`}
        part3={`${part3} ${exercises3}`}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

const Header = (props) => <h1>{props.course}</h1>;
const Content = (props) => {
  return (
    <>
      <Part value={props.part1} />
      <Part value={props.part2} />
      <Part value={props.part3} />
    </>
  );
};

const Part = (props) => {
  return <p>{props.value}</p>;
};

const Total = (props) => <p>Number of exercises {props.total}</p>;

export default App;
