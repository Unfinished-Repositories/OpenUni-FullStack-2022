const Header = ({ course }) => <h1>{course}</h1>

const Total = ({parts}) => {
  const total = parts.reduce(
    (previous, current) => previous + current.exercises, 0
  )
  return <>
    <b>total of {total} exercises</b>
  </>
}

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(x => <Part key={x.id} part={x} />)}
  </>

const Course = ({course}) =>
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>

const Courses = ({courses}) =>
  <>
    {courses.map(x => <Course key={x.id} course={x} />)}
  </>

export default Courses
