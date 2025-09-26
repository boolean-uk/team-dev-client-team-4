const COLORS = ['#28c846', '#A0E6AA', '#46DCD2', '#82E6E6', '#5ABEDC', '#46C8FA', '#46A0FA', '#C8D2E6', '#96a0be'];

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
