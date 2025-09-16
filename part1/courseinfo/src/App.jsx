const Header = (props) => {
  return <h1>{ props.course }</h1>
} 

const Content = (props) => {
  return (
    <div>
      {
        props.parts.map(item => 
          <Part 
            name={ item.name } 
            exercises={ item.exercises } 
          />
        )           
      }
    </div>
  )
}

const Part = (props) => {
  return <p>{ props.name } { props.exercises }</p>
}

const Total = (props) => {
  return <p>Number of exercises { props.total }</p>
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