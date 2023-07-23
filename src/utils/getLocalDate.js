const getLocalDate = (date) => {
  console.log(date);
  date = new Date(date);
  console.log(date);
  date.setHours(date.getHours() + 1);
  console.log(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const day = date.getDate();

  // Format the date in "DD-MM-YYYY" format
  const newDate =
    day.toString().padStart(2, "0") +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    year.toString();
  console.log(date);

  // Extract time components
  let hour = date.getHours();
  const minutes = date.getMinutes();

  // Format the time in "HH:mm" format with leading zeros
  const time =
    hour.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");
  console.log(time);
  return {
    newDate,
    time,
  };
};
export default getLocalDate;
