/* eslint-disable import/prefer-default-export */
import axios from 'axios';

/**
 * Function that implements generic request with axios
 * @param {string} endpoint  Service endpoint
 * @param {string} method Request method
 * @param {string} data Request body data
 * @param {string} header Request headers
 * @return {Object} returns http result
 */
export const request = async (url, method, data, headers, auth) => {
  try {
    const rs = await axios.request({
      url,
      method,
      data,
      headers,
      auth,
    });
    return rs;
  } catch (error) {
    throw new Error(error);
  }
};
