import { createContext, useState, useEffect } from 'react';
const CascadingMenuContext = createContext();

const CascadingMenuProvider = ({ children }) => {
  const [cascadingMenuVisibleId, setCascadingMenuVisibleId] = useState(null);

  useEffect(() => {
    const handleClick = (e) => {
      // Ignore clicks inside any menu root so inner actions can run
      if (e.target && typeof e.target.closest === 'function') {
        const insideMenu = e.target.closest('[data-menu-root="true"]');
        if (insideMenu) return;
      }
      setCascadingMenuVisibleId(null);
    };
    document.addEventListener('click', (e) => {
      setTimeout(() => {
        const insideMenu = e.target.closest('[data-menu-root="true"]');
        if (!insideMenu) setCascadingMenuVisibleId(null);
      }, 0);
    });
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <CascadingMenuContext.Provider value={{ cascadingMenuVisibleId, setCascadingMenuVisibleId }}>
      {children}
    </CascadingMenuContext.Provider>
  );
};

export { CascadingMenuContext, CascadingMenuProvider };
