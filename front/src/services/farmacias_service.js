
import { request } from './http_service';
import { beEndpoint } from '../constants/api.constants';

/**
 * Function that implements generic request with axios.
 * @param {data} data Request body data.
 */
export const getFarmacias = async (data) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const rs = await request(`${beEndpoint}`, 'POST', data, headers);
    console.debug(`Save rs = ${rs}`);
    return rs;
  } catch (error) {
    throw new Error(error);
  }
};