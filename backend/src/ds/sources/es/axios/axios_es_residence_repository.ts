import axios from 'axios';
import GeoPoint from 'geopoint';
import { Lead, Residence } from '../../..';
import { ESAbstractRepository } from '../utils/es_abstract_repository';
import { ResidenceRepository } from '../../../api/residence_repository';
import { FactoryRequestResidence } from '../utils/request/request_factory_residence';

export let messageResidence: string = '';

export class AxiosESResidenceRepository extends ESAbstractRepository implements ResidenceRepository {
  private URL: string;
  constructor(endpoint: string, index: string) {
    super(endpoint, index);
    this.URL = `${this.endpoint}/${this.index}/_search`;
  }

  async getByAddress(address: string, state: string, zip: number): Promise<Residence> {
    const requestBody = FactoryRequestResidence.searchByAddressBody(address, state, zip);
    const result = (await this.getResidencesFromRequest(requestBody))[0];
    if (!result) {
      messageResidence = 'Address not found!';
    }

    return result;
  }

  async getByRadius(center: GeoPoint, radiusInKm: number): Promise<Residence[]> {
    const requestBody = FactoryRequestResidence.searchByRadiusBody(center, radiusInKm);
    if (radiusInKm <= 0) {
      messageResidence = 'Radius must be positive!';
    }

    const result = await this.getResidencesFromRequest(requestBody);
    if (result.length === 50) {
      messageResidence += 'Radius too large, returning only 50 residences for safety!';
    } else if (!result.length) {
      messageResidence += 'No residences found in that radius!';
    }

    return result;
  }

  async getByPolygon(pointsOfPolygon: GeoPoint[]): Promise<Residence[]> {
    const requestBody = FactoryRequestResidence.searchByPolygonBody(pointsOfPolygon);
    if (pointsOfPolygon.length < 3) {
      messageResidence = 'The polygon must have at least 3 points to create an area!';
    }

    const result = await this.getResidencesFromRequest(requestBody);
    if (result.length === 50) {
      messageResidence += 'Area too large, returning only 50 residences for safety!';
    } else if (!result.length) {
      messageResidence += 'No residences found in that area!';
    }

    return result;
  }

  async getKNN(pointToSearchFrom: GeoPoint, nrOfNeighbours: number): Promise<Residence[]> {
    const requestBody = FactoryRequestResidence.searchByKNNbody(pointToSearchFrom, nrOfNeighbours);
    if (!(Number.isInteger(nrOfNeighbours) && nrOfNeighbours > 0 && nrOfNeighbours < 500)) {
      messageResidence = 'Number of neighbours must be an integer between 0 and 500';
    }

    return (await this.getResidencesFromRequest(requestBody)).slice(1);
  }

  private async getResidencesFromRequest(requestBody: any): Promise<Residence[]> {
    const residences: Residence[] = [];
    const result = await axios.post(this.URL, requestBody);

    if (result.data.hits.hits.length) {
      result.data.hits.hits.forEach((residence: any) => {
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
