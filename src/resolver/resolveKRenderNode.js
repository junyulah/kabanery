module.exports = (node) => {
  const {
    render,
    args
  } = node;
  return render(...args);
};
