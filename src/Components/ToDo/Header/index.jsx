import { useState, useEffect } from "react";

const Header = ({list}) => {
  const [incomplete, setIncomplete] = useState([]);

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <h2>To-Do List: {incomplete} pending tasks</h2>
  );
};

export default Header;
