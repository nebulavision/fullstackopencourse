const Header = (props) => {
  return <h1>{ props.course }</h1>
} 

const Content = (props) => {
  return (
    <div>
      {
        props.content.map(item => 
          <Part 
            part={ item.part } 
            exercises={ item.exercises } 
          />
        )           
      }
    </div>
  )
}

const Part = (props) => {
  return <p>{ props.part } { props.exercises }</p>
}

const Total = (props) => {
  return <p>Number of exercises { props.total }</p>
}

const App = () => {
  const course = 'Half Stack application development'
  
  const content = [
    {
      part: 'Fundamentals of React',
      exercises: 10    
    },
    {
      part: 'Using props to pass data',
      exercises: 7  
    },
    {
      part: 'State of a component',
      exercises: 14 
    }
  ]

  const totalExcercises = content.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <Header course={ course } />
      <Content content={ content }/>
      <Total total={ totalExcercises } />
    </div>
  )
}

export default App