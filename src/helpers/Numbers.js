/* eslint-disable no-plusplus */
// 1000.00 -> 1 000.00
export const formatPrice = (num, digits) => {
  let trailingZeros = digits !== undefined ? digits : 2;

  const spacesRegex = /\B(?=(\d{3})+(?!\d))/g;
  if (num === null || num === undefined) {
    return '0.00';
  }

  if (typeof num === 'number') {
    return num.toFixed(trailingZeros).replace(spacesRegex, ' ');
  }

  if (typeof num === 'string') {
    return parseFloat(num).toFixed(trailingZeros).replace(spacesRegex, ' ');
  }

  return '';
};

export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const numberWithFraction = (number, frac) => {
  return number.toLocaleString('en-US', { minimumFractionDigits: frac || 2, maximumFractionDigits: frac || 2 });
};

export const priceShort = (num, digits) => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'т.' },
    { value: 1e6, symbol: 'М.' },
    { value: 1e9, symbol: 'Млр.' },
    { value: 1e12, symbol: 'Трл.' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits || 2).replace(rx, '$1') + si[i].symbol;
};
