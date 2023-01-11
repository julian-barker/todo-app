import { useState, useContext } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import { Pagination } from '@mantine/core';
import ListItem from './ListItem';

const List = ({list, setList}) => {
  const { values, handlers } = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1);

  const { displayed, hideCompleted, sort } = values;
  const total = Math.ceil(list.length / displayed);
  const start = (activePage - 1) * displayed;

  const filtered = list.filter(item => hideCompleted ? !item.complete : true);
  const sorted = filtered.sort((a, b) => b[sort] - a[sort]);
  const sliced = sorted.slice(start, start + displayed);


  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  return (
    <div>
      <Pagination total={total} onChange={setActivePage} color="orange"/>
      <ul>
        {sliced.map(item => (
          <div key={item.id}>
            <p>{item.text}</p>
            <p><small>Assigned to: {item.assignee}</small></p>
            <p><small>Difficulty: {item.difficulty}</small></p>
            <div onClick={() => toggleComplete(item.id)}>{item.complete ? 'Complete 👊' : 'Incomplete 🤕'}</div>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
            <hr />
          </div>
        ))}
      </ul>

    </div>
  );
};

export default List;
