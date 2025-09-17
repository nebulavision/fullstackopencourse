const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    { props.parts.map(part => <Part key={ part.id } part={ part }/>) }
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({total}) => <strong>Total of { total } exercises</strong> 

const Course = ({course}) => {
   const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0  )

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises} />
    </div>
  )
} 

export default Course