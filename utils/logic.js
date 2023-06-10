const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

const fahrenheitToCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

const logic = (data, callback) => {
  const { temp, convertType } = data;
  const regex = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;

  if (!temp || !convertType || !regex.test(temp)) {
    callback(new Error("Invalid temperature or convert type"), null);
  } else {
    let result =
      convertType === "CtoF"
        ? celsiusToFahrenheit(parseFloat(temp)).toFixed(2)
        : fahrenheitToCelsius(parseFloat(temp)).toFixed(2);
    callback(null, result);
  }
};

module.exports = { logic };
