const arrayExtractor = (arr, id) => {
  arr = arr.filter(element => element.id !== id);
  return arr;
};

export default arrayExtractor;
