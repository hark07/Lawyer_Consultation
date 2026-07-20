export const formatDate = (date) =>
  new Date(date).toLocaleDateString();

export const capitalize = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);