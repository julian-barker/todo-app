const { createContext, useState } = require('react');

export const ToDoContext = createContext({});

const ToDoProvider = ({ children }) => {
  const [displayed, setDisplayed] = useState(3);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [sort, setSort] = useState('difficulty');

  const config = {
    values: {
      displayed,
      hideCompleted,
      sort,
    },
    handlers: {
      setDisplayed,
      setHideCompleted,
      setSort,
    },
  };

  return (
    <ToDoContext.Provider value={config}>;
      {children}
    </ToDoContext.Provider>
  )
}

export default ToDoProvider;
