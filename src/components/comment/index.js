import './style.css';

const Comment = ({ name, content, editedComment }) => {
  return (
    <div>
      <div className={`comment-details ${!editedComment ? 'single-column' : ''}`}>
        <h5>{name}</h5>
        <h5 className='edit-tag'> { editedComment && 'Edited' } </h5>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
