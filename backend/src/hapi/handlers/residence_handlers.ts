import GeoPoint from 'geopoint';
import { ResidenceRepository } from '../../ds/api';
import { validateGetByAddress, validateGetByRadius, validateGetByPolygon, validateGetKNN } from '../validators/residence_validators';
import Hapi from '@hapi/hapi';

const gPoints: GeoPoint[] = [];

export const getByAddressHandler = (repository: ResidenceRepository) => {
  return async function (request: Hapi.Request, h: any) {
    const { query } = request;
    try {
      if (validateGetByAddress(query).valid) {
        const { address, state, zip } = query;
        return await repository.getByAddress(address, state, zip);
      }
    } catch (err: any) {
      console.log(err);
    }

    return validateGetByAddress(query);
  };
};

export const getByRadiusHandler = (repository: ResidenceRepository) => {
  return async function (request: Hapi.Request) {
    const { query } = request;
    try {
      if (validateGetByRadius(query).valid) {
        const { latitude, longitude, distance } = query;
        return await repository.getByRadius(new GeoPoint(parseFloat(latitude), parseFloat(longitude)), parseFloat(distance));
      }
    } catch (err: any) {
      console.log(err);
    }

    return validateGetByRadius(query);
  };
};

export const getByPolygonHandler = (repository: ResidenceRepository) => {
  return async function (request: Hapi.Request) {
    const payload: any = request.payload;
    try {
      if (validateGetByPolygon(payload).valid) {
        const { geopoints } = payload;
        geopoints.forEach((element: any) => {
          gPoints.push(new GeoPoint(parseFloat(element.lat), parseFloat(element.lon)));
        });
      }
      return await repository.getByPolygon(gPoints);
    } catch (err: any) {
      console.log(err);
    }

    return validateGetByPolygon(payload);
  };
};

export const getKNNHandler = (repository: ResidenceRepository) => {
  return async function (request: Hapi.Request) {
    const { query } = request;
    try {
      if (validateGetKNN(query).valid) {
        const { latitude, longitude, n } = query;
        return await repository.getKNN(new GeoPoint(parseFloat(latitude), parseFloat(longitude)), parseInt(n));
      }
    } catch (err: any) {
      console.log(err);
    }

    return validateGetKNN(query);
  };
};
