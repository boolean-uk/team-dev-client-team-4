const SendIcon = ({
  triangleColor = '#64648c ',
  background = '#d4def2 '
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        borderRadius: '50%',
        background
      }}
    >
      <circle cx="20" cy="20" r="20" fill={background} />
      <polygon
        points="10,9 10,31 35,20"
        fill="none"
        stroke={triangleColor}
        strokeWidth="1.8"
      />
      <polygon
        points="10,17 10,23 20,20"
        fill={triangleColor}
      />

    </svg>
  );
};

export default SendIcon;
