import './style.css';

const Comment = ({ name, content }) => {
  return (
    <div>
      <h5>{name}</h5>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
