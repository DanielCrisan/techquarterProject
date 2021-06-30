import { messageResidenceElastic } from '../../ds/sources/es/elastic/elastic_es_residence_repository';

type geopoints = {
  lat: string;
  lon: string;
};

let status: number;
let message: string;
let valid: boolean;
let residenceMessage: string;
export const validateGetByAddress = (req: any) => {
  status = 200;
  valid = true;
  message = 'missing parameter: ';
  residenceMessage = '';
  try {
    if (!req.address || !req.state || !req.zip) {
      status = 404;
      valid = false;
      if (!req.address) {
        message += 'address ';
      }
      if (!req.state) {
        message += 'state ';
      }
      if (!req.zip) {
        message += 'zip ';
      }
    }
    if (!Number(req.zip) && req.zip) {
      status = 404;
      valid = false;
      message += 'zip code must be number ';
    }
    if (Number(req.state) && req.state) {
      status = 404;
      valid = false;
      message += 'state must be letter ';
    }
    if (status === 200 && valid === true) {
      residenceMessage = messageResidenceElastic;
    }
  } catch (err: any) {
    status = 404;
    valid = false;
    console.log('Error!');
  }

  if (residenceMessage === '')
    return {
      status,
      valid,
      message
    };
  else
    return {
      residenceMessage,
      status,
      valid,
      message
    };
};

export const validateGetByPolygon = (payload: any) => {
  const { geopoints } = payload;
  status = 200;
  valid = true;
  message = 'missing parameter: ';
  residenceMessage = '';
  geopoints.forEach((element: geopoints) => {
    try {
      if (!parseFloat(element.lat) || !parseFloat(element.lon)) {
        valid = false;
        status = 404;
      }
      if (parseFloat(element.lat) <= 0) {
        valid = false;
        status = 404;
        message += 'latitude must be positive, latitude=' + element.lat + ' ';
      }
      if (!Number(element.lat)) {
        valid = false;
        status = 404;
        message += 'latitude must be number, latitude=' + element.lat + ' ';
      }
      if (!Number(element.lon)) {
        valid = false;
        status = 404;
        message += 'longitude must be number, longitude=' + element.lon + ' ';
      }
      if (status === 200 && valid === true) {
        residenceMessage = messageResidenceElastic;
      }
    } catch (err) {
      valid = false;
      status = 404;
      console.log(err);
    }
  });

  if (residenceMessage === '')
    return {
      status,
      valid,
      message
    };
  else
    return {
      residenceMessage,
      status,
      valid,
      message
    };
};

export const validateGetByRadius = (query: any) => {
  status = 200;
  valid = true;
  message = 'missing parameter: ';
  residenceMessage = '';
  try {
    if (!query.latitude || !query.longitude || !query.distance) {
      valid = false;
      status = 404;
      if (!parseFloat(query.latitude)) {
        message += 'latitude ';
        status = 404;
      }
      if (!parseFloat(query.longitude)) {
        message += 'longitude ';
        status = 404;
      }
      if (!parseFloat(query.distance)) {
        message += 'distance ';
        status = 404;
      }
    }
    if (parseFloat(query.latitude) < 0) {
      valid = false;
      message += 'latitude must be positive ';
      status = 404;
    }
    if (parseFloat(query.distance) < 0) {
      valid = false;
      message += 'distance must be positive ';
      status = 404;
    }

    if (status === 200 && valid === true) {
      residenceMessage = messageResidenceElastic;
    }
  } catch (err: any) {
    valid = false;
    console.log(err);
  }

  if (residenceMessage === '')
    return {
      status,
      valid,
      message
    };
  else
    return {
      residenceMessage,
      status,
      valid,
      message
    };
};

export const validateGetKNN = (query: any) => {
  status = 200;
  valid = true;
  message = 'missing parameter: ';
  residenceMessage = '';
  const { latitude, longitude, n } = query;

  try {
    if (!latitude || !longitude || !n) {
      valid = false;
      if (!latitude) {
        message += 'latitude ';
        status = 404;
      }
      if (!longitude) {
        status = 404;
        message += 'longitude ';
      }
      if (!n) {
        status = 404;
        message += 'neighbor ';
      }
    }
    if (!Number(latitude)) {
      valid = false;
      status = 404;
      message += 'latitude must be number, ';
    }
    if (!Number(longitude)) {
      valid = false;
      status = 404;
      message += 'longitude must be number, ';
    }
    if (!Number(n)) {
      valid = false;
      status = 404;
      message += 'neighbor must be number, ';
    }
    if (parseFloat(latitude) <= 0) {
      valid = false;
      status = 404;
      message += 'latitude must be positive, lat=' + latitude + ' ';
    }
    if (parseInt(n) <= 0) {
      valid = false;
      status = 404;
      message += 'neighbor must be positive, n=' + n + ' ';
    }
    if (status === 200 && valid === true) {
      residenceMessage = messageResidenceElastic;
    }
  } catch (err: any) {
    status = 404;
    valid = false;
    console.log(err);
  }

  if (residenceMessage === '')
    return {
      status,
      valid,
      message
    };
  else
    return {
      residenceMessage,
      status,
      valid,
      message
    };
};
