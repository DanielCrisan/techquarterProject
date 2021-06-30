import { getByAddressHandler, getByPolygonHandler, getByRadiusHandler, getKNNHandler } from '../handlers/residence_handlers';
import { elasticESResidenceRepository } from '../../ds';

export const residenceRoutes = [
  {
    //http://127.0.0.1:8080/residence/searchByAddress?address=1469%20W%20Hunters%20View%20Ct&state=UT&zip=84065
    method: 'GET',
    path: '/residence/searchByAddress',
    handler: getByAddressHandler(elasticESResidenceRepository)
  },
  {
    //http://127.0.0.1:8080/residence/searchByRadius?latitude=40.50441&longitude=-111.933285&distance=1
    method: 'GET',
    path: '/residence/searchByRadius',
    handler: getByRadiusHandler(elasticESResidenceRepository)
  },
  {
    method: 'POST',
    path: '/residence/searchByPolygon',
    handler: getByPolygonHandler(elasticESResidenceRepository)
  },
  {
    //http://127.0.0.1:8080/residence/searchKNN?latitude=40.50441&longitude=-111.933285&n=5
    method: 'GET',
    path: '/residence/searchKNN',
    handler: getKNNHandler(elasticESResidenceRepository)
  }
];
