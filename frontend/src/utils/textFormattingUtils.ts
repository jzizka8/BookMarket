export const formatGenreName = (genre: string) => {
  // Use regular expressions to insert spaces before capital letters
  return genre.replace(/([A-Z])/g, ' $1').trim();
};
