const kelvinToF = (temp) => ((temp - 273.15) * (9 / 5) + 32).toFixed(1);

const hpaToinHg = (hpa) => {
  return (hpa * 0.02953).toFixed(2);
};

export { kelvinToF, hpaToinHg };
