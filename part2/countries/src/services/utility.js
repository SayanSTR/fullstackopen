function format(str, ...values) {
  let i = 0;
  return str.replace(/{}/g, () => values[i++]);
}

export default {format};