import React from 'react';
import Header from './Components/Header';
import ToDoProvider from './Context/Todo';
import ToDo from './Components/ToDo/ToDo';

const App = () => {
  return (
    <>
      <Header />
      <ToDoProvider>
        <ToDo />
      </ToDoProvider>
    </>
  );
}

export default App;
