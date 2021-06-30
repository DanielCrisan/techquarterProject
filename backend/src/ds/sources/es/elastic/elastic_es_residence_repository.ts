import { ApiResponse, Client, RequestParams } from '@elastic/elasticsearch';
import { Lead, Residence } from '../../..';
import { ResidenceRepository } from '../../../api/residence_repository';
import GeoPoint from 'geopoint';
import { ESAbstractRepository } from '../utils/es_abstract_repository';
import { FactoryRequestResidence } from '../utils/request/request_factory_residence';

export let messageResidenceElastic: string = '';

export class ElasticESResidenceRepository extends ESAbstractRepository implements ResidenceRepository {
  private client: Client;

  constructor(endpoint: string, index: string) {
    super(endpoint, index);
    this.client = new Client({ node: this.endpoint });
  }

  async getByAddress(address: string, state: string, zip: number): Promise<Residence> {
    const requestBody = FactoryRequestResidence.searchByAddressBody(address, state, zip);
    const params = this.createSearchParams(requestBody);

    const result = (await this.getResidencesFromRequest(params))[0];
    if (!result) {
      messageResidenceElastic = 'Address not found!';
      throw 'Address not found!';
    }
    return result;
  }

  async getByRadius(center: GeoPoint, radiusInKm: number): Promise<Residence[]> {
    const requestBody = FactoryRequestResidence.searchByRadiusBody(center, radiusInKm);
    const params = this.createSearchParams(requestBody);

    if (radiusInKm <= 0) {
      messageResidenceElastic = 'Radius must be positive!';
      throw 'Radius must be positive!';
    }

    const result = await this.getResidencesFromRequest(params);
    if (result.length === 50) {
      messageResidenceElastic += 'Radius too large, returning only 50 residences for safety!';
    } else if (!result.length) {
      messageResidenceElastic += 'No residences found in that radius!';
      throw 'No residences found in that radius!';
    }

    return result;
  }

  async getByPolygon(pointsOfPolygon: GeoPoint[]): Promise<Residence[]> {
    const requestBody = FactoryRequestResidence.searchByPolygonBody(pointsOfPolygon);
    const params = this.createSearchParams(requestBody);

    if (pointsOfPolygon.length < 3) {
      messageResidenceElastic = 'The polygon must have at least 3 points to create an area!';
      throw 'The polygon must have at least 3 points to create an area!';
    }

    const result = await this.getResidencesFromRequest(params);
    if (result.length === 50) {
      console.log('Area too large, returning only 50 residences for safety!');
    } else if (!result.length) {
      messageResidenceElastic += 'No residences found in that area!';
      throw 'No residences found in that area!';
    }

    return result;
  }

  async getKNN(pointToSearchFrom: GeoPoint, nrOfNeighbours: number): Promise<Residence[]> {
    const requestBody = FactoryRequestResidence.searchByKNNbody(pointToSearchFrom, nrOfNeighbours);
    const params = this.createSearchParams(requestBody);

    if (!(Number.isInteger(nrOfNeighbours) && nrOfNeighbours > 0 && nrOfNeighbours < 500)) {
      messageResidenceElastic = 'Number of neighbours must be an integer between 0 and 500';
    }

    return (await this.getResidencesFromRequest(params)).slice(1);
  }

  private createSearchParams(requestBody: any): RequestParams.Search {
    return {
      index: this.index,
      body: requestBody
    };
  }

  private async getResidencesFromRequest(params: RequestParams.Search): Promise<Residence[]> {
    const residences: Residence[] = [];
    const result: ApiResponse = await this.client.search(params);

    if (result.body.hits.hits.length) {
      result.body.hits.hits.forEach((residence: any) => {
        const leads: Lead[] = [];
        const currentResidence = residence._source;

        currentResidence.People.forEach((lead: any) => {
          leads.push(Lead.createLeadFromElastic(lead));
        });
        currentResidence.People = leads;
        residences.push(Residence.createResidenceFromElastic(currentResidence));
      });
    }

    return residences;
  }
}
