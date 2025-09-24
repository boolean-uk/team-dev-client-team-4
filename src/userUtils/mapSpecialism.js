function mapSpecialism(specialism) {
  if (specialism === 0) {
    return 'Frontend';
  }
  if (specialism === 1) {
    return 'Backend';
  }
  if (specialism === 2) {
    return 'Fullstack';
  }
  return undefined;
}

export default mapSpecialism;
