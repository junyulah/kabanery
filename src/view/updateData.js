const {
  set,
  isFunction,
  likeArray
} = require('../util');

const updateData = (data, scripts) => {
  if (scripts.length === 1 && likeArray(scripts[0])) {
    let arg = scripts[0];
    for (let i = 0, n = arg.length; i < n; i++) {
      const item = arg[i];
      set(data, item[0], item[1]);
    }
  } else {
    let [path, value] = scripts;

    // function is a special data
    if (isFunction(value)) {
      value = value(data);
    }

    set(data, path, value);
  }
};

module.exports = updateData;
