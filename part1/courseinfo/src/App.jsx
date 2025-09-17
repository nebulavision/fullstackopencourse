const Header = ({ course }) => <h1>{ course }</h1>


const Content = ({ parts }) => {
  return (
    <div>
      {
        parts.map(item => 
          <Part 
            name={ item.name } 
            exercises={ item.exercises } 
          />
        )           
      }
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return <p>{ name } { exercises }</p>
}

const Total = ({ total }) => <p>Number of exercises { total }</p>


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

  const totalExcercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <Header course={ course.name } />
      <Content parts={ course.parts }/>
      <Total total={ totalExcercises } />
    </div>
  )
}

export default App