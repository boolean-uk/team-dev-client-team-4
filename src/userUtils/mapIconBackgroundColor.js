function mapIconBackgroundColor(courseName) {
  if (courseName === 'Java Development') {
    return ({ background: '#ED8B00' });
  }
  if (courseName === '.NET Development') {
    return ({ background: '#512bd4' });
  }
  return ({ background: '#1dc262ff' });
}

export default mapIconBackgroundColor;
