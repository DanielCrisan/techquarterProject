import { ResidenceRepository } from './api';
import { DataSource, getResidenceRepository } from './factories/repositories_connection_factory';

export { Lead, Residence, User } from './models';

export const PORT = 8080;
export const DOMAIN = '0.0.0.0';
export const URL = 'https://search-tq-elastic-search-dev-43vvdmsxfuviylljfarcvsqhyi.eu-central-1.es.amazonaws.com';
export const INDEX = 'd-1020-loc-ut';
export const elasticESResidenceRepository: ResidenceRepository = getResidenceRepository(DataSource.ELASTIC);
