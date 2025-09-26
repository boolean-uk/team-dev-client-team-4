const HomeIcon = ({ isActive = false }) => {
  return (
    <svg width="33" height="36" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        transform="translate(-5, 0)"
        d="M6 12L20 4L34 12V34H24V22H16V34H6V12Z"
        fill={isActive ? '#000046' : 'none'}
        stroke={isActive ? 'none' : '#64648C'}
        strokeWidth="3"
      />
    </svg>
  );
};

export default HomeIcon;
