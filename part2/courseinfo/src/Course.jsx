const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
  <p>
    <strong>Number of exercises {sum}</strong>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, i) => (
        <Part part={parts[i]} key={i} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  const sum = course.parts.reduce((prev, curr) => {
    return parseInt(curr.exercises) + parseInt(prev);
  }, 0);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  );
};

export default Course;
