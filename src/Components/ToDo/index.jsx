import { useState, useContext } from 'react';
import { SettingsContext } from '../../Context/Settings';

import Header from './Header/index.jsx';
import List from './List/index.jsx';
import Form from './Form/index.jsx';
import Auth from '../Auth';

import './ToDo.scss';

const storedList = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];

const ToDo = () => {
  const [list, setList] = useState(storedList);
  const { values } = useContext(SettingsContext);

  const { displayed, hideCompleted, sort } = values;

  function updateList(list) {
    localStorage.setItem('list', JSON.stringify(list));
    setList(list);
  }

  return (
    <Auth capability='read'>
      <div className='todo'>
        <Header list={list} />
        <div className='container'>
          <div>
            <ul>
              <li>Currently displaying: {displayed}</li>
              <li>Hide Completed: {hideCompleted ? 'yes' : 'no'}</li>
              <li>Sorting By: {sort}</li>
            </ul>

            <Form list={list} setList={updateList}/>
          </div>
          <List list={list} setList={updateList}/>
        </div>

      </div>
    </Auth>
  );
};

export default ToDo;
