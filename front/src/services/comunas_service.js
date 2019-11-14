
import { request } from './http_service';
import { apiComuna } from '../constants/api.constants';

/**
 * Function that implements generic request with axios.
 * @param {idRegion} int id of the region.
 */
export const getComunas = async (idRegion) => {
  try {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    var bodyFormData = new FormData();
    bodyFormData.set('reg_id', idRegion);
    const rs = await request(`${apiComuna}`, 'POST', bodyFormData, headers);
    console.debug(`Save rs = ${rs}`);
    return rs.data;
  } catch (error) {
    throw new Error(error);
  }
};