
import './ListItem.scss';

const ListItem = ({idx, item, toggleComplete, deleteItem}) => {
  return (
    <div className={`list-item ${idx % 2 === 0 ? 'even' : 'odd'}`}>
      <div className='heading'>
        <small>
          {item.assignee || 'null'}
        </small>
        <div
          className={`status ${item.complete ? 'complete' : 'incomplete'}`}
          onClick={() => toggleComplete(item.id)}
        >
          {item.complete ? 'Complete 👊' : 'Incomplete 🤕'}
        </div>
        <button onClick={() => deleteItem(item.id)}>
          X
        </button>
      </div>
      <p>{item.text}</p>
      <p><small>Difficulty: {item.difficulty}</small></p>
      <hr />
    </div>
  );
};

export default ListItem;
