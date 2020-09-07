function vw(px) {
  const number = parseFloat(px);
  const value = (number * 100) / 750;
  const unit = 'vw';
  return `${value + unit}`;
}

const helpers = {
  vw,
};

export { vw };
export default helpers;
