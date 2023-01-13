import { useState, useContext } from 'react';
import { SettingsContext } from '../../../Context/Settings';
import { Pagination } from '@mantine/core';
import ListItem from './ListItem';

const List = ({list, setList}) => {
  const { values } = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1);

  const { displayed, hideCompleted, sort } = values;
  const start = (activePage - 1) * displayed;

  const filtered = list.filter(item => hideCompleted ? !item.complete : true);
  const total = Math.ceil(filtered.length / displayed);
  const sorted = filtered.sort((a, b) => b[sort] - a[sort]);

  const end = start + displayed;
  const sliced = sorted.slice(start, end);

  async function deleteItem(id) {
    console.log(id);
    try {
      const response = await fetch(`https://api-js401.herokuapp.com/api/v1/todo/${id}`, {
        method: 'delete',
      });

      console.log(response.status);
      if (response.status === 200) {
        const items = list.filter( item => item._id !== id );
        setList(items);
      }

    } catch(e) {
      alert('Something went wrong - delete failed!');
      console.error(e);
    }
  }

  async function toggleComplete(id) {
    try {
      const response = await fetch(`https://api-js401.herokuapp.com/api/v1/todo/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({complete: true}),
      });

      console.log(response.status);
      if (response.status === 200) {
        const items = list.map( item => {
          if ( item._id === id ) {
            item.complete = !item.complete;
          }
          return item;
        });

        setList(items);
      }
    } catch(e) {
      alert('Something went wrong - update failed!');
      console.error(e);
    }
  }

  return (
    <div>
      <Pagination
        className='pagination'
        total={total}
        onChange={setActivePage}
        color="orange"
        style={{margin: 'auto'}}
      />
      <br />
      <div>
        {sliced.map((item, idx) => (
          <ListItem key={item.id} idx={idx} item={item} deleteItem={deleteItem} toggleComplete={toggleComplete}/>
        ))}
      </div>
    </div>
  );
};

export default List;
