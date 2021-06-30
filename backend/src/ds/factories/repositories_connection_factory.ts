import { ResidenceRepository } from '../api';
import { LeadRepository } from '../api/lead_repository';
import { CsvLeadRepository } from '../sources/csv/csv_lead_repository';
import { CsvResidenceRepository } from '../sources/csv/csv_residence_repository';
import { AxiosESLeadRepository } from '../sources/es/axios/axios_es_lead_repository';
import { AxiosESResidenceRepository } from '../sources/es/axios/axios_es_residence_repository';
import { ElasticESLeadRepository } from '../sources/es/elastic/elastic_es_lead_repository';
import { ElasticESResidenceRepository } from '../sources/es/elastic/elastic_es_residence_repository';
import { URL, INDEX } from '../index';

export const enum DataSource {
  CSV,
  AXIOS,
  ELASTIC
}

export function getLeadRepository(dataSource: DataSource, path = 'leadData.csv'): LeadRepository {
  switch (dataSource) {
    case DataSource.CSV: {
      return new CsvLeadRepository(path);
    }
    case DataSource.AXIOS: {
      return new AxiosESLeadRepository(URL, INDEX);
    }
    case DataSource.ELASTIC: {
      return new ElasticESLeadRepository(URL, INDEX);
    }
  }
}

export function getResidenceRepository(dataSource: DataSource, path = 'leadData.csv'): ResidenceRepository {
  switch (dataSource) {
    case DataSource.CSV: {
      return new CsvResidenceRepository(path);
    }
    case DataSource.AXIOS: {
      return new AxiosESResidenceRepository(URL, INDEX);
    }
    case DataSource.ELASTIC: {
      return new ElasticESResidenceRepository(URL, INDEX);
    }
  }
}
