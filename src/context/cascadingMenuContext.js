import { createContext, useState, useEffect } from 'react';
const CascadingMenuContext = createContext();

const CascadingMenuProvider = ({ children }) => {
  const [cascadingMenuVisibleId, setCascadingMenuVisibleId] = useState(null);

  useEffect(() => {
    const handleClick = (e) => {
      setCascadingMenuVisibleId(null);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <CascadingMenuContext.Provider value={{ cascadingMenuVisibleId, setCascadingMenuVisibleId }}>
      {children}
    </CascadingMenuContext.Provider>
  );
};

export { CascadingMenuContext, CascadingMenuProvider };
