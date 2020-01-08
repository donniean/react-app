function u(px) {
  const value = parseFloat(px);
  const u = (value * 100) / 750;
  const unit = 'vw';
  return `${u + unit}`;
}

const helpers = {
  u
};

export { u };
export default helpers;
