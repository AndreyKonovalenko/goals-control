export const isDayInDayArray = (currentDay, daysArray) => {
  let result = null;
  daysArray.forEach(element => {
    if (element.date === currentDay) {
      result = element;
    }
  });
  console.log(result);
  return result;
};
