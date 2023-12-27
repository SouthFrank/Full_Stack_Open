const Header = (props) => {
  const courseName = props.course.name
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  )
}

const Part = (props) => {
  // console.log(props)
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )
  
}

const Content = (props) => {
  const courseParts = props.course.parts
  return (
    <div>
      <Part part={courseParts[0].name} exercises={courseParts[0].exercises}/>
      <Part part={courseParts[1].name} exercises={courseParts[1].exercises}/>
      <Part part={courseParts[2].name} exercises={courseParts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  const courseParts = props.course.parts
  return (
    <div>
      <p>The total number of courses is: {courseParts[0].exercises + courseParts[1].exercises + courseParts[2].exercises}</p>
    </div>
  )
}

const App = () => {
const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}
  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App
