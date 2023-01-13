import { useState} from 'react';
import useForm from '../../../hooks/form.js';
import { v4 as uuid } from 'uuid';
import { Button } from '@mantine/core';

import './Form.scss';

const Form = ({list, setList}) => {
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  async function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    try {
      const response = await fetch('https://api-js401.herokuapp.com/api/v1/todo', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      const data = await response.json();
      console.log('data', data);

      if(data) {
        setList([...list, data]);
      }

    } catch(e) {
      alert('Something went wrong!');
      console.log(e.message);
    }
  }

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <h2>Add To Do Item</h2>

      <label>To Do Item</label>
      <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
      <label>Assigned To</label>
      <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
      <label>Difficulty</label>
      <label>
        <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
      </label>
      <Button type='submit'>Add Item</Button>
    </form>
  );
};

export default Form;
