/**
 * @param   {number} number
 * @returns {string}
 */
export default (number, symbol = '₫') => `${number ? parseInt(number, 10).toLocaleString('en-IE') : '0'} ${symbol}`;
