import { Residence } from '../models/residence';
import GeoPoint from 'geopoint';

export interface ResidenceRepository {
  getByAddress(address: string, state: string, zip: number): Promise<Residence>;
  getByRadius(center: GeoPoint, radiusInKm: number): Promise<Residence[]>;
  getByPolygon(pointsOfPolygon: GeoPoint[]): Promise<Residence[]>;
  getKNN(pointToSearchFrom: GeoPoint, nrOfNeighbours: number): Promise<Residence[]>;
}
