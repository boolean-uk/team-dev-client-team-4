const COLORS = ['#5abedc', '#bec0c9ff', '#1796a6ff', '#2ecc71', '#1873ebff'];

export const ProfileIconColor = (userId) => {
  try {
    const idStr = (userId ?? 0).toString();
    const lastDigit = parseInt(idStr.slice(-1), 10);
    const idx = isNaN(lastDigit) ? 0 : lastDigit % COLORS.length;
    return COLORS[idx];
  } catch {
    return COLORS[0];
  }
}
