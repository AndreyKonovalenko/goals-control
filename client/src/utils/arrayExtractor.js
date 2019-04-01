const arrayExtractor = (arr, id) => {
  arr = arr.filter(element => element.id !== id);
  console.log(arr);
  return arr;
};

export default arrayExtractor;
