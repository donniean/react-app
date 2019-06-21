function vw(px) {
  const value = parseFloat(px);
  const vw = (value * 100) / 750;
  const unit = 'vw';
  return `${vw + unit}`;
}

const helpers = {
  vw
};

export { vw };
export default helpers;
