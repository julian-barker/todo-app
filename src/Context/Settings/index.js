const { createContext, useState } = require('react');

export const SettingsContext = createContext({});

const settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : {
  displayed: 3,
  hideCompleted: false,
  sortBy: 'difficulty',
};

const SettingsProvider = ({ children }) => {
  const [displayed, setDisplayed] = useState(parseInt(settings.displayed));
  const [hideCompleted, setHideCompleted] = useState(settings.hideCompleted);
  const [sort, setSort] = useState(settings.sortBy);

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
    <SettingsContext.Provider value={config}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;
