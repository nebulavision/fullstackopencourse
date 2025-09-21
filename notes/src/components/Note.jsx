const Note = ({ note, toogleImportance }) => {
  const label = note.important ? 'Make not important' : 'Make important';

  return (
    <li className='note'>
      { note.content }
      <button onClick={ toogleImportance }>{ label }</button>
    </li>
  );
};

export default Note;