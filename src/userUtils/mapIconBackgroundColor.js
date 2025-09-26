function mapIconBackgroundColor(courseName) {
  if (courseName === 'Java Development') {
    return ({ background: '#46A0FA' });
  }
  if (courseName === '.NET Development') {
    return ({ background: '#6E6EDC' });
  }
  return ({ background: '#28C846' });
}

export default mapIconBackgroundColor;
