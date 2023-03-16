export const createDate = (timestamp) => {
  var dateStamp = new Date(timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = dateStamp.getFullYear();
  var month = months[dateStamp.getMonth()];
  var date = dateStamp.getDate();
  var hour = dateStamp.getHours();
  var min = dateStamp.getMinutes();
  var sec = dateStamp.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
};
