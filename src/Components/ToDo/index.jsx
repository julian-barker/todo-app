import { useState, useContext, useEffect } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Grid, Container } from '@mantine/core';

import Header from './Header/index.jsx';
import List from './List/index.jsx';
import Form from './Form/index.jsx';
import Auth from '../Auth';

import './ToDo.scss';

const ToDo = () => {
  const [list, setList] = useState([]);
  const { values } = useContext(SettingsContext);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('https://api-js401.herokuapp.com/api/v1/todo', {
        method: 'get',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': 'Basic ' + base64.encode(`${username}:${password}`),
        // },
      });

      const data = await response.json();
      console.log('data', data);

      setList(data.results);
    }

    fetchTasks();
  }, []);

  function updateList(list) {
    localStorage.setItem('list', JSON.stringify(list));
    setList(list);
  }

  return (
    <Auth>
      <Container px='md' >
        <Header list={list} />
        <Grid
          className='todo'
          justify='center'
          align='center'
          gutter={20}

        >
          <Grid.Col span={12} sm={4}>
            <Auth capability='create'>
              <Form list={list} setList={updateList}/>
            </Auth>
          </Grid.Col>
          <Grid.Col span={12} sm={8}>
            <Auth capability='read'>
              <List list={list} setList={updateList}/>
            </Auth>
          </Grid.Col>
        </Grid>
      </Container>
    </Auth>
  );
};

export default ToDo;
