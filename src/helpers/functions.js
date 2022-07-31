import { rates } from "../constants/constants";

export const rateDetermine = (value) => {
  if (value > 0) {
    return rates.INCREASED;
  } else if (value < 0) {
    return rates.DECREASED;
  } else if (value === 0) {
    return rates.UNCHANGED;
  }
};

export const numberFormatter = (value) => {
  if (value < 100) {
    return value;
  }
  const formattedNumber = new Intl.NumberFormat("en-US").format(value);
  return formattedNumber;
};
