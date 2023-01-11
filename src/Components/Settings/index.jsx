const { useContext, useState } = require('react');
const { SettingsContext } = require('../../Context/Settings');

const Form = () => {

  const { values, handlers } = useContext(SettingsContext);
  const [ displayedSetting, setDisplayedSetting ] = useState(values.displayed);
  const [ hideCompletedSetting, setHideCompletedSetting ] = useState(values.hideCompleted);
  const [ sortSetting, setSortSetting ] = useState(values.sort);
  const { setDisplayed, setHideCompleted, setSort } = handlers;

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem('settings', JSON.stringify({
      displayed: displayedSetting,
      hideCompleted: hideCompletedSetting,
      sortBy: sortSetting,
    }));

    setDisplayed(displayedSetting);
    setHideCompleted(hideCompletedSetting);
    setSort(sortSetting);
  }

  function handleTasksChange(e) {
    setDisplayedSetting(e.target.value);
  }

  function handleHideChange(e) {
    setHideCompletedSetting(e.target.checked);
  }

  function handleSortChange(e) {
    setSortSetting(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>

      <h2>Add To Do Item</h2>

      <label>
        <span># Tasks per Page</span>
        <input onChange={handleTasksChange} name="number" type="text" defaultValue={values.displayed} placeholder="# tasks" />
      </label>

      <label>
        <span>Hide Completed</span>
        {values.hideCompleted ?
          <input onChange={handleHideChange} name="hide" type="checkbox" defaultChecked />
          : <input onChange={handleHideChange} name="hide" type="checkbox" />
        }
      </label>

      <label>
        <span>Sort By</span>
        <input onChange={handleSortChange} type="text" min={1} max={5} name="sort" defaultValue={values.sort} placeholder="criteria" />
      </label>

      <label>
        <button type="submit">Save Settings</button>
      </label>
    </form>
  );
};

export default Form;
