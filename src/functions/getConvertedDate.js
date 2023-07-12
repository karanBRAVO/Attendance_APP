function get_converted_date(dateStr) {
  let arr = dateStr.split("-"); // ['year', 'month', 'date']
  let convert_date =
    String(Number(arr[2])) +
    "/" +
    String(Number(arr[1])) +
    "/" +
    String(Number(arr[0]));
  return convert_date;
}

module.exports = get_converted_date;
