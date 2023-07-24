const getLocalDate = (date) => {
  date = new Date(date);
  date.setHours(date.getHours() + 1);
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

  // Extract time components
  let hour = date.getHours();
  const minutes = date.getMinutes();

  // Format the time in "HH:mm" format with leading zeros
  const time =
    hour.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");
  return {
    newDate,
    time,
  };
};
export default getLocalDate;
