const COLORS = ["#5abedc", "#bec0c9ff", "#1796a6ff", "#2ecc71", "#1873ebff"]; 

export const ProfileIconColor = (userId) => {
  const userIdLastDigit = parseInt(userId.toString().slice(-1), 10);
  return COLORS[userIdLastDigit % COLORS.length];
}
