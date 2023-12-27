const Header = ({name}) => <h2>{name}</h2>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>
 

const Content = ({course}) => {

    const courseParts = course.parts.map((item, index) => <Part key={index} name={item.name} exercises={item.exercises} />)

     const total = course.parts.reduce((sum, current) => sum + current.exercises, 0)
    
    return (
        <div>
            <Header name={course.name} />
            {courseParts}
            <h4>There are {total} courses total</h4>
        </div>
    )
}

const Course = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

    const allCourses = courses.map((course, index) => <Content key={index} course={course} />)

    return(
      <div>
        <h1>Web Development Curriculum</h1>
        {allCourses}
      </div>
    )
  }

  export default Course