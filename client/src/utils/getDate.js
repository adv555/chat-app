export const getDate = (date) => {
  const newDate = date
    .toISOString()
    .replace('T', ' ')
    .replace('Z', `${Math.floor(Math.random() * 1000)}+00:00`);

  return newDate;
};
