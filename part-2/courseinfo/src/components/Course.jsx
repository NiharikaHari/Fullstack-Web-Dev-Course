const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises}></Part>
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  let total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <b>total of {total} exercises</b>;
};

export default Course;
