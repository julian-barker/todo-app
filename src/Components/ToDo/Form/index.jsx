import { useState} from 'react';
import useForm from '../../../hooks/form.js';
import { v4 as uuid } from 'uuid';

import './Form.scss';

const Form = ({list, setList}) => {
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  return (
    <form onSubmit={handleSubmit}>

      <h2>Add To Do Item</h2>

      <label>
        <span>To Do Item</span>
        <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
      </label>

      <label>
        <span>Assigned To</span>
        <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
      </label>

      <label>
        <span>Difficulty</span>
        <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
      </label>

      <label>
        <button type="submit">Add Item</button>
      </label>
    </form>
  );
};

export default Form;
