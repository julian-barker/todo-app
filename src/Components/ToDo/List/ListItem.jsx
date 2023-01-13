import { Group } from '@mantine/core';
import Auth from '../../Auth';
import './ListItem.scss';

const ListItem = ({idx, item, toggleComplete, deleteItem}) => {
  return (
    <div className={`list-item ${idx % 2 === 0 ? 'even' : 'odd'}`}>
      <Group position='apart'>
        <Group position='left'>
          <Auth capability='update'>
            <div
              className={`status ${item.complete ? 'complete' : 'incomplete'}`}
              onClick={() => toggleComplete(item._id)}
            >
              {item.complete ? ' 🎉 ' : ' 🤕 '}
            </div>
          </Auth>
          <small>
            {item.assignee || 'unassigned'}
          </small>
        </Group>
        <Auth capability='delete'>
          <button onClick={() => deleteItem(item._id)}>
            X
          </button>
        </Auth>
      </Group>
      <div className='hr'></div>
      <p>{item.text}</p>
      <p><small>Difficulty: {item.difficulty}</small></p>
    </div>
  );
};

export default ListItem;
