import { useState, useContext } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import { Pagination } from '@mantine/core';
import ListItem from './ListItem';

const List = ({list, setList}) => {
  const { values, handlers } = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1);

  const { displayed, hideCompleted, sort } = values;
  const start = (activePage - 1) * displayed;

  const filtered = list.filter(item => hideCompleted ? !item.complete : true);
  const total = Math.ceil(filtered.length / displayed);
  const sorted = filtered.sort((a, b) => b[sort] - a[sort]);

  const end = start + displayed;
  const sliced = sorted.slice(start, end);

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
        {sliced.map((item, idx) => (
          <ListItem key={item.id} idx={idx} item={item} deleteItem={deleteItem} toggleComplete={toggleComplete}/>
        ))}
      </ul>

    </div>
  );
};

export default List;
